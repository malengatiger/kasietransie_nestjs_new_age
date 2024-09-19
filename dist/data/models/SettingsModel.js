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
exports.SettingsModelSchema = exports.SettingsModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SettingsModel = class SettingsModel {
};
exports.SettingsModel = SettingsModel;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SettingsModel.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SettingsModel.prototype, "locale", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "refreshRateInSeconds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "themeIndex", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "geofenceRadius", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "commuterGeofenceRadius", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "vehicleSearchMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "heartbeatIntervalSeconds", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "loiteringDelay", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "commuterSearchMinutes", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "commuterGeoQueryRadius", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "vehicleGeoQueryRadius", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "numberOfLandmarksToScan", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], SettingsModel.prototype, "distanceFilter", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], SettingsModel.prototype, "created", void 0);
exports.SettingsModel = SettingsModel = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'SettingsModel',
    })
], SettingsModel);
exports.SettingsModelSchema = mongoose_1.SchemaFactory.createForClass(SettingsModel);
//# sourceMappingURL=SettingsModel.js.map