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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRequestController = void 0;
const common_1 = require("@nestjs/common");
const location_request_service_1 = require("./location_request.service");
const LocationRequest_1 = require("../../data/models/LocationRequest");
const LocationResponse_1 = require("../../data/models/LocationResponse");
const LocationResponseError_1 = require("../../data/models/LocationResponseError");
let LocationRequestController = class LocationRequestController {
    constructor(locationRequestService) {
        this.locationRequestService = locationRequestService;
    }
    async addLocationRequest(locationRequest) {
        return this.locationRequestService.addLocationRequest(locationRequest);
    }
    async addLocationResponse(locationResponse) {
        return this.locationRequestService.addLocationResponse(locationResponse);
    }
    async addLocationResponseError(locationResponseError) {
        return this.locationRequestService.addLocationResponseError(locationResponseError);
    }
};
exports.LocationRequestController = LocationRequestController;
__decorate([
    (0, common_1.Post)('addLocationRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationRequest_1.LocationRequest]),
    __metadata("design:returntype", Promise)
], LocationRequestController.prototype, "addLocationRequest", null);
__decorate([
    (0, common_1.Post)('addLocationResponse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationResponse_1.LocationResponse]),
    __metadata("design:returntype", Promise)
], LocationRequestController.prototype, "addLocationResponse", null);
__decorate([
    (0, common_1.Post)('addLocationResponseError'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationResponseError_1.LocationResponseError]),
    __metadata("design:returntype", Promise)
], LocationRequestController.prototype, "addLocationResponseError", null);
exports.LocationRequestController = LocationRequestController = __decorate([
    (0, common_1.Controller)('locationRequest'),
    __metadata("design:paramtypes", [location_request_service_1.LocationRequestService])
], LocationRequestController);
//# sourceMappingURL=location_request.controller.js.map