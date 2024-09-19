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
const DispatchRecord_1 = require("../data/models/DispatchRecord");
const AmbassadorService_1 = require("../services/AmbassadorService");
const DispatchService_1 = require("../services/DispatchService");
const FirebaseService_1 = require("../services/FirebaseService");
const VehicleDeparture_1 = require("../data/models/VehicleDeparture");
let DispatchController = class DispatchController {
    constructor(dispatchService, fbService, ambassadorService) {
        this.dispatchService = dispatchService;
        this.fbService = fbService;
        this.ambassadorService = ambassadorService;
    }
    async addDispatchRecord(dispatchRecord) {
        return await this.dispatchService.addDispatchRecord(dispatchRecord);
    }
    async addVehicleDeparture(departure) {
        return await this.dispatchService.addVehicleDeparture(departure);
    }
    async getVehicleAmbassadorPassengerCounts(query) {
        return await this.ambassadorService.getVehicleAmbassadorPassengerCounts(query.vehicleId, query.startDate);
    }
    async getAssociationCounts(query) {
        return await this.dispatchService.getAssociationCounts(query.associationId, query.startDate);
    }
    async getVehicleCountsByDate(query) {
        return await this.dispatchService.getVehicleCountsByDate(query.vehicleId, query.startDate);
    }
    async getVehicleDispatchRecords(query) {
        return await this.dispatchService.getVehicleDispatchRecords(query.vehicleId, query.startDate);
    }
    async getMarshalDispatchRecords(query) {
        return await this.dispatchService.getMarshalDispatchRecords(query.marshalId, query.startDate);
    }
    async getVehicleCounts(query) {
        return await this.dispatchService.getVehicleCounts(query.vehicleId);
    }
    async getOwnersBag(query) {
        return await this.dispatchService.getOwnersBag(query.userId, query.startDate);
    }
};
exports.DispatchController = DispatchController;
__decorate([
    (0, common_1.Post)('addDispatchRecord'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DispatchRecord_1.DispatchRecord]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addDispatchRecord", null);
__decorate([
    (0, common_1.Post)('addVehicleDeparture'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleDeparture_1.VehicleDeparture]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "addVehicleDeparture", null);
__decorate([
    (0, common_1.Get)('getVehicleAmbassadorPassengerCounts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getVehicleAmbassadorPassengerCounts", null);
__decorate([
    (0, common_1.Get)('getAssociationCounts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getAssociationCounts", null);
__decorate([
    (0, common_1.Get)('getVehicleCountsByDate'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getVehicleCountsByDate", null);
__decorate([
    (0, common_1.Get)('getVehicleDispatchRecords'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getVehicleDispatchRecords", null);
__decorate([
    (0, common_1.Get)('getMarshalDispatchRecords'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getMarshalDispatchRecords", null);
__decorate([
    (0, common_1.Get)('getVehicleCounts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getVehicleCounts", null);
__decorate([
    (0, common_1.Get)('getOwnersBag'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DispatchController.prototype, "getOwnersBag", null);
exports.DispatchController = DispatchController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [DispatchService_1.DispatchService,
        FirebaseService_1.MyFirebaseService,
        AmbassadorService_1.AmbassadorService])
], DispatchController);
//# sourceMappingURL=dispatch_controller.js.map