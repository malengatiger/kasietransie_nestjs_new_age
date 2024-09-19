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
exports.DispatchService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_1 = require("../data/models/User");
const RouteLandmark_1 = require("../data/models/RouteLandmark");
const DispatchRecord_1 = require("../data/models/DispatchRecord");
const Vehicle_1 = require("../data/models/Vehicle");
const VehicleArrival_1 = require("../data/models/VehicleArrival");
const AmbassadorPassengerCount_1 = require("../data/models/AmbassadorPassengerCount");
const VehicleDeparture_1 = require("../data/models/VehicleDeparture");
const Route_1 = require("../data/models/Route");
const AssociationBag_1 = require("../data/helpers/AssociationBag");
const AssociationCounts_1 = require("../data/helpers/AssociationCounts");
const BigBag_1 = require("../data/helpers/BigBag");
const CounterBag_1 = require("../data/helpers/CounterBag");
const CommuterRequest_1 = require("../data/models/CommuterRequest");
const VehicleHeartbeat_1 = require("../data/models/VehicleHeartbeat");
const messaging_service_1 = require("../messaging/messaging.service");
const zipper_1 = require("../my-utils/zipper");
const mm = 'DispatchService';
let DispatchService = class DispatchService {
    constructor(configService, messagingService, zipService, userModel, routeLandmarkModel, dispatchRecordModel, vehicleModel, vehicleArrivalModel, vehicleHeartbeatModel, ambassadorPassengerCountModel, vehicleDepartureModel, commuterRequestModel, routeModel) {
        this.configService = configService;
        this.messagingService = messagingService;
        this.zipService = zipService;
        this.userModel = userModel;
        this.routeLandmarkModel = routeLandmarkModel;
        this.dispatchRecordModel = dispatchRecordModel;
        this.vehicleModel = vehicleModel;
        this.vehicleArrivalModel = vehicleArrivalModel;
        this.vehicleHeartbeatModel = vehicleHeartbeatModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.vehicleDepartureModel = vehicleDepartureModel;
        this.commuterRequestModel = commuterRequestModel;
        this.routeModel = routeModel;
    }
    async getAmbassadorPassengerCount(vehicle, minutesAgo, mark, user, passengers) {
        return null;
    }
    async countVehicleDeparturesByDate(vehicleId, startDate) {
        return null;
    }
    async countVehicleHeartbeatsByDate(vehicleId, startDate) {
        return null;
    }
    async countVehiclePassengerCounts(vehicleId) {
        return null;
    }
    async getAssociationVehicleDepartures(associationId, startDate) {
        return [];
    }
    async getAssociationDispatchRecords(associationId) {
        return [];
    }
    async getAssociationDispatchRecordsByDate(associationId, startDate) {
        return [];
    }
    async getAssociationVehicleArrivals(associationId) {
        return [];
    }
    async getAssociationVehicleArrivalsByDate(associationId, startDate) {
        return [];
    }
    async getAssociationCommuterRequests(associationId, startDate) {
        return [];
    }
    async generateAmbassadorPassengerCount(vehicle, routeLandmarks, users, minutesAgo, previousAPC, mark) {
        return null;
    }
    async generateHeartbeatBetweenLandmarks(vehicle, mark, next, minutesAgo) {
        return null;
    }
    async countMarshalDispatchRecords(userId) {
        return null;
    }
    async findVehicleArrivalsByLocation(associationId, latitude, longitude, radiusInKM, minutes, limit) {
        return [];
    }
    async findVehicleDeparturesByLocation(associationId, latitude, longitude, radiusInKM, minutes, limit) {
        return [];
    }
    async getLandmarkVehicleDepartures(landmarkId) {
        return [];
    }
    async getAssociationBagZippedFile(associationId, startDate) {
        const heartbeats = await this.vehicleHeartbeatModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        const arrivals = await this.vehicleArrivalModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        const departures = await this.vehicleDepartureModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        const dispatches = await this.dispatchRecordModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        const commuterRequests = await this.commuterRequestModel
            .find({
            associationId: associationId,
            dateRequested: { $gte: startDate },
        })
            .sort({ created: -1 });
        const passengerCounts = await this.ambassadorPassengerCountModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        const bag = new AssociationBag_1.AssociationBag();
        bag.heartbeats = heartbeats;
        bag.arrivals = arrivals;
        bag.departures = departures;
        bag.dispatchRecords = dispatches;
        bag.commuterRequests = commuterRequests;
        bag.passengerCounts = passengerCounts;
        const mString = JSON.stringify(bag);
        return await this.zipService.zip([{ content: mString }]);
    }
    async generateRouteDispatchRecords(route, vehicle, routeLandmarks, users, intervalInSeconds) {
        return null;
    }
    async addDispatchRecord(dispatchRecord) {
        const res = await this.dispatchRecordModel.create(dispatchRecord);
        await this.messagingService.sendDispatchMessage(dispatchRecord);
        common_1.Logger.debug(`${mm} ... add DispatchRecord completed: 🛎🛎`);
        return res;
    }
    async getVehicleArrivalsByDate(vehicleId, startDate) {
        return [];
    }
    async getVehicleArrivals(vehicleId) {
        return [];
    }
    async getVehicleHeartbeats(vehicleId, startDate) {
        return [];
    }
    async getVehicleDispatchRecords(vehicleId, startDate) {
        common_1.Logger.log(`${mm} getVehicleDispatchRecords: vehicleId: ${vehicleId} startDate: ${startDate}`);
        const res = await this.dispatchRecordModel
            .find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        })
            .sort({ created: -1 });
        common_1.Logger.log(`${mm} ... getVehicleDispatchRecords found: 🛎 ${res.length} 🛎`);
        return res;
    }
    async getVehiclePassengerCounts(vehicleId, startDate) {
        return [];
    }
    async getVehicleDepartures(vehicleId) {
        return [];
    }
    async getVehicleDeparturesByDate(vehicleId, startDate) {
        return [];
    }
    async countDispatchesByDate(vehicleId, startDate) {
        return null;
    }
    async countVehicleArrivalsByDate(vehicleId, startDate) {
        return null;
    }
    async countPassengerCountsByDate(vehicleId, startDate) {
        return null;
    }
    async countVehicleDepartures(vehicleId) {
        return null;
    }
    async countVehicleDispatches(vehicleId) {
        return null;
    }
    async countVehicleArrivals(vehicleId) {
        return null;
    }
    async getOwnerDispatchRecords(userId, startDate) {
        return [];
    }
    async getOwnerVehicleArrivals(userId, startDate) {
        return [];
    }
    async getOwnerVehicleDepartures(userId, startDate) {
        return [];
    }
    async getOwnerVehicleHeartbeats(userId, startDate) {
        return [];
    }
    async getOwnerPassengerCounts(userId, startDate) {
        return [];
    }
    async getAssociationBag(associationId, startDate) {
        return null;
    }
    async handleArrivalAndDispatch(users, vehicle, minutesAgo, mark) {
        return null;
    }
    async handleDateAndSleep(minutesAgo, intervalInSeconds) {
        return null;
    }
    async generateDeparture(vehicle, mark, minutesAgo) {
        return null;
    }
    async writeHeartbeatBetween(vehicle, minutesAgo, rp) {
        return null;
    }
    async addVehicleDeparture(vehicleDeparture) {
        const dep = await this.vehicleDepartureModel.create(vehicleDeparture);
        await this.messagingService.sendVehicleDepartureMessage(dep);
        return dep;
    }
    async handleArrival(vehicle, minutesAgo, mark) {
        return null;
    }
    async writeHeartbeat(vehicle, minutesAgo, mark) {
        return null;
    }
    async addVehicleArrival(vehicleArrival) {
        const m = await this.vehicleArrivalModel.create(vehicleArrival);
        await this.messagingService.sendVehicleArrivalMessage(vehicleArrival);
        return m;
    }
    async getRouteDispatchRecords(routeId, startDate) {
        return [];
    }
    async getRouteVehicleArrivals(routeId, startDate) {
        return [];
    }
    async addDispatchRecords(dispatchRecordList) {
        return await this.dispatchRecordModel.insertMany(dispatchRecordList.dispatchRecords);
    }
    async getLandmarkDispatchRecords(landmarkId) {
        return [];
    }
    async getMarshalDispatchRecords(marshalId, startDate) {
        return this.dispatchRecordModel.find({
            marshalId: marshalId,
            created: { $gte: startDate },
        });
    }
    async getLandmarkVehicleArrivals(landmarkId) {
        return [];
    }
    async getVehicleCountsByDate(vehicleId, startDate) {
        const departures = await this.vehicleDepartureModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const dispatches = await this.dispatchRecordModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const arrivals = await this.vehicleArrivalModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const bags = [];
        const bag1 = new CounterBag_1.CounterBag();
        bag1.count = departures;
        bag1.description = 'VehicleDeparture';
        bags.push(bag1);
        const bag2 = new CounterBag_1.CounterBag();
        bag2.count = dispatches;
        bag2.description = 'DispatchRecord';
        bags.push(bag2);
        const bag3 = new CounterBag_1.CounterBag();
        bag3.count = arrivals;
        bag3.description = 'VehicleArrival';
        bags.push(bag3);
        const bag4 = new CounterBag_1.CounterBag();
        bag4.count = heartbeats;
        bag4.description = 'VehicleHeartbeat';
        bags.push(bag4);
        const bag5 = new CounterBag_1.CounterBag();
        bag5.count = passCounts;
        bag5.description = 'AmbassadorPassengerCount';
        bags.push(bag5);
        return bags;
    }
    async getVehicleCounts(vehicleId) {
        const departures = await this.vehicleDepartureModel.countDocuments({
            vehicleId: vehicleId,
        });
        const dispatches = await this.dispatchRecordModel.countDocuments({
            vehicleId: vehicleId,
        });
        const arrivals = await this.vehicleArrivalModel.countDocuments({
            vehicleId: vehicleId,
        });
        const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
            vehicleId: vehicleId,
        });
        const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
            vehicleId: vehicleId,
        });
        const bags = [];
        const bag1 = new CounterBag_1.CounterBag();
        bag1.count = departures;
        bag1.description = 'VehicleDeparture';
        bags.push(bag1);
        const bag2 = new CounterBag_1.CounterBag();
        bag2.count = dispatches;
        bag2.description = 'DispatchRecord';
        bags.push(bag2);
        const bag3 = new CounterBag_1.CounterBag();
        bag3.count = arrivals;
        bag3.description = 'VehicleArrival';
        bags.push(bag3);
        const bag4 = new CounterBag_1.CounterBag();
        bag4.count = heartbeats;
        bag4.description = 'VehicleHeartbeat';
        bags.push(bag4);
        const bag5 = new CounterBag_1.CounterBag();
        bag5.count = passCounts;
        bag5.description = 'AmbassadorPassengerCount';
        bags.push(bag5);
        return bags;
    }
    async getOwnersBag(userId, startDate) {
        const counts = await this.ambassadorPassengerCountModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
        const arrivals = await this.vehicleArrivalModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
        const deps = await this.vehicleDepartureModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
        const disps = await this.dispatchRecordModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
        const bag = new BigBag_1.BigBag();
        bag.passengerCounts = counts;
        bag.vehicleHeartbeats = heartbeats;
        bag.vehicleDepartures = deps;
        bag.dispatchRecords = disps;
        bag.vehicleArrivals = arrivals;
        bag.created = new Date().toISOString();
        common_1.Logger.log(`${mm} dispatches: ${disps.length} arrivals: ${arrivals.length}`);
        return bag;
    }
    async getAssociationCounts(associationId, startDate) {
        const departures = await this.vehicleDepartureModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const arrivals = await this.vehicleArrivalModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const dispatches = await this.dispatchRecordModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const passengerCounts = await this.ambassadorPassengerCountModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const commuters = await this.commuterRequestModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate },
        });
        const bag = new AssociationCounts_1.AssociationCounts();
        bag.departures = departures;
        bag.arrivals = arrivals;
        bag.dispatchRecords = dispatches;
        bag.heartbeats = heartbeats;
        bag.commuterRequests = commuters;
        bag.passengerCounts = passengerCounts;
        return bag;
    }
    async fixOwnerToPassengerCounts(userId, ownerId, ownerName) {
        return null;
    }
};
exports.DispatchService = DispatchService;
exports.DispatchService = DispatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(RouteLandmark_1.RouteLandmark.name)),
    __param(5, (0, mongoose_1.InjectModel)(DispatchRecord_1.DispatchRecord.name)),
    __param(6, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(7, (0, mongoose_1.InjectModel)(VehicleArrival_1.VehicleArrival.name)),
    __param(8, (0, mongoose_1.InjectModel)(VehicleHeartbeat_1.VehicleHeartbeat.name)),
    __param(9, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(10, (0, mongoose_1.InjectModel)(VehicleDeparture_1.VehicleDeparture.name)),
    __param(11, (0, mongoose_1.InjectModel)(CommuterRequest_1.CommuterRequest.name)),
    __param(12, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        messaging_service_1.MessagingService,
        zipper_1.FileArchiverService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], DispatchService);
//# sourceMappingURL=DispatchService.js.map