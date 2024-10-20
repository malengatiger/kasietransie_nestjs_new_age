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
const AssociationCounts_1 = require("../../data/helpers/AssociationCounts");
const BigBag_1 = require("../../data/helpers/BigBag");
const CounterBag_1 = require("../../data/helpers/CounterBag");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const zipper_1 = require("../../my-utils/zipper");
const fcm_service_1 = require("../fcm/fcm.service");
const AssociationBag_1 = require("../../data/helpers/AssociationBag");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mm = "DispatchService";
let DispatchService = class DispatchService {
    constructor(messagingService, zipService, vehicleHeartbeatModel, vehicleArrivalModel, vehicleDepartureModel, dispatchRecordModel, ambassadorPassengerCountModel, commuterRequestModel) {
        this.messagingService = messagingService;
        this.zipService = zipService;
        this.vehicleHeartbeatModel = vehicleHeartbeatModel;
        this.vehicleArrivalModel = vehicleArrivalModel;
        this.vehicleDepartureModel = vehicleDepartureModel;
        this.dispatchRecordModel = dispatchRecordModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.commuterRequestModel = commuterRequestModel;
    }
    async getAmbassadorPassengerCounts(userId, startDate, endDate) {
        return null;
    }
    async countVehicleDeparturesByDate(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehicleHeartbeatsByDate(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehiclePassengerCounts(vehicleId, startDate, endDate) {
        return null;
    }
    async getAssociationVehicleDepartures(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationDispatchRecords(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationDispatchRecordsByDate(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationVehicleArrivals(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationVehicleArrivalsByDate(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationCommuterRequests(associationId, startDate, endDate) {
        return [];
    }
    async generateAmbassadorPassengerCount() {
        return null;
    }
    async generateHeartbeatBetweenLandmarks() {
        return null;
    }
    async countMarshalDispatchRecords() {
        return null;
    }
    async findVehicleArrivalsByLocation() {
        return [];
    }
    async findVehicleDeparturesByLocation() {
        return [];
    }
    async getLandmarkVehicleDepartures() {
        return [];
    }
    async getAssociationBagZippedFile(associationId, startDate, endDate) {
        const heartbeats = await this.vehicleHeartbeatModel
            .find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        })
            .sort({ created: -1 });
        const arrivals = await this.vehicleArrivalModel
            .find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        })
            .sort({ created: -1 });
        const departures = await this.vehicleDepartureModel
            .find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        })
            .sort({ created: -1 });
        const dispatches = await this.dispatchRecordModel
            .find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        })
            .sort({ created: -1 });
        const commuterRequests = await this.commuterRequestModel
            .find({
            associationId: associationId,
            dateRequested: { $gte: startDate, $lte: endDate },
        })
            .sort({ created: -1 });
        const passengerCounts = await this.ambassadorPassengerCountModel
            .find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
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
        return await this.zipService.zip([{ contentString: mString }]);
    }
    async generateRouteDispatchRecords() {
        return null;
    }
    async addDispatchRecord(dispatchRecord) {
        const res = await this.dispatchRecordModel.create(dispatchRecord);
        await this.messagingService.sendDispatchMessage(dispatchRecord);
        common_1.Logger.debug(`${mm} ... add DispatchRecord completed: 🛎🛎`);
        return res;
    }
    async getVehicleArrivalsByDate(vehicleId, startDate, endDate) {
        return [];
    }
    async getVehicleArrivals(vehicleId, startDate, endDate) {
        return [];
    }
    async getVehicleHeartbeats(vehicleId, startDate, endDate) {
        return [];
    }
    async getVehicleDispatchRecords(vehicleId, startDate, endDate) {
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
    async getVehiclePassengerCounts(vehicleId, startDate, endDate) {
        return [];
    }
    async getVehicleDepartures(vehicleId, startDate, endDate) {
        return [];
    }
    async getVehicleDeparturesByDate(vehicleId, startDate, endDate) {
        return [];
    }
    async countDispatchesByDate(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehicleArrivalsByDate(vehicleId, startDate, endDate) {
        return null;
    }
    async countPassengerCountsByDate(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehicleDepartures(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehicleDispatches(vehicleId, startDate, endDate) {
        return null;
    }
    async countVehicleArrivals(vehicleId, startDate, endDate) {
        return null;
    }
    async getOwnerDispatchRecords(ownerId, startDate, endDate) {
        return [];
    }
    async getOwnerVehicleArrivals(ownerId, startDate, endDate) {
        return [];
    }
    async getOwnerVehicleDepartures(ownerId, startDate, endDate) {
        return [];
    }
    async getOwnerVehicleHeartbeats(ownerId, startDate, endDate) {
        return [];
    }
    async getOwnerPassengerCounts(ownerId, startDate, endDate) {
        return [];
    }
    async getAssociationBag(associationId, startDate, endDate) {
        return null;
    }
    async handleArrivalAndDispatch() {
        return null;
    }
    async handleDateAndSleep() {
        return null;
    }
    async generateDeparture() {
        return null;
    }
    async writeHeartbeatBetween() {
        return null;
    }
    async addVehicleDeparture(vehicleDeparture) {
        const dep = await this.vehicleDepartureModel.create(vehicleDeparture);
        await this.messagingService.sendVehicleDepartureMessage(dep);
        return dep;
    }
    async handleArrival() {
        return null;
    }
    async addVehicleHeartbeat(heartbeat) {
        const m = await this.vehicleHeartbeatModel.create(heartbeat);
        return m;
    }
    async addVehicleArrival(vehicleArrival) {
        const m = await this.vehicleArrivalModel.create(vehicleArrival);
        await this.messagingService.sendVehicleArrivalMessage(vehicleArrival);
        return m;
    }
    async getRouteDispatchRecords() {
        return [];
    }
    async getRouteVehicleArrivals() {
        return [];
    }
    async addDispatchRecords(dispatchRecordList) {
        return await this.dispatchRecordModel.insertMany(dispatchRecordList.dispatchRecords);
    }
    async getLandmarkDispatchRecords() {
        return [];
    }
    async getMarshalDispatchRecords(marshalId, startDate) {
        return this.dispatchRecordModel.find({
            marshalId: marshalId,
            created: { $gte: startDate },
        });
    }
    async getLandmarkVehicleArrivals() {
        return [];
    }
    async getVehicleCountsByDate(vehicleId, startDate, endDate) {
        const departures = await this.vehicleDepartureModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate, $lte: endDate },
        });
        const dispatches = await this.dispatchRecordModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate, $lte: endDate },
        });
        const arrivals = await this.vehicleArrivalModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate, $lte: endDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate, $lte: endDate },
        });
        const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
            vehicleId: vehicleId,
            created: { $gte: startDate, $lte: endDate },
        });
        const bags = [];
        const bag1 = new CounterBag_1.CounterBag();
        bag1.count = departures;
        bag1.description = "VehicleDeparture";
        bags.push(bag1);
        const bag2 = new CounterBag_1.CounterBag();
        bag2.count = dispatches;
        bag2.description = "DispatchRecord";
        bags.push(bag2);
        const bag3 = new CounterBag_1.CounterBag();
        bag3.count = arrivals;
        bag3.description = "VehicleArrival";
        bags.push(bag3);
        const bag4 = new CounterBag_1.CounterBag();
        bag4.count = heartbeats;
        bag4.description = "VehicleHeartbeat";
        bags.push(bag4);
        const bag5 = new CounterBag_1.CounterBag();
        bag5.count = passCounts;
        bag5.description = "AmbassadorPassengerCount";
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
        bag1.description = "VehicleDeparture";
        bags.push(bag1);
        const bag2 = new CounterBag_1.CounterBag();
        bag2.count = dispatches;
        bag2.description = "DispatchRecord";
        bags.push(bag2);
        const bag3 = new CounterBag_1.CounterBag();
        bag3.count = arrivals;
        bag3.description = "VehicleArrival";
        bags.push(bag3);
        const bag4 = new CounterBag_1.CounterBag();
        bag4.count = heartbeats;
        bag4.description = "VehicleHeartbeat";
        bags.push(bag4);
        const bag5 = new CounterBag_1.CounterBag();
        bag5.count = passCounts;
        bag5.description = "AmbassadorPassengerCount";
        bags.push(bag5);
        return bags;
    }
    async getOwnersBag(userId, startDate, endDate) {
        const counts = await this.ambassadorPassengerCountModel.find({
            ownerId: userId,
            created: { $gte: startDate, $lte: endDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.find({
            ownerId: userId,
            created: { $gte: startDate, $lte: endDate },
        });
        const arrivals = await this.vehicleArrivalModel.find({
            ownerId: userId,
            created: { $gte: startDate, $lte: endDate },
        });
        const deps = await this.vehicleDepartureModel.find({
            ownerId: userId,
            created: { $gte: startDate, $lte: endDate },
        });
        const disps = await this.dispatchRecordModel.find({
            ownerId: userId,
            created: { $gte: startDate, $lte: endDate },
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
    async getAssociationCounts(associationId, startDate, endDate) {
        const departures = await this.vehicleDepartureModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        const arrivals = await this.vehicleArrivalModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        const dispatches = await this.dispatchRecordModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        const passengerCounts = await this.ambassadorPassengerCountModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        const commuters = await this.commuterRequestModel.countDocuments({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
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
    async fixOwnerToPassengerCounts() {
        return null;
    }
};
exports.DispatchService = DispatchService;
exports.DispatchService = DispatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(VehicleHeartbeat_1.VehicleHeartbeat.name)),
    __param(3, (0, mongoose_1.InjectModel)(VehicleArrival_1.VehicleArrival.name)),
    __param(4, (0, mongoose_1.InjectModel)(VehicleDeparture_1.VehicleDeparture.name)),
    __param(5, (0, mongoose_1.InjectModel)(DispatchRecord_1.DispatchRecord.name)),
    __param(6, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(7, (0, mongoose_1.InjectModel)(CommuterRequest_1.CommuterRequest.name)),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService,
        zipper_1.FileArchiverService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], DispatchService);
//# sourceMappingURL=dispatch.service.js.map