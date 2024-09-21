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
exports.AmbassadorPassengerCountSchema = exports.AmbassadorPassengerCount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
let AmbassadorPassengerCount = class AmbassadorPassengerCount {
};
exports.AmbassadorPassengerCount = AmbassadorPassengerCount;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "_partitionKey", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "vehicleReg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "userName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "routeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "routeName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "routeLandmarkId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "routeLandmarkName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "ownerName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmbassadorPassengerCount.prototype, "passengerCountId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AmbassadorPassengerCount.prototype, "passengersIn", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AmbassadorPassengerCount.prototype, "passengersOut", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AmbassadorPassengerCount.prototype, "currentPassengers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], AmbassadorPassengerCount.prototype, "position", void 0);
exports.AmbassadorPassengerCount = AmbassadorPassengerCount = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "AmbassadorPassengerCount",
    })
], AmbassadorPassengerCount);
exports.AmbassadorPassengerCountSchema = mongoose_1.SchemaFactory.createForClass(AmbassadorPassengerCount);
//# sourceMappingURL=AmbassadorPassengerCount.js.map