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
exports.VehicleHeartbeatSchema = exports.VehicleHeartbeat = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
let VehicleHeartbeat = class VehicleHeartbeat {
};
exports.VehicleHeartbeat = VehicleHeartbeat;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "vehicleHeartbeatId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "vehicleReg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", position_1.Position)
], VehicleHeartbeat.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], VehicleHeartbeat.prototype, "longDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "make", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleHeartbeat.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], VehicleHeartbeat.prototype, "appToBackground", void 0);
exports.VehicleHeartbeat = VehicleHeartbeat = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'VehicleHeartbeat',
    })
], VehicleHeartbeat);
exports.VehicleHeartbeatSchema = mongoose_1.SchemaFactory.createForClass(VehicleHeartbeat);
//# sourceMappingURL=VehicleHeartbeat.js.map