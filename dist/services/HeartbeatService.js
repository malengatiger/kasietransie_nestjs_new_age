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
exports.HeartbeatService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
const mongoose_2 = require("mongoose");
const Vehicle_1 = require("../data/models/Vehicle");
const VehicleHeartbeat_1 = require("../data/models/VehicleHeartbeat");
const messaging_service_1 = require("../messaging/messaging.service");
const my_utils_1 = require("../my-utils/my-utils");
const TimeSeriesService_1 = require("./TimeSeriesService");
const mm = '🌶🌶🌶 HeartbeatService 🌶 ';
let HeartbeatService = class HeartbeatService {
    constructor(configService, timeSeriesService, messagingService, vehicleModel, vehicleHeartbeatModel) {
        this.configService = configService;
        this.timeSeriesService = timeSeriesService;
        this.messagingService = messagingService;
        this.vehicleModel = vehicleModel;
        this.vehicleHeartbeatModel = vehicleHeartbeatModel;
    }
    async generateVehicleRouteHeartbeats(vehicleId, routeId, startDate, intervalInSeconds) {
        return null;
    }
    async getAssociationVehicleHeartbeats(associationId, startDate) {
        const list = await this.vehicleHeartbeatModel.find({
            associationId: associationId,
            created: { $gte: startDate },
        });
        common_1.Logger.log(`${mm} getAssociationVehicleHeartbeats: ${list.length}`);
        return list;
    }
    async addVehicleHeartbeat(heartbeat) {
        const m = await this.vehicleHeartbeatModel.create(heartbeat);
        await this.timeSeriesService.addHeartbeatTimeSeries(heartbeat.associationId, heartbeat.vehicleId, heartbeat.vehicleReg);
        await this.messagingService.sendHeartbeatMessage(m);
        return m;
    }
    async generateRouteHeartbeats(request) {
        return null;
    }
    async getVehicleHeartbeats(vehicleId, cutoffHours) {
        const startDate = my_utils_1.MyUtils.getStartDate(cutoffHours);
        const list = await this.vehicleHeartbeatModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        return list;
    }
    async countVehicleHeartbeats(vehicleId) {
        return this.vehicleHeartbeatModel.find({ vehicleId: vehicleId }).count();
    }
    async getOwnerVehicleHeartbeats(userId, cutoffHours) {
        const startDate = my_utils_1.MyUtils.getStartDate(cutoffHours);
        return this.vehicleHeartbeatModel.find({
            ownerId: userId,
            created: { $gte: startDate },
        });
    }
    async writeHeartbeat(vehicleId, startDate, intervalInSeconds, vehicle, pointsFiltered) {
        const date = new Date(startDate);
        for (const point of pointsFiltered) {
            date.setMinutes(Math.random() * 10);
            const choice = Math.random() * 100;
            if (choice > 10) {
                const hb = new VehicleHeartbeat_1.VehicleHeartbeat();
                hb.vehicleId = vehicleId;
                hb.vehicleHeartbeatId = crypto_1.randomUUID.toString();
                hb.created = date.toISOString();
                hb.vehicleReg = vehicle.vehicleReg;
                hb.make = vehicle.make;
                hb.model = vehicle.model;
                hb.position = point.position;
                hb.ownerId = vehicle.ownerId;
                hb.ownerName = vehicle.ownerName;
                hb.associationId = vehicle.associationId;
                try {
                    await this.vehicleHeartbeatModel.create(hb);
                    this.messagingService.sendHeartbeatMessage(hb);
                }
                catch (error) {
                    common_1.Logger.error(error);
                }
            }
        }
        return null;
    }
};
exports.HeartbeatService = HeartbeatService;
exports.HeartbeatService = HeartbeatService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(4, (0, mongoose_1.InjectModel)(VehicleHeartbeat_1.VehicleHeartbeat.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        TimeSeriesService_1.TimeSeriesService,
        messaging_service_1.MessagingService, mongoose_2.default.Model, mongoose_2.default.Model])
], HeartbeatService);
//# sourceMappingURL=HeartbeatService.js.map