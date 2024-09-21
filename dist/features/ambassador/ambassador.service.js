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
exports.AmbassadorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const new_mongo_service_1 = require("../../data/new_mongo_service");
const fcm_service_1 = require("../fcm/fcm.service");
const time_series_service_1 = require("../time_series/time_series.service");
let AmbassadorService = class AmbassadorService {
    constructor(messagingService, timeSeriesService, mongoService, ambassadorPassengerCountModel) {
        this.messagingService = messagingService;
        this.timeSeriesService = timeSeriesService;
        this.mongoService = mongoService;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
    }
    async getAssociationAmbassadorCheckIn(associationId, startDate) {
        return await this.mongoService.find('AmbassadorCheckIn', {
            associationId: associationId,
            startDate: startDate,
        });
    }
    async getVehicleAmbassadorCheckIn(vehicleId, startDate) {
        return await this.mongoService.find('AmbassadorCheckIn', {
            vehicleId: vehicleId,
            startDate: startDate,
        });
    }
    async getUserAmbassadorPassengerCounts(userId, startDate) {
        return this.mongoService.find('AmbassadorPassengerCount', {
            userId: userId,
            created: { $gte: startDate },
        });
    }
    async getAssociationAmbassadorPassengerCounts(associationId, startDate) {
        const list = await this.mongoService
            .find('AmbassadorPassengerCount', {
            associationId: associationId,
            created: { $gte: startDate },
        });
        common_1.Logger.debug(`AmbassadorPassengerCounts found : ${list.length}`);
        return list;
    }
    async getVehicleAmbassadorPassengerCounts(vehicleId, startDate) {
        const res = await this.mongoService.find('AmbassadorPassengerCount', {
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        return res;
    }
    async addAmbassadorPassengerCount(count) {
        const res = await this.mongoService.create('AmbassadorPassengerCount', count);
        await this.timeSeriesService.addPassengerTimeSeries(count.associationId, count.vehicleId, count.vehicleReg, count.routeId, count.passengersIn);
        await this.messagingService.sendPassengerCountMessage(res);
        return res;
    }
    async generateRoutePassengerCounts() {
        return [];
    }
    async getAmbassadorPassengerCount() {
        return null;
    }
    async generateAmbassadorPassengerCounts() {
        return [];
    }
    async getCars() {
        return [];
    }
    async getUserAmbassadorCheckIn() {
        return [];
    }
    async addAmbassadorCheckIn() {
        return null;
    }
    async getRoutePassengerCounts(routeId, startDate) {
        return await this.ambassadorPassengerCountModel.find({
            routeId: routeId,
            startDate: { $gte: startDate },
        });
    }
    async getCurrentPassengers() {
        return null;
    }
};
exports.AmbassadorService = AmbassadorService;
exports.AmbassadorService = AmbassadorService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService,
        time_series_service_1.TimeSeriesService,
        new_mongo_service_1.NewMongoService, mongoose_2.default.Model])
], AmbassadorService);
//# sourceMappingURL=ambassador.service.js.map