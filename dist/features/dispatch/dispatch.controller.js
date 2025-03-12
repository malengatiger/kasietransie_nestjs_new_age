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
exports.DispatchController = void 0;
const common_1 = require("@nestjs/common");
const dispatch_service_1 = require("./dispatch.service");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const Trip_1 = require("../../data/models/Trip");
let DispatchController = class DispatchController {
    constructor(dispatchService) {
        this.dispatchService = dispatchService;
    }
    async addTrip(trip) {
        return this.dispatchService.addTrip(trip);
    }
    async updateTrip(trip) {
        return this.dispatchService.updateTrip(trip);
    }
    async addDispatchRecord(dispatchRecord) {
        return this.dispatchService.addDispatchRecord(dispatchRecord);
    }
    async addVehicleDeparture(departure) {
        return this.dispatchService.addVehicleDeparture(departure);
    }
    async addVehicleArrival(departure) {
        return this.dispatchService.addVehicleArrival(departure);
    }
    async addVehicleHeartbeat(heartbeat) {
        return this.dispatchService.addVehicleHeartbeat(heartbeat);
    }
    async getVehicleCountsByDate(vehicleId, startDate, endDate) {
        return this.dispatchService.getVehicleCountsByDate(vehicleId, startDate, endDate);
    }
    async getOwnersBag(userId, startDate, endDate) {
        return this.dispatchService.getOwnersBag(userId, startDate, endDate);
    }
    async getAmbassadorPassengerCount(userId, startDate, endDate) {
        return this.dispatchService.getAmbassadorPassengerCounts(userId, startDate, endDate);
    }
    async getAssociationBagZippedFile(associationId, startDate, endDate) {
        return this.dispatchService.getAssociationBagZippedFile(associationId, startDate, endDate);
    }
    async getAssociationCounts(associationId, startDate, endDate) {
        return this.dispatchService.getAssociationCounts(associationId, startDate, endDate);
    }
    async getRouteDispatchRecords(query) {
        return this.dispatchService.getRouteDispatchRecords(query.routeId, query.startDate);
    }
    async getRouteCommuterCashPayments(query) {
        return this.dispatchService.getRouteCommuterCashPayments(query.routeId, query.startDate);
    }
    async getRoutePassengerCounts(query) {
        return this.dispatchService.getRoutePassengerCounts(query.routeId, query.startDate);
    }
    async getRouteRankFeeCashPayments(query) {
        return this.dispatchService.getRouteRankFeeCashPayments(query.routeId, query.startDate);
    }
    async getRouteTrips(query) {
        return this.dispatchService.getRouteTrips(query.routeId, query.startDate);
    }
};
exports.DispatchController = DispatchController;
__decorate([
    (0, common_1.Post)("addTrip"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Trip_1.Trip]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addTrip", null);
__decorate([
    (0, common_1.Post)("updateTrip"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Trip_1.Trip]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "updateTrip", null);
__decorate([
    (0, common_1.Post)("addDispatchRecord"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DispatchRecord_1.DispatchRecord]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addDispatchRecord", null);
__decorate([
    (0, common_1.Post)("addVehicleDeparture"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleDeparture_1.VehicleDeparture]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addVehicleDeparture", null);
__decorate([
    (0, common_1.Post)("addVehicleArrival"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleArrival_1.VehicleArrival]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addVehicleArrival", null);
__decorate([
    (0, common_1.Post)("addVehicleHeartbeat"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleHeartbeat_1.VehicleHeartbeat]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addVehicleHeartbeat", null);
__decorate([
    (0, common_1.Get)("getVehicleCountsByDate"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getVehicleCountsByDate", null);
__decorate([
    (0, common_1.Get)("getOwnersBag"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getOwnersBag", null);
__decorate([
    (0, common_1.Get)("getAmbassadorPassengerCount"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getAmbassadorPassengerCount", null);
__decorate([
    (0, common_1.Get)("getAssociationBagZippedFile"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getAssociationBagZippedFile", null);
__decorate([
    (0, common_1.Get)("getAssociationCounts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getAssociationCounts", null);
__decorate([
    (0, common_1.Get)("getRouteDispatchRecords"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRouteDispatchRecords", null);
__decorate([
    (0, common_1.Get)("getRouteCommuterCashPayments"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRouteCommuterCashPayments", null);
__decorate([
    (0, common_1.Get)("getRoutePassengerCounts"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRoutePassengerCounts", null);
__decorate([
    (0, common_1.Get)("getRouteRankFeeCashPayments"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRouteRankFeeCashPayments", null);
__decorate([
    (0, common_1.Get)("getRouteTrips"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getRouteTrips", null);
exports.DispatchController = DispatchController = __decorate([
    (0, common_1.Controller)("dispatch"),
    __metadata("design:paramtypes", [dispatch_service_1.DispatchService])
], DispatchController);
//# sourceMappingURL=dispatch.controller.js.map