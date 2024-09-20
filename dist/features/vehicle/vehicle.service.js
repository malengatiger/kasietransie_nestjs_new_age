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
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Vehicle_1 = require("../../data/models/Vehicle");
const Association_1 = require("../../data/models/Association");
const User_1 = require("../../data/models/User");
const Route_1 = require("../../data/models/Route");
const RouteAssignment_1 = require("../../data/models/RouteAssignment");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const csv_parser_1 = require("csv-parser");
const fs = require("fs");
const crypto_1 = require("crypto");
const my_utils_1 = require("../../my-utils/my-utils");
const VehicleBag_1 = require("../../data/helpers/VehicleBag");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const association_service_1 = require("../association/association.service");
const mm = ' 💚 💚 💚 VehicleService  💚';
let VehicleService = class VehicleService {
    constructor(configService, associationService, vehicleModel, dispatchRecordModel, vehicleArrivalModel, vehicleHeartbeatModel, ambassadorPassengerCountModel, vehicleDepartureModel, associationModel, userModel, assignModel, routeModel) {
        this.configService = configService;
        this.associationService = associationService;
        this.vehicleModel = vehicleModel;
        this.dispatchRecordModel = dispatchRecordModel;
        this.vehicleArrivalModel = vehicleArrivalModel;
        this.vehicleHeartbeatModel = vehicleHeartbeatModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.vehicleDepartureModel = vehicleDepartureModel;
        this.associationModel = associationModel;
        this.userModel = userModel;
        this.assignModel = assignModel;
        this.routeModel = routeModel;
    }
    async findOwnerVehiclesByLocationAndTime(userId, latitude, longitude, minutes) {
        return [];
    }
    async findAssociationVehiclesByLocationAndTime(associationId, latitude, longitude, minutes) {
        return [];
    }
    async generateFakeVehiclesFromFile(associationId) {
        return [];
    }
    async getPoints(route) {
        return [];
    }
    async buildUser(cellphone, lastName, firstName, ass, responses) {
        return null;
    }
    async insertCar(resultVehicles, responses, existingUser, vehicle, result) {
        return null;
    }
    async addVehicle(vehicle) {
        const url = await my_utils_1.MyUtils.createQRCodeAndUploadToCloudStorage(JSON.stringify(vehicle), vehicle.vehicleReg, 2);
        vehicle.qrCodeUrl = url;
        return await this.vehicleModel.create(vehicle);
    }
    async getVehicleBag(vehicleId, startDate) {
        const dispatches = await this.dispatchRecordModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const beats = await this.vehicleHeartbeatModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const counts = await this.ambassadorPassengerCountModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const arrivals = await this.vehicleArrivalModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const deps = await this.vehicleDepartureModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const bag = new VehicleBag_1.VehicleBag();
        bag.arrivals = arrivals;
        bag.dispatchRecords = dispatches;
        bag.created = new Date().toISOString();
        bag.departures = deps;
        bag.heartbeats = beats;
        bag.vehicleId = vehicleId;
        bag.passengerCounts = counts;
        return bag;
    }
    async addRouteAssignments(list) {
        common_1.Logger.log(`${mm} ... addRouteAssignments: ${list.assignments}`);
        return await this.assignModel.insertMany(list.assignments);
    }
    async getVehicleRouteAssignments(vehicleId) {
        return this.assignModel.find({ vehicleId: vehicleId });
    }
    async getRouteAssignments(routeId) {
        return this.assignModel.find({ routeId: routeId });
    }
    async generateHeartbeats(associationId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async generateRouteHeartbeats(routeId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async updateVehicle(vehicle) {
        return await this.vehicleModel.create(vehicle);
    }
    async getOwnerVehicles(userId, page) {
        return this.vehicleModel.find({ ownerId: userId }).sort({ vehicleReg: 1 });
    }
    async updateVehicleQRCode(vehicle) {
        const url = await my_utils_1.MyUtils.createQRCodeAndUploadToCloudStorage(JSON.stringify(vehicle), vehicle.vehicleReg.replace(' ', ''), 2);
        vehicle.qrCodeUrl = url;
        await this.vehicleModel.create(vehicle);
        return 0;
    }
    async importVehiclesFromJSON(file, associationId) {
        const ass = await this.associationService.getAssociationById(associationId);
        const cars = [];
        const jsonData = fs.readFileSync(file.path, 'utf-8');
        const jsonUsers = JSON.parse(jsonData);
        jsonUsers.forEach(async (data) => {
            const car = await this.buildCar(data, ass);
            cars.push(car);
        });
        const uList = [];
        await this.processCars(cars, uList);
        return uList;
    }
    async processCars(cars, uList) {
        cars.forEach(async (data) => {
            const url = await my_utils_1.MyUtils.createQRCodeAndUploadToCloudStorage(JSON.stringify(data), data.vehicleReg.replace(' ', ''), 2);
            data.qrCodeUrl = url;
            const c = await this.vehicleModel.create(data);
            uList.push(c);
        });
        common_1.Logger.log(`${uList.length} cars added`);
    }
    async importVehiclesFromCSV(file, associationId) {
        const ass = await this.associationService.getAssociationById(associationId);
        const cars = [];
        const pCars = [];
        fs.createReadStream(file.path)
            .pipe((0, csv_parser_1.default)())
            .on('data', async (data) => {
            const car = await this.buildCar(data, ass);
            cars.push(car);
        })
            .on('end', async () => {
            await this.processCars(cars, pCars);
        });
        common_1.Logger.log(`${pCars.length} cars added`);
        return cars;
    }
    async buildCar(data, ass) {
        const car = {
            _partitionKey: null,
            _id: null,
            ownerId: null,
            cellphone: data.cellphone,
            vehicleId: crypto_1.randomUUID.toString(),
            associationId: ass.associationId,
            countryId: ass.countryId,
            ownerName: data.ownerName,
            associationName: ass.associationName,
            vehicleReg: data.vehicleReg,
            model: data.model,
            make: data.make,
            year: data.year,
            passengerCapacity: data.passengerCapacity,
            active: 0,
            created: Date.now().toString(),
            updated: null,
            dateInstalled: null,
            qrCodeUrl: null,
        };
        const prefix = data.vehicleReg.replace(' ', '');
        const url = await my_utils_1.MyUtils.createQRCodeAndUploadToCloudStorage(JSON.stringify(car), prefix, 2);
        car.qrCodeUrl = url;
        return car;
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(3, (0, mongoose_1.InjectModel)(DispatchRecord_1.DispatchRecord.name)),
    __param(4, (0, mongoose_1.InjectModel)(VehicleArrival_1.VehicleArrival.name)),
    __param(5, (0, mongoose_1.InjectModel)(VehicleHeartbeat_1.VehicleHeartbeat.name)),
    __param(6, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(7, (0, mongoose_1.InjectModel)(VehicleDeparture_1.VehicleDeparture.name)),
    __param(8, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __param(9, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(10, (0, mongoose_1.InjectModel)(RouteAssignment_1.RouteAssignment.name)),
    __param(11, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        association_service_1.AssociationService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map