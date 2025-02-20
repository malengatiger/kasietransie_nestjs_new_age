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
exports.AssociationController = void 0;
const common_1 = require("@nestjs/common");
const association_service_1 = require("./association.service");
const Association_1 = require("../../data/models/Association");
const SettingsModel_1 = require("../../data/models/SettingsModel");
const storage_service_1 = require("../../storage/storage.service");
const vehicle_service_1 = require("../vehicle/vehicle.service");
let AssociationController = class AssociationController {
    constructor(associationService, storage, vehicleService) {
        this.associationService = associationService;
        this.storage = storage;
        this.vehicleService = vehicleService;
    }
    async getAssociationData(associationId, startDate, endDate) {
        const res1 = await this.associationService.getAssociationCommuterRequests(associationId, startDate, endDate);
        const res2 = await this.associationService.getAssociationDispatchRecords(associationId, startDate, endDate);
        const res3 = await this.associationService.getAssociationCommuterCashPayments(associationId, startDate, endDate);
        const res4 = await this.associationService.getAssociationCommuterCashCheckIns(associationId, startDate, endDate);
        const res5 = await this.associationService.getAssociationRankFeeCashPayments(associationId, startDate, endDate);
        const res6 = await this.associationService.getAssociationRankFeeCashCheckIns(associationId, startDate, endDate);
        const res7 = await this.associationService.getAssociationPassengerCounts(associationId, startDate, endDate);
        const res8 = await this.associationService.getAssociationUsers(associationId);
        const res9 = await this.associationService.getAssociationVehicles(associationId);
        const res10 = await this.associationService.getAssociationRoutes(associationId);
        const res11 = await this.associationService.getAssociationVehicleArrivals(associationId, startDate, endDate);
        const res12 = await this.associationService.getAssociationVehicleTelemetry(associationId, startDate, endDate);
        const res13 = await this.associationService.getAssociationTrips(associationId, startDate, endDate);
        const ass = await this.associationService.getAssociationById(associationId);
        const tops = await this.vehicleService.getAssociationFuelTopUps(associationId, startDate, endDate);
        const bag = {
            'associationId': associationId,
            'associationName': ass.associationName,
            'commuterRequests': res1,
            'dispatchRecords': res2,
            'commuterCashPayments': res3,
            'commuterCashCheckIns': res4,
            'rankFeeCashPayments': res5,
            'rankFeeCashCheckIns': res6,
            'passengerCounts': res7,
            'vehicleArrivals': res11,
            'vehicleTelemetry': res12,
            'trips': res13,
            'users': res8,
            'vehicles': res9,
            'routes': res10,
            'fuelTopUps': tops,
        };
        common_1.Logger.debug(`getAssociationData complete, 🍎 commuterRequests: ${bag.commuterRequests.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 dispatchRecords: ${bag.dispatchRecords.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 commuterCashPayments: ${bag.commuterCashPayments.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 commuterCashCheckIns: ${bag.commuterCashCheckIns.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 rankFeeCashPayments: ${bag.rankFeeCashPayments.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 rankFeeCashCheckIns: ${bag.rankFeeCashCheckIns.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 passengerCounts: ${bag.passengerCounts.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 vehicleArrivals: ${bag.vehicleArrivals.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 vehicleTelemetry: ${bag.vehicleTelemetry.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 users: ${bag.users.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 vehicles: ${bag.vehicles.length}`);
        common_1.Logger.debug(`getAssociationData complete, 🍎 routes: ${bag.routes.length}`);
        return bag;
    }
    async registerAssociation(association) {
        return this.associationService.registerAssociation(association);
    }
    async addSettingsModel(model) {
        return this.associationService.addSettingsModel(model);
    }
    async addAssociationToken(associationId, userId, token) {
        return this.associationService.addAssociationToken(associationId, userId, token);
    }
    async resetAssociationData(associationId) {
        return this.associationService.resetAssociationData(associationId);
    }
    async downloadExampleUserCSVFile() {
        return this.associationService.downloadExampleUserCSVFile();
    }
    async getAssociations() {
        return await this.associationService.getAssociations();
    }
    async getAssociationById(associationId) {
        return await this.associationService.getAssociationById(associationId);
    }
    async getAssociationUsers(associationId) {
        return await this.associationService.getAssociationUsers(associationId);
    }
    async getAssociationVehicles(associationId) {
        return await this.associationService.getAssociationVehicles(associationId);
    }
    async getAssociationSettingsModels(associationId) {
        common_1.Logger.debug(`AssociationController: getAssociationSettingsModels AssociationId: ${JSON.stringify(associationId)}`);
        return await this.associationService.getAssociationSettingsModels(associationId);
    }
    async downloadExampleVehicleCSVFile() {
        return this.associationService.downloadExampleVehicleCSVFile();
    }
    async getAssociationAppErrors(associationId, startDate, endDate) {
        return this.associationService.getAssociationAppErrors(associationId, startDate, endDate);
    }
    async getExampleFiles() {
        return this.associationService.getExampleFiles();
    }
    async createQRCode(data) {
        return this.storage.createQRCode(data);
    }
};
exports.AssociationController = AssociationController;
__decorate([
    (0, common_1.Get)('getAssociationData'),
    __param(0, (0, common_1.Query)('associationId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationData", null);
__decorate([
    (0, common_1.Post)('registerAssociation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Association_1.Association]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "registerAssociation", null);
__decorate([
    (0, common_1.Post)('addSettingsModel'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SettingsModel_1.SettingsModel]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "addSettingsModel", null);
__decorate([
    (0, common_1.Get)('addAssociationToken'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "addAssociationToken", null);
__decorate([
    (0, common_1.Get)('resetAssociationData'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "resetAssociationData", null);
__decorate([
    (0, common_1.Get)('downloadExampleUserCSVFile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "downloadExampleUserCSVFile", null);
__decorate([
    (0, common_1.Get)('getAssociations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociations", null);
__decorate([
    (0, common_1.Get)('getAssociationById'),
    __param(0, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationById", null);
__decorate([
    (0, common_1.Get)('getAssociationUsers'),
    __param(0, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationUsers", null);
__decorate([
    (0, common_1.Get)('getAssociationVehicles'),
    __param(0, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationVehicles", null);
__decorate([
    (0, common_1.Get)('getAssociationSettingsModels'),
    __param(0, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationSettingsModels", null);
__decorate([
    (0, common_1.Get)('downloadExampleVehicleCSVFile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "downloadExampleVehicleCSVFile", null);
__decorate([
    (0, common_1.Get)('getAssociationAppErrors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationAppErrors", null);
__decorate([
    (0, common_1.Post)('createQRCode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "createQRCode", null);
exports.AssociationController = AssociationController = __decorate([
    (0, common_1.Controller)('association'),
    __metadata("design:paramtypes", [association_service_1.AssociationService,
        storage_service_1.CloudStorageUploaderService,
        vehicle_service_1.VehicleService])
], AssociationController);
//# sourceMappingURL=association.controller.js.map