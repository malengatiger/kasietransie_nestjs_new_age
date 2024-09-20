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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchService = void 0;
const common_1 = require("@nestjs/common");
const zipper_1 = require("../../my-utils/zipper");
const fcm_service_1 = require("../fcm/fcm.service");
const mm = 'DispatchService';
let DispatchService = class DispatchService {
    constructor(messagingService, zipService) {
        this.messagingService = messagingService;
        this.zipService = zipService;
    }
    async addDispatchRecord(dispatchRecord) {
        return null;
    }
    async addVehicleDeparture(departure) {
        return null;
    }
    async addVehicleArrival(arrival) {
        return null;
    }
    async getAssociationCounts(associationId, startDate) {
        return null;
    }
    async getVehicleCountsByDate(vehicleId, startDate) {
        return null;
    }
    async getVehicleCounts(vehicleId) {
        return null;
    }
    async getOwnersBag(userId, startDate) {
        return null;
    }
};
exports.DispatchService = DispatchService;
exports.DispatchService = DispatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService,
        zipper_1.FileArchiverService])
], DispatchService);
//# sourceMappingURL=dispatch.service.js.map