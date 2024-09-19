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
exports.PassengerTimeSeriesSchema = exports.PassengerTimeSeries = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const HeartbeatMeta_1 = require("./HeartbeatMeta");
let PassengerTimeSeries = class PassengerTimeSeries {
};
exports.PassengerTimeSeries = PassengerTimeSeries;
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], PassengerTimeSeries.prototype, "timestamp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", HeartbeatMeta_1.HeartbeatMeta)
], PassengerTimeSeries.prototype, "metaData", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PassengerTimeSeries.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PassengerTimeSeries.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PassengerTimeSeries.prototype, "routeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PassengerTimeSeries.prototype, "passengers", void 0);
exports.PassengerTimeSeries = PassengerTimeSeries = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'PassengerTimeSeries',
        timeseries: {
            timeField: 'timestamp',
            metaField: 'metaData',
            granularity: 'hours',
        },
    })
], PassengerTimeSeries);
exports.PassengerTimeSeriesSchema = mongoose_1.SchemaFactory.createForClass(PassengerTimeSeries);
//# sourceMappingURL=PassengerTimeSeries.js.map