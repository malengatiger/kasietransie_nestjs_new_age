"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesModule = void 0;
const common_1 = require("@nestjs/common");
const time_series_service_1 = require("./time_series.service");
const time_series_controller_1 = require("./time_series.controller");
const zipper_1 = require("../../my-utils/zipper");
const db_ping_1 = require("../../data/db_ping");
const VehicleHeartbeatTimeSeries_1 = require("../../data/models/VehicleHeartbeatTimeSeries");
const mongoose_1 = require("@nestjs/mongoose");
const PassengerTimeSeries_1 = require("../../data/models/PassengerTimeSeries");
let TimeSeriesModule = class TimeSeriesModule {
};
exports.TimeSeriesModule = TimeSeriesModule;
exports.TimeSeriesModule = TimeSeriesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema },
                { name: "PassengerTimeSeries", schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema },
            ]),
        ],
        controllers: [time_series_controller_1.TimeSeriesController],
        providers: [time_series_service_1.TimeSeriesService, zipper_1.FileArchiverService, db_ping_1.NewMongoService],
    })
], TimeSeriesModule);
//# sourceMappingURL=time_series.module.js.map