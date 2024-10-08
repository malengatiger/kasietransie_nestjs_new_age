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
exports.VehicleHeartbeatTimeSeriesSchema = exports.VehicleHeartbeatTimeSeries = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const HeartbeatMeta_1 = require("./HeartbeatMeta");
const swagger_1 = require("@nestjs/swagger");
let VehicleHeartbeatTimeSeries = class VehicleHeartbeatTimeSeries {
};
exports.VehicleHeartbeatTimeSeries = VehicleHeartbeatTimeSeries;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VehicleHeartbeatTimeSeries.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", HeartbeatMeta_1.HeartbeatMeta)
], VehicleHeartbeatTimeSeries.prototype, "metaData", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleHeartbeatTimeSeries.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], VehicleHeartbeatTimeSeries.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VehicleHeartbeatTimeSeries.prototype, "count", void 0);
exports.VehicleHeartbeatTimeSeries = VehicleHeartbeatTimeSeries = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "VehicleHeartbeatTimeSeries",
        timeseries: {
            timeField: "timestamp",
            metaField: "metaData",
            granularity: "hours",
        },
    })
], VehicleHeartbeatTimeSeries);
exports.VehicleHeartbeatTimeSeriesSchema = mongoose_1.SchemaFactory.createForClass(VehicleHeartbeatTimeSeries);
//# sourceMappingURL=VehicleHeartbeatTimeSeries.js.map