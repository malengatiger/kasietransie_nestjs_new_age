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
exports.VehicleDepartureSchema = exports.VehicleDeparture = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
let VehicleDeparture = class VehicleDeparture {
};
exports.VehicleDeparture = VehicleDeparture;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "vehicleDepartureId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "landmarkId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "landmarkName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "associationName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "vehicleReg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "make", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleDeparture.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", position_1.Position)
], VehicleDeparture.prototype, "position", void 0);
exports.VehicleDeparture = VehicleDeparture = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'VehicleDeparture',
    })
], VehicleDeparture);
exports.VehicleDepartureSchema = mongoose_1.SchemaFactory.createForClass(VehicleDeparture);
//# sourceMappingURL=VehicleDeparture.js.map