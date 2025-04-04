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
exports.CommuterController = void 0;
const common_1 = require("@nestjs/common");
const commuter_service_1 = require("./commuter.service");
const Commuter_1 = require("../../data/models/Commuter");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const CommuterPickup_1 = require("../../data/models/CommuterPickup");
let CommuterController = class CommuterController {
    constructor(commuterService) {
        this.commuterService = commuterService;
    }
    async addCommuter(commuter) {
        return await this.commuterService.addCommuter(commuter);
    }
    async updateCommuter(commuter) {
        return await this.commuterService.updateCommuter(commuter);
    }
    async addCommuterRequest(commuterRequest) {
        return await this.commuterService.addCommuterRequest(commuterRequest);
    }
    async addCommuterPickUp(commuterPickUp) {
        return await this.commuterService.addCommuterPickUp(commuterPickUp);
    }
    async cancelCommuterRequest(commuterRequest) {
        return null;
    }
    async getRouteCommuterRequests(routeId, startDate) {
        return await this.commuterService.getRouteCommuterRequests(routeId, startDate);
    }
    async getCommuterRequests(commuterId, startDate) {
        return await this.commuterService.getCommuterRequests(commuterId, startDate);
    }
    async getAssociationCommuterRequests(associationId, startDate) {
        return await this.commuterService.getAssociationCommuterRequests(associationId, startDate);
    }
};
exports.CommuterController = CommuterController;
__decorate([
    (0, common_1.Post)('addCommuter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Commuter_1.Commuter]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "addCommuter", null);
__decorate([
    (0, common_1.Post)('updateCommuter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Commuter_1.Commuter]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "updateCommuter", null);
__decorate([
    (0, common_1.Post)('addCommuterRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommuterRequest_1.CommuterRequest]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "addCommuterRequest", null);
__decorate([
    (0, common_1.Post)('addCommuterPickUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommuterPickup_1.CommuterPickup]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "addCommuterPickUp", null);
__decorate([
    (0, common_1.Post)('cancelCommuterRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommuterRequest_1.CommuterRequest]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "cancelCommuterRequest", null);
__decorate([
    (0, common_1.Get)('getRouteCommuterRequests'),
    __param(0, (0, common_1.Query)('routeId')),
    __param(1, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "getRouteCommuterRequests", null);
__decorate([
    (0, common_1.Get)('getCommuterRequests'),
    __param(0, (0, common_1.Query)('commuterId')),
    __param(1, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "getCommuterRequests", null);
__decorate([
    (0, common_1.Get)('getAssociationCommuterRequests'),
    __param(0, (0, common_1.Query)('associationId')),
    __param(1, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommuterController.prototype, "getAssociationCommuterRequests", null);
exports.CommuterController = CommuterController = __decorate([
    (0, common_1.Controller)('commuter'),
    __metadata("design:paramtypes", [commuter_service_1.CommuterService])
], CommuterController);
//# sourceMappingURL=commuter.controller.js.map