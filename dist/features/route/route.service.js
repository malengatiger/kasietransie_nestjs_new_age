"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const RouteUpdateRequest_1 = require("../../data/models/RouteUpdateRequest");
const VehicleMediaRequest_1 = require("../../data/models/VehicleMediaRequest");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const RouteCity_1 = require("../../data/models/RouteCity");
const Route_1 = require("../../data/models/Route");
const RouteBag_1 = require("../../data/helpers/RouteBag");
const CalculatedDistance_1 = require("../../data/models/CalculatedDistance");
const RoutePoint_1 = require("../../data/models/RoutePoint");
const zipper_1 = require("../../my-utils/zipper");
const City_1 = require("../../data/models/City");
const city_service_1 = require("../city/city.service");
const fcm_service_1 = require("../fcm/fcm.service");
const storage_service_1 = require("../../storage/storage.service");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const RouteData_1 = require("../../data/models/RouteData");
const Association_1 = require("../../data/models/Association");
const crypto_1 = require("crypto");
const mm = "🌿🌿🌿 RouteService 🌿";
let RouteService = class RouteService {
    constructor(storage, archiveService, messagingService, cityService, errorHandler, routeUpdateRequestModel, vehicleMediaRequestModel, routeLandmarkModel, routeCityModel, cityModel, routePointModel, calculatedDistanceModel, assModel, routeModel) {
        this.storage = storage;
        this.archiveService = archiveService;
        this.messagingService = messagingService;
        this.cityService = cityService;
        this.errorHandler = errorHandler;
        this.routeUpdateRequestModel = routeUpdateRequestModel;
        this.vehicleMediaRequestModel = vehicleMediaRequestModel;
        this.routeLandmarkModel = routeLandmarkModel;
        this.routeCityModel = routeCityModel;
        this.cityModel = cityModel;
        this.routePointModel = routePointModel;
        this.calculatedDistanceModel = calculatedDistanceModel;
        this.assModel = assModel;
        this.routeModel = routeModel;
    }
    async deleteCopiedRoutes(associationId) {
        try {
            const res1 = await this.routePointModel.deleteMany({
                associationId: associationId,
            });
            common_1.Logger.debug(`${mm} routePoints result: ${JSON.stringify(res1)}`);
            var res2 = await this.routeLandmarkModel.deleteMany({
                associationId: associationId,
            });
            common_1.Logger.debug(`${mm} routeLandmarks result: ${JSON.stringify(res2)}`);
            var res3 = await this.routeCityModel.deleteMany({
                associationId: associationId,
            });
            common_1.Logger.debug(`${mm} routeCities result: ${JSON.stringify(res3)}`);
            var res4 = await this.routeModel.deleteMany({
                associationId: associationId,
            });
            common_1.Logger.debug(`${mm} routes result: ${JSON.stringify(res4)}`);
            return `Copied routes deleted`;
        }
        catch (e) {
            common_1.Logger.error(`${mm} Failed: ${e}`);
        }
    }
    async copyRoutes(assocIdFrom, assocIdTo) {
        let routeCount = 0;
        common_1.Logger.log(`\n\n\n${mm} copyRoutes starting ...`);
        try {
            const routes = await this.routeModel.find({
                associationId: assocIdFrom,
            });
            const ass = await this.assModel.findOne({ associationId: assocIdTo });
            routes.forEach(async (rt) => {
                if (ass) {
                    const newRoute = new Route_1.Route();
                    common_1.Logger.log(`\n${mm} ${routes.length} routes to be added to ${ass.associationName} ...`);
                    newRoute.associationId = assocIdTo;
                    newRoute.associationName = ass.associationName;
                    newRoute.routeId = (0, crypto_1.randomUUID)();
                    newRoute.name = rt.name;
                    newRoute.color = rt.color;
                    newRoute.countryId = rt.countryId;
                    newRoute.countryName = rt.countryName;
                    newRoute.calculatedDistances = null;
                    newRoute.created = new Date().toISOString();
                    newRoute.routeStartEnd = rt.routeStartEnd;
                    await this.routeModel.create(newRoute);
                    routeCount++;
                    common_1.Logger.log(`\n${mm} route added to ${ass.associationName} - ${newRoute.name}`);
                    const landmarks = await this.routeLandmarkModel.find({
                        routeId: rt.routeId,
                    });
                    common_1.Logger.log(`${mm} ${landmarks.length} routeLandmarks to be created ...`);
                    let landmarksCount = 0;
                    landmarks.forEach(async (lm) => {
                        const landmark = new RouteLandmark_1.RouteLandmark();
                        landmark.landmarkId = (0, crypto_1.randomUUID)();
                        landmark.landmarkName = lm.landmarkName;
                        landmark.position = lm.position;
                        landmark.routeId = newRoute.routeId;
                        landmark.routeName = newRoute.name;
                        landmark.routePointIndex = lm.routePointIndex;
                        landmark.routePointId = lm.routePointId;
                        landmark.created = new Date().toISOString();
                        landmark.index = lm.index;
                        landmark.associationId = ass.associationId;
                        await this.routeLandmarkModel.create(landmark);
                        landmarksCount++;
                    });
                    common_1.Logger.debug(`\n${mm} ${landmarksCount} routeLandmarks added to ${newRoute.name}`);
                    const cities = await this.routeCityModel.find({
                        routeId: rt.routeId,
                    });
                    common_1.Logger.log(`${mm} ${cities.length} routeCities to be created ...`);
                    let cityCount = 0;
                    cities.forEach(async (c) => {
                        const routeCity = new RouteCity_1.RouteCity();
                        routeCity.routeId = newRoute.routeId;
                        routeCity.routeName = rt.name;
                        routeCity.cityId = c.cityId;
                        routeCity.cityName = c.cityId;
                        routeCity.position = c.position;
                        routeCity.created = new Date().toISOString();
                        routeCity.associationId = newRoute.associationId;
                        await this.routeCityModel.create(routeCity);
                        cityCount++;
                    });
                    common_1.Logger.debug(`\n${mm} ${cityCount} routeCities added to ${newRoute.name} `);
                    const points = await this.routePointModel.find({
                        routeId: rt.routeId,
                    });
                    common_1.Logger.log(`${mm} ${points.length} routePoints to be created for route: ${newRoute.name}`);
                    let pointsCount = 0;
                    points.forEach(async (c) => {
                        const routePoint = new RoutePoint_1.RoutePoint();
                        routePoint.routeId = newRoute.routeId;
                        routePoint.routeName = newRoute.name;
                        routePoint.position = c.position;
                        routePoint.index = c.index;
                        routePoint.latitude = c.latitude;
                        routePoint.longitude = c.longitude;
                        routePoint.routePointId = (0, crypto_1.randomUUID)();
                        routePoint.associationId = newRoute.associationId;
                        routePoint.heading = c.heading;
                        routePoint.created = new Date().toISOString();
                        await this.routePointModel.create(routePoint);
                        pointsCount++;
                    });
                    common_1.Logger.debug(`\n${mm}  ${pointsCount} routePoints added to ${newRoute.name} `);
                }
            });
            common_1.Logger.log(`\n\n${mm} ${routeCount} routes added to ${ass.associationName} `);
            const msg = "🥬🥬🥬🥬 route copy complete! 🥬🥬🥬🥬";
            common_1.Logger.log(`\n\n ${mm} ${msg} \n\n`);
            return msg;
        }
        catch (e) {
            common_1.Logger.error(`${mm} Routes copy failed: ${e}`);
            throw new common_1.HttpException(`Routes copy failed: ${e}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAssociationRouteLandmarksByLocation(associationId, latitude, longitude, radiusInKM) {
        return [];
    }
    async findAssociationRoutesByLocation(associationId, latitude, longitude, radiusInKM) {
        return [];
    }
    async getAssociationRouteLandmarks(associationId) {
        const routeLandmarks = await this.routeLandmarkModel.find({
            associationId: associationId,
        });
        return routeLandmarks;
    }
    async addRoute(route) {
        try {
            const res = await this.routeModel.create(route);
            common_1.Logger.log(`\n\n${mm} route ${route.name} has been added to Atlas\n ${JSON.stringify(res, null, 2)}`);
            return res;
        }
        catch (e) {
            this.errorHandler.handleError(e, route.associationId, route.associationName);
            throw new common_1.HttpException(`addRoute failed: ${e}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createRouteQRCode(route) {
        await this.routeModel.updateOne(route);
        return route;
    }
    async getCalculatedDistances(routeId) {
        return await this.calculatedDistanceModel
            .find({ routeId: routeId })
            .sort({ index: 1 });
    }
    async getRouteUpdateRequests(routeId) {
        return [];
    }
    async refreshRoute(routeId) {
        const route = await this.routeModel.findOne({ routeId: routeId });
        const marks = await this.routeLandmarkModel.find({ routeId: routeId });
        const points = await this.routePointModel
            .find({ routeId: routeId })
            .sort({ index: 1 });
        const cities = await this.routeCityModel
            .find({ routeId: routeId })
            .sort({ name: 1 });
        const bag = new RouteBag_1.RouteBag();
        bag.route = route;
        bag.routeLandmarks = marks;
        bag.routePoints = points;
        bag.routeCities = cities;
        const jsonString = JSON.stringify(bag);
        const fileName = await this.archiveService.zip([
            { contentString: jsonString },
        ]);
        return fileName;
    }
    async updateRouteColor(routeId, color) {
        const filter = { routeId: routeId };
        const update = { color: color };
        const options = { new: true };
        const updatedRoute = await this.routeModel.findOneAndUpdate(filter, update, options);
        return updatedRoute;
    }
    async addRoutePoints(list) {
        common_1.Logger.log(`${mm} addRoutePoints adding ${list.routePoints.length} points ...`);
        const pp = await this.routePointModel.insertMany(list.routePoints);
        common_1.Logger.log(`${mm} addRoutePoints insertMany result: ${pp.length}`);
        return pp.length;
    }
    async deleteRoutePointsFromIndex(routeId, index) {
        const points = await this.routePointModel.find({ routeId: routeId });
        let count = 0;
        points.forEach(async (doc) => {
            if (doc.index >= index) {
                await doc.deleteOne();
                count++;
            }
        });
        common_1.Logger.log(`${mm} deleteRoutePoints deleted: ${count}`);
        const resultPoints = await this.routePointModel
            .find({ routeId: routeId })
            .sort({ index: 1 });
        common_1.Logger.log(`${mm} updated RoutePoints after delete: ${resultPoints.length}`);
        return resultPoints;
    }
    async addCalculatedDistances(list) {
        const routeId = list[0].routeId;
        await this.calculatedDistanceModel.deleteMany({
            routeId: routeId,
        });
        return await this.calculatedDistanceModel.insertMany(list);
    }
    async fix(routeId) {
        const points = await this.routePointModel.find({ routeId: routeId });
        common_1.Logger.log(`${mm} fixing ${points.length} route points ...`);
        let count = 0;
        points.forEach(async (p) => {
            p.position.type = "Point";
            await this.routePointModel.updateOne({ _id: p._id }, p);
            count++;
        });
        return `${mm} RoutePoints fixed: ${count}`;
    }
    async addRouteLandmark(routeLandmark) {
        try {
            const cities = await this.cityService.findCitiesByLocation(routeLandmark.position.coordinates.at(1), routeLandmark.position.coordinates.at(0), 5 * 1000, 200);
            const routeCities = [];
            cities.forEach((c) => {
                const routeCity = new RouteCity_1.RouteCity();
                routeCity.routeId = routeLandmark.routeId;
                routeCity.associationId = routeLandmark.associationId;
                routeCity.cityId = c.cityId;
                routeCity.cityName = c.name;
                routeCity.position = c.position;
                routeCity.created = new Date().toISOString();
                routeCity.routeName = routeLandmark.routeName;
                routeCity.routeLandmarkId = routeLandmark.landmarkId;
                routeCity.routeLandmarkName = routeLandmark.landmarkName;
                routeCities.push(routeCity);
            });
            const rc = await this.routeCityModel.insertMany(routeCities);
            common_1.Logger.log(`${mm} route cities added: ${rc.length} for landmark: ${routeLandmark.landmarkName}`);
            const mark = await this.routeLandmarkModel.create(routeLandmark);
            common_1.Logger.log(`${mm} route landmark added: ${mark.landmarkName}`);
            const rem = await this.routeLandmarkModel
                .find({ routeId: mark.routeId })
                .sort({ index: 1 });
            return rem;
        }
        catch (e) {
            this.errorHandler.handleError(e, routeLandmark.associationId, routeLandmark.landmarkName);
            throw new common_1.HttpException(`addRouteLandmark failed: ${e}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteRouteLandmark(routeLandmarkId) {
        const mark = await this.routeLandmarkModel.findOne({
            landmarkId: routeLandmarkId,
        });
        const list = await this.routeCityModel.find({
            routeLandmarkId: routeLandmarkId,
        });
        common_1.Logger.log(`${mm} Route Cities to delete: ${list.length}`);
        if (list.length > 0) {
            const res = await this.routeCityModel.deleteMany({
                routeLandmarkId: routeLandmarkId,
            });
            common_1.Logger.debug(`${mm} route city delete: ${JSON.stringify(res)}`);
        }
        const res2 = await this.routeLandmarkModel.deleteOne({
            landmarkId: routeLandmarkId,
        });
        common_1.Logger.debug(`${mm} route landmark delete: ${JSON.stringify(res2)}`);
        const res = await this.routeLandmarkModel
            .find({ routeId: mark.routeId })
            .sort({ index: 1 });
        common_1.Logger.log(`${mm} routeLandmark deleted successfully, returning remaining landmarks: ${res.length}`);
        return res;
    }
    async deleteRoutePoint(routePointId) {
        const mark = await this.routePointModel.deleteOne({
            routePointId: routePointId,
        });
        common_1.Logger.log(`${mm} deleteRoutePoint successful: ${JSON.stringify(mark)}, }`);
        return mark;
    }
    async addVehicleMediaRequest(vehicleMediaRequest) {
        return await this.vehicleMediaRequestModel.create(vehicleMediaRequest);
    }
    async addRouteUpdateRequest(routeUpdateRequest) {
        const res = await this.routeUpdateRequestModel.create(routeUpdateRequest);
        await this.messagingService.sendRouteUpdateMessage(routeUpdateRequest);
        return res;
    }
    async updateRouteLandmark(routeLandmark) {
        return await this.routeLandmarkModel.create(routeLandmark);
    }
    async addRouteCity(routeCity) {
        return await this.routeCityModel.create(routeCity);
    }
    async addRouteCities(routeCities) {
        return await this.routeCityModel.create(routeCities);
    }
    async getRouteCities(routeId) {
        return await this.routeCityModel.find({ routeId: routeId });
    }
    async getRouteLandmarks(routeId) {
        return await this.routeLandmarkModel.find({ routeId: routeId });
    }
    async findRoutesByLocation(latitude, longitude, radiusInKM) {
        return [];
    }
    async findRouteLandmarksByLocation(latitude, longitude, radiusInKM) {
        common_1.Logger.debug(`${mm} findRouteLandmarksByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} limit: 5`);
        const query = {
            position: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [Number(longitude), Number(latitude)],
                    },
                    $maxDistance: radiusInKM * 1000,
                },
            },
        };
        const routeLandmarks = await this.routeLandmarkModel.find(query).limit(1);
        common_1.Logger.log(`${mm} route landmarks found by location: ${routeLandmarks.length}`);
        return routeLandmarks;
    }
    async findRoutePointsByLocation(latitude, longitude, radiusInKM) {
        common_1.Logger.debug(`${mm} findRoutePointsByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} limit: 5`);
        const query = {
            position: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [Number(longitude), Number(latitude)],
                    },
                    $maxDistance: radiusInKM * 1000,
                },
            },
        };
        const routePoints = await this.routePointModel.find(query).limit(1);
        common_1.Logger.log(`${mm} route points found by location: ${routePoints.length}`);
        return routePoints;
    }
    async getAssociationRoutePoints(associationId) {
        const routePoints = await this.routePointModel.find({
            associationId: associationId,
        });
        const fileName = this.archiveService.zip([
            {
                contentString: JSON.stringify(routePoints),
            },
        ]);
        return fileName;
    }
    async getAssociationRouteZippedFile(associationId) {
        const routes = await this.routeModel.find({
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} association: ${associationId}`);
        if (!associationId) {
            throw new Error(`${mm} association is undefined: 😈😈`);
        }
        if (routes.length == 0) {
            throw new Error(`${mm} association routes do not exist yet: 😈😈 ${associationId}`);
        }
        common_1.Logger.log(`${mm} getting all route data for 🔷🔷 ${routes.length} routes`);
        const assocData = new RouteData_1.AssociationRouteData();
        assocData.associationId = associationId;
        assocData.routeDataList = [];
        await this.collectShit(routes, assocData);
        const mString = JSON.stringify(assocData);
        common_1.Logger.log(`${mm} ... string to archive: 🔷🔷 ${mString.length} bytes`);
        return this.archiveService.zip([
            {
                contentString: mString,
            },
        ]);
    }
    async collectShit(routes, assocData) {
        let landmarkCount = 0;
        let citiesCount = 0;
        let routePointsCount = 0;
        assocData.routeDataList = [];
        await Promise.all(routes.map(async (route) => {
            const routePoints = await this.routePointModel.find({
                routeId: route.routeId,
            });
            routePointsCount += routePoints.length;
            const marks = await this.routeLandmarkModel.find({
                routeId: route.routeId,
            });
            landmarkCount += marks.length;
            const cityList = await this.routeCityModel.find({
                routeId: route.routeId,
            });
            citiesCount += cityList.length;
            const routeData = new RouteData_1.RouteData();
            routeData.route = route;
            routeData.cities =
                cityList.length > 1 ? this.removeDuplicates(cityList) : cityList;
            routeData.landmarks = marks;
            routeData.routePoints = routePoints;
            routeData.routeId = route.routeId;
            assocData.routeDataList.push(routeData);
            common_1.Logger.log(`${mm} route processed: 🍐🍐🍐 ${route.name}`);
            common_1.Logger.log(`${mm} route cities: 🍐🍐🍐 ${routeData.cities.length}`);
            common_1.Logger.log(`${mm} route landmarks: 🍐🍐🍐 ${routeData.landmarks.length}`);
            common_1.Logger.log(`${mm} route routePoints: 🍐🍐🍐 ${routeData.routePoints.length}\n\n`);
        }));
        common_1.Logger.log(`${mm} Association route data collected 🔷🔷🔷🔷🔷🔷🔷🔷`);
        common_1.Logger.log(`${mm} to be packed:   🔷🔷 ${routes.length} routes`);
        common_1.Logger.log(`${mm} to be packed::  🔷🔷 ${landmarkCount} landmarks`);
        common_1.Logger.log(`${mm} to be packed::  🔷🔷 ${citiesCount} cities`);
        common_1.Logger.log(`${mm} to be packed::  🔷🔷 ${routePointsCount} route points\n\n`);
    }
    removeDuplicates(cities) {
        const uniqueCities = new Map();
        cities.forEach((city) => {
            if (!uniqueCities.has(city.cityId)) {
                uniqueCities.set(city.cityId, city);
            }
        });
        common_1.Logger.debug(`${mm} deDuplicated cities: ${cities.length} to 🌼 ${Array.from(uniqueCities.values()).length}`);
        return Array.from(uniqueCities.values());
    }
    async getAssociationRouteData(associationId) {
        const routes = await this.routeModel.find({
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} getAssociationRouteData: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} association: ${associationId}`);
        if (!associationId) {
            throw new Error(`${mm} association is undefined: 😈😈`);
        }
        if (routes.length == 0) {
            throw new Error(`${mm} association routes do not exist yet: 😈😈 ${associationId}`);
        }
        common_1.Logger.log(`${mm} getting all route data for 🔷🔷 ${routes.length} routes`);
        const assocData = new RouteData_1.AssociationRouteData();
        assocData.associationId = associationId;
        await this.collectShit(routes, assocData);
        const mLength = JSON.stringify(assocData).length;
        common_1.Logger.log(`\n\n ${mm} The size of the AssociationRouteData object is approximately ${mLength / 1024 / 1024} MB`);
        return assocData;
    }
    async getAssociationRouteCities(associationId) {
        return [];
    }
    async putRouteLandmarksInOrder(routeId) {
        return [];
    }
    async getAssociationRoutes(associationId) {
        return this.routeModel.find({ associationId: associationId });
    }
    async getRoutePoints(routeId) {
        return this.routePointModel.find({ routeId: routeId }).sort({ index: 1 });
    }
    async getRoutePointsZipped(routeId) {
        const points = await this.routePointModel.find({ routeId: routeId });
        const json = JSON.stringify(points);
        return this.archiveService.zip([{ contentString: json }]);
    }
    async getRoute(routeId) {
        return this.routeModel.findOne({ routeId: routeId });
    }
    async deleteRoutePoints(routeId) {
        common_1.Logger.log(`${mm} delete routePoints for route: ${routeId}`);
        const query = {
            routeId: routeId,
        };
        const points = await this.routePointModel.find(query);
        if (points.length == 0) {
            throw new Error("RoutePoints not found");
        }
        const point = points[0];
        const res = await this.routePointModel.deleteMany({
            routeId: point.routeId,
        });
        common_1.Logger.log(`${mm} Route points deleted: ${JSON.stringify(res)} `);
        const list = await this.routePointModel
            .find({
            routeId: point.routeId,
        })
            .sort({ index: 1 });
        common_1.Logger.debug(`${mm} Route points remaining: ${list.length} `);
        return list;
    }
    async deleteRoutePointList(routePointList) {
        common_1.Logger.log(`\n\n${mm} delete these RoutePoints: ${routePointList.routePoints.length} \n`);
        if (routePointList.routePoints.length == 0) {
            throw new common_1.HttpException("No route points", common_1.HttpStatus.BAD_REQUEST);
        }
        var resp = [];
        const routeId = routePointList.routePoints[0].routeId;
        for (const rp of routePointList.routePoints) {
            const b = await this.routePointModel.deleteOne({
                routePointId: rp.routePointId,
            });
            common_1.Logger.debug(`${mm} route point delete result: ${JSON.stringify(b)}`);
            resp.push(b);
        }
        common_1.Logger.log(`${mm} Route points deleted, results: ${JSON.stringify(resp)} `);
        const mList = await this.routePointModel
            .find({
            routeId: routeId,
        })
            .sort({ index: 1 });
        common_1.Logger.debug(`${mm} Route points remaining, returning: ${mList.length} points`);
        return mList;
    }
    async removeAllDuplicateRoutePoints() {
        const list = await this.routeModel.find({});
        list.forEach((route) => {
            common_1.Logger.log(`${mm} Removing routePoints from ${route.name}`);
            this.removeDuplicateRoutePoints(route.routeId);
        });
        return { message: "removeAllDuplicateRoutePoints done" };
    }
    async removeDuplicateRoutePoints(routeId) {
        let cnt = 0;
        try {
            const duplicateRoutePoints = await this.routePointModel.aggregate([
                {
                    $match: {
                        routeId: routeId,
                    },
                },
                {
                    $group: {
                        _id: { index: "$index" },
                        count: { $sum: 1 },
                        ids: { $push: "$_id" },
                    },
                },
                {
                    $match: {
                        count: { $gt: 1 },
                    },
                },
            ]);
            common_1.Logger.log(`${mm} Duplicate route points found: ${duplicateRoutePoints.length}`);
            for (const duplicate of duplicateRoutePoints) {
                const idsToRemove = duplicate.ids.slice(1);
                const res = await this.routePointModel.deleteMany({
                    _id: { $in: idsToRemove },
                });
                cnt += res.deletedCount;
            }
            common_1.Logger.log(`${mm} Duplicate route points removed successfully. ${cnt} routePoints`);
        }
        catch (error) {
            common_1.Logger.error("Error removing duplicate route points:", error);
        }
        return {
            message: `${mm} Duplicate route points removed successfully`,
            count: cnt,
        };
    }
};
exports.RouteService = RouteService;
exports.RouteService = RouteService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_1.InjectModel)(RouteUpdateRequest_1.RouteUpdateRequest.name)),
    __param(6, (0, mongoose_1.InjectModel)(VehicleMediaRequest_1.VehicleMediaRequest.name)),
    __param(7, (0, mongoose_1.InjectModel)(RouteLandmark_1.RouteLandmark.name)),
    __param(8, (0, mongoose_1.InjectModel)(RouteCity_1.RouteCity.name)),
    __param(9, (0, mongoose_1.InjectModel)(City_1.City.name)),
    __param(10, (0, mongoose_1.InjectModel)(RoutePoint_1.RoutePoint.name)),
    __param(11, (0, mongoose_1.InjectModel)(CalculatedDistance_1.CalculatedDistance.name)),
    __param(12, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __param(13, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService,
        zipper_1.FileArchiverService,
        fcm_service_1.MessagingService,
        city_service_1.CityService,
        errors_interceptor_1.KasieErrorHandler, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], RouteService);
function rt(value, index, array) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=route.service.js.map