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
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AmbassadorPassengerCount_1 = require("../data/models/AmbassadorPassengerCount");
const AmbassadorCheckIn_1 = require("../data/models/AmbassadorCheckIn");
const RouteLandmark_1 = require("../data/models/RouteLandmark");
const Vehicle_1 = require("../data/models/Vehicle");
const messaging_service_1 = require("../messaging/messaging.service");
const TimeSeriesService_1 = require("./TimeSeriesService");
const db_ping_1 = require("../data/db_ping");
const mm = 'AmbassadorService';
let AmbassadorService = class AmbassadorService {
    constructor(messagingService, timeSeriesService, mongoService, configService, vehicleModel, ambassadorPassengerCountModel, ambassadorCheckInModel, routeLandmarkModel) {
        this.messagingService = messagingService;
        this.timeSeriesService = timeSeriesService;
        this.mongoService = mongoService;
        this.configService = configService;
        this.vehicleModel = vehicleModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.ambassadorCheckInModel = ambassadorCheckInModel;
        this.routeLandmarkModel = routeLandmarkModel;
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
    async generateRoutePassengerCounts(routeId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async getAmbassadorPassengerCount(users, passengerCounts, vehicle, marks, minutesAgo, landmarkIndex, previousAPC, mark) {
        return null;
    }
    async generateAmbassadorPassengerCounts(associationId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async getCars(list, numberOfCars) {
        return [];
    }
    async getUserAmbassadorCheckIn(userId, startDate) {
        return [];
    }
    async addAmbassadorCheckIn(count, startDate) {
        return null;
    }
    async getRoutePassengerCounts(routeId, startDate) {
        return await this.ambassadorPassengerCountModel.find({
            routeId: routeId,
            startDate: { $gte: startDate },
        });
    }
    async getCurrentPassengers(passengersIn, passengersOut, currentPassengers) {
        return null;
    }
};
exports.AmbassadorService = AmbassadorService;
exports.AmbassadorService = AmbassadorService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(5, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(6, (0, mongoose_1.InjectModel)(AmbassadorCheckIn_1.AmbassadorCheckIn.name)),
    __param(7, (0, mongoose_1.InjectModel)(RouteLandmark_1.RouteLandmark.name)),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService,
        TimeSeriesService_1.TimeSeriesService,
        db_ping_1.NewMongoService,
        config_1.ConfigService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], AmbassadorService);
//# sourceMappingURL=AmbassadorService.js.map