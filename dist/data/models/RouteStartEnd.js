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
exports.RouteStartEnd = void 0;
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
class RouteStartEnd {
}
exports.RouteStartEnd = RouteStartEnd;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], RouteStartEnd.prototype, "startCityPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], RouteStartEnd.prototype, "endCityPosition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteStartEnd.prototype, "startCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteStartEnd.prototype, "startCityName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteStartEnd.prototype, "endCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RouteStartEnd.prototype, "endCityName", void 0);
//# sourceMappingURL=RouteStartEnd.js.map