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
exports.LocationRequestService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const LocationRequest_1 = require("../../data/models/LocationRequest");
const LocationResponse_1 = require("../../data/models/LocationResponse");
const fcm_service_1 = require("../fcm/fcm.service");
const LocationResponseError_1 = require("../../data/models/LocationResponseError");
const mm = "LocationRequestService";
let LocationRequestService = class LocationRequestService {
    constructor(configService, messagingService, locationRequestModel, locationResponseModel, locationResponseErrorModel) {
        this.configService = configService;
        this.messagingService = messagingService;
        this.locationRequestModel = locationRequestModel;
        this.locationResponseModel = locationResponseModel;
        this.locationResponseErrorModel = locationResponseErrorModel;
    }
    async addLocationRequest(locationRequest) {
        const mDate = new Date();
        locationRequest.mDate = mDate;
        const req = this.locationRequestModel.create(locationRequest);
        await this.messagingService.sendLocationRequestMessageToDevice(locationRequest);
        return req;
    }
    async addLocationResponse(locationResponse) {
        const mDate = new Date(locationResponse.created);
        locationResponse.mDate = mDate;
        const res = this.locationResponseModel.create(locationResponse);
        await this.messagingService.sendLocationResponseMessageToDevice(locationResponse);
        common_1.Logger.debug(` addLocationResponse: ${JSON.stringify(locationResponse, null, 2)}`);
        return res;
    }
    async addLocationResponseError(locationResponseError) {
        const mDate = new Date(locationResponseError.created);
        locationResponseError.mDate = mDate;
        const res = this.locationResponseModel.create(locationResponseError);
        await this.messagingService.sendLocationResponseErrorMessageToDevice(locationResponseError);
        common_1.Logger.debug(` addLocationResponseError: ${JSON.stringify(locationResponseError, null, 2)}`);
        return res;
    }
};
exports.LocationRequestService = LocationRequestService;
exports.LocationRequestService = LocationRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(LocationRequest_1.LocationRequest.name)),
    __param(3, (0, mongoose_1.InjectModel)(LocationResponse_1.LocationResponse.name)),
    __param(4, (0, mongoose_1.InjectModel)(LocationResponseError_1.LocationResponseError.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fcm_service_1.MessagingService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], LocationRequestService);
//# sourceMappingURL=location_request.service.js.map