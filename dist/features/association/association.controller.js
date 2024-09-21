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
let AssociationController = class AssociationController {
    constructor(associationService) {
        this.associationService = associationService;
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
    async downloadExampleUserCSVFile() {
        return this.associationService.downloadExampleUserCSVFile();
    }
    async getAssociations() {
        return this.associationService.getAssociations();
    }
    async getAssociationVehicles(associationId) {
        return await this.associationService.getAssociationVehicles(associationId);
    }
    async getAssociationSettingsModels(associationId) {
        return await this.associationService.getAssociationSettingsModels(associationId);
    }
    async downloadExampleVehicleCSVFile() {
        return this.associationService.downloadExampleVehicleCSVFile();
    }
    async getAssociationAppErrors(associationId, startDate, endDate) {
        return this.associationService.getAssociationAppErrors(associationId, startDate, endDate);
    }
    async generateFakeAssociation(name) {
        return await this.associationService.generateFakeAssociation(name);
    }
    async getExampleFiles() {
        return this.associationService.getExampleFiles();
    }
};
exports.AssociationController = AssociationController;
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
    (0, common_1.Get)('getAssociationVehicles'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "getAssociationVehicles", null);
__decorate([
    (0, common_1.Get)('getAssociationSettingsModels'),
    __param(0, (0, common_1.Query)()),
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
    (0, common_1.Get)('generateFakeAssociation'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssociationController.prototype, "generateFakeAssociation", null);
exports.AssociationController = AssociationController = __decorate([
    (0, common_1.Controller)('association'),
    __metadata("design:paramtypes", [association_service_1.AssociationService])
], AssociationController);
//# sourceMappingURL=association.controller.js.map