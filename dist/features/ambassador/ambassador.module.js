"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmbassadorModule = void 0;
const common_1 = require("@nestjs/common");
const ambassador_service_1 = require("./ambassador.service");
const ambassador_controller_1 = require("./ambassador.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const time_series_service_1 = require("../time_series/time_series.service");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const zipper_1 = require("../../my-utils/zipper");
const VehicleHeartbeatTimeSeries_1 = require("../../data/models/VehicleHeartbeatTimeSeries");
const PassengerTimeSeries_1 = require("../../data/models/PassengerTimeSeries");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const firebase_util_1 = require("../../services/firebase_util");
const AmbassadorCheckIn_1 = require("../../data/models/AmbassadorCheckIn");
const Vehicle_1 = require("../../data/models/Vehicle");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
let AmbassadorModule = class AmbassadorModule {
};
exports.AmbassadorModule = AmbassadorModule;
exports.AmbassadorModule = AmbassadorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: "VehicleHeartbeatTimeSeries",
                    schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema,
                },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "PassengerTimeSeries", schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "AmbassadorCheckIn", schema: AmbassadorCheckIn_1.AmbassadorCheckInSchema },
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                {
                    name: "AmbassadorPassengerCount",
                    schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema,
                },
            ]),
        ],
        controllers: [ambassador_controller_1.AmbassadorController],
        providers: [
            ambassador_service_1.AmbassadorService,
            fcm_service_1.MessagingService,
            time_series_service_1.TimeSeriesService,
            errors_interceptor_1.KasieErrorHandler,
            zipper_1.FileArchiverService, firebase_util_1.FirebaseAdmin
        ],
    })
], AmbassadorModule);
//# sourceMappingURL=ambassador.module.js.map