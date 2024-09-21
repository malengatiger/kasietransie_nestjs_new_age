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
exports.RoutePointSchema = exports.RoutePoint = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
let RoutePoint = class RoutePoint {
};
exports.RoutePoint = RoutePoint;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoutePoint.prototype, "routePointId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoutePoint.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoutePoint.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoutePoint.prototype, "heading", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoutePoint.prototype, "index", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoutePoint.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoutePoint.prototype, "routeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoutePoint.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RoutePoint.prototype, "routeName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], RoutePoint.prototype, "position", void 0);
exports.RoutePoint = RoutePoint = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "RoutePoint",
    })
], RoutePoint);
exports.RoutePointSchema = mongoose_1.SchemaFactory.createForClass(RoutePoint);
//# sourceMappingURL=RoutePoint.js.map