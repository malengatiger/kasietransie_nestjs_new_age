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
exports.RouteUpdateRequestSchema = exports.RouteUpdateRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let RouteUpdateRequest = class RouteUpdateRequest {
};
exports.RouteUpdateRequest = RouteUpdateRequest;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "routeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "routeName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteUpdateRequest.prototype, "userName", void 0);
exports.RouteUpdateRequest = RouteUpdateRequest = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "RouteUpdateRequest",
    })
], RouteUpdateRequest);
exports.RouteUpdateRequestSchema = mongoose_1.SchemaFactory.createForClass(RouteUpdateRequest);
//# sourceMappingURL=RouteUpdateRequest.js.map