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
exports.LandmarkSchema = exports.Landmark = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
let Landmark = class Landmark {
};
exports.Landmark = Landmark;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Landmark.prototype, "landmarkId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Landmark.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Landmark.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Landmark.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Landmark.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Landmark.prototype, "distance", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Landmark.prototype, "landmarkName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Landmark.prototype, "routeDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], Landmark.prototype, "position", void 0);
exports.Landmark = Landmark = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "Landmark",
    })
], Landmark);
exports.LandmarkSchema = mongoose_1.SchemaFactory.createForClass(Landmark);
//# sourceMappingURL=Landmark.js.map