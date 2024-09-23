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
const AmbassadorCheckIn_1 = require("../../data/models/AmbassadorCheckIn");
const Vehicle_1 = require("../../data/models/Vehicle");
const fcm_service_1 = require("../fcm/fcm.service");
const time_series_service_1 = require("../time_series/time_series.service");
let AmbassadorService = class AmbassadorService {
    constructor(messagingService, timeSeriesService, ambassadorPassengerCountModel, ambassadorCheckInModel, vehicleModel) {
        this.messagingService = messagingService;
        this.timeSeriesService = timeSeriesService;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.ambassadorCheckInModel = ambassadorCheckInModel;
        this.vehicleModel = vehicleModel;
    }
    async getAssociationAmbassadorCheckIn(associationId, startDate) {
        return await this.ambassadorCheckInModel.find({
            associationId: associationId,
            startDate: startDate,
        });
    }
    async getVehicleAmbassadorCheckIn(vehicleId, startDate) {
        return await this.ambassadorCheckInModel.find({
            vehicleId: vehicleId,
            startDate: startDate,
        });
    }
    async getUserAmbassadorPassengerCounts(userId, startDate) {
        return this.ambassadorPassengerCountModel.find({
            userId: userId,
            created: { $gte: startDate },
        });
    }
    async getAssociationAmbassadorPassengerCounts(associationId, startDate) {
        const list = await this.ambassadorPassengerCountModel
            .find({
            associationId: associationId,
            created: { $gte: startDate },
        });
        common_1.Logger.debug(`AmbassadorPassengerCounts found : ${list.length}`);
        return list;
    }
    async getVehicleAmbassadorPassengerCounts(vehicleId, startDate) {
        const res = await this.ambassadorPassengerCountModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        return res;
    }
    async addAmbassadorPassengerCount(count) {
        const res = await this.ambassadorPassengerCountModel.create(count);
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
    __param(2, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(3, (0, mongoose_1.InjectModel)(AmbassadorCheckIn_1.AmbassadorCheckIn.name)),
    __param(4, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService,
        time_series_service_1.TimeSeriesService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], AmbassadorService);
//# sourceMappingURL=ambassador.service.js.map