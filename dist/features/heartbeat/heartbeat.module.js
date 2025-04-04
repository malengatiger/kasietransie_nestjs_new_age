"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartbeatModule = void 0;
const common_1 = require("@nestjs/common");
const heartbeat_service_1 = require("./heartbeat.service");
const heartbeat_controller_1 = require("./heartbeat.controller");
const time_series_service_1 = require("../time_series/time_series.service");
const fcm_service_1 = require("../fcm/fcm.service");
const Vehicle_1 = require("../../data/models/Vehicle");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const VehicleTelemetry_1 = require("../../data/models/VehicleTelemetry");
const zipper_1 = require("../../my-utils/zipper");
const VehicleHeartbeatTimeSeries_1 = require("../../data/models/VehicleHeartbeatTimeSeries");
const PassengerTimeSeries_1 = require("../../data/models/PassengerTimeSeries");
const RouteUpdateRequest_1 = require("../../data/models/RouteUpdateRequest");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const firebase_util_1 = require("../../services/firebase_util");
let HeartbeatModule = class HeartbeatModule {
};
exports.HeartbeatModule = HeartbeatModule;
exports.HeartbeatModule = HeartbeatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "VehicleHeartbeat", schema: VehicleHeartbeat_1.VehicleHeartbeatSchema },
                { name: "VehicleTelemetry", schema: VehicleTelemetry_1.VehicleTelemetrySchema },
                { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema },
                { name: "PassengerTimeSeries", schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema },
                { name: "RouteUpdateRequest", schema: RouteUpdateRequest_1.RouteUpdateRequestSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
            ]),
        ],
        controllers: [heartbeat_controller_1.HeartbeatController],
        providers: [heartbeat_service_1.TelemetryService,
            time_series_service_1.TimeSeriesService, fcm_service_1.MessagingService, zipper_1.FileArchiverService, firebase_util_1.FirebaseAdmin],
    })
], HeartbeatModule);
//# sourceMappingURL=heartbeat.module.js.map