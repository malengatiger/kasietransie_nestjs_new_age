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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const VehicleMediaRequest_1 = require("../data/models/VehicleMediaRequest");
const VehiclePhoto_1 = require("../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../data/models/VehicleVideo");
const mm = 'MediaService';
let MediaService = class MediaService {
    constructor(configService, vehiclePhotoModel, vehicleMediaRequestModel, vehicleVideoModel) {
        this.configService = configService;
        this.vehiclePhotoModel = vehiclePhotoModel;
        this.vehicleMediaRequestModel = vehicleMediaRequestModel;
        this.vehicleVideoModel = vehicleVideoModel;
    }
    async getAssociationVehicleMediaRequests(associationId, startDate) {
        return await this.vehicleMediaRequestModel.find({
            associationId: associationId,
            startDate: startDate,
        });
    }
    async addVehiclePhoto(vehiclePhoto) {
        const mDate = new Date(vehiclePhoto.created);
        vehiclePhoto.mDate = mDate;
        return await this.vehiclePhotoModel.create(vehiclePhoto);
    }
    async getVehicleMediaRequests(vehicleId) {
        return [];
    }
    async addVehicleVideo(vehicleVideo) {
        return null;
    }
    async getVehiclePhotos(vehicleId) {
        return await this.vehiclePhotoModel.find({
            vehicleId: vehicleId
        });
    }
    async getVehicleVideos(vehicleId) {
        return [];
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(VehiclePhoto_1.VehiclePhoto.name)),
    __param(2, (0, mongoose_1.InjectModel)(VehicleMediaRequest_1.VehicleMediaRequest.name)),
    __param(3, (0, mongoose_1.InjectModel)(VehicleVideo_1.VehicleVideo.name)),
    __metadata("design:paramtypes", [config_1.ConfigService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], MediaService);
//# sourceMappingURL=MediaService.js.map