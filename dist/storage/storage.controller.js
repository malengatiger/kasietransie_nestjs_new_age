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
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const platform_express_1 = require("@nestjs/platform-express");
const fs = require("fs");
const os = require("os");
const path = require("path");
const tag = "🔵 🔵 🔵 StorageController 🔵 ";
let StorageController = class StorageController {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async uploadExampleFiles(files) {
        const userFile = files.userFile[0];
        const vehicleFile = files.vehicleFile[0];
        const userTempFile = path.join(os.tmpdir(), userFile.originalname);
        const vehicleTempFile = path.join(os.tmpdir(), vehicleFile.originalname);
        await fs.promises.writeFile(userTempFile, userFile.buffer);
        await fs.promises.writeFile(vehicleTempFile, vehicleFile.buffer);
        common_1.Logger.log(`${tag} ${userFile.originalname} 🥦 saved to ${userTempFile}`);
        common_1.Logger.log(`${tag}${vehicleFile.originalname} 🥦 saved to ${vehicleTempFile}`);
        await this.storageService.uploadExampleFiles(userTempFile, vehicleTempFile);
        return `${tag} Files uploaded successfully`;
    }
    async uploadVehiclePhotoFiles(files, data) {
        const imageTempFile = path.join(os.tmpdir(), files.imageFile[0].originalname);
        const thumbTempFile = path.join(os.tmpdir(), files.thumbFile[0].originalname);
        await fs.promises.writeFile(imageTempFile, files.imageFile[0].buffer);
        await fs.promises.writeFile(thumbTempFile, files.thumbFile[0].buffer);
        common_1.Logger.log(`${tag} ${files.imageFile[0].originalname} 🥦 saved to ${imageTempFile}`);
        common_1.Logger.log(`${tag}${files.thumbFile[0].originalname} 🥦 saved to ${thumbTempFile}`);
        const { vehicleId, latitude, longitude } = data;
        await this.storageService.uploadVehiclePhoto(vehicleId, imageTempFile, thumbTempFile, latitude, longitude);
        return `${tag} Files uploaded successfully`;
    }
    async uploadVehicleVideo(file, data) {
        const { vehicleId, latitude, longitude } = data;
        const vehicleImageFile = file;
        const vehicleTempFile = path.join(os.tmpdir(), "vehicleImageFile_" + new Date().getTime() + ".mp4");
        await fs.promises.writeFile(vehicleTempFile, vehicleImageFile.buffer);
        common_1.Logger.log(`${tag} ${vehicleImageFile.originalname} 🥦 saved to ${vehicleTempFile}`);
        const resp = await this.storageService.uploadVehicleVideo(vehicleId, vehicleTempFile, latitude, longitude);
        return resp;
    }
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)("uploadExampleFiles"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "userFile", maxCount: 1 },
        { name: "vehicleFile", maxCount: 1 },
    ])),
    (0, common_1.Post)("uploadExampleFiles"),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadExampleFiles", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'imageFile' },
        { name: 'thumbFile' },
    ])),
    (0, common_1.Post)("uploadVehiclePhoto"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadVehiclePhotoFiles", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, common_1.Post)("uploadVehicleVideo"),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadVehicleVideo", null);
exports.StorageController = StorageController = __decorate([
    (0, common_1.Controller)("storage"),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map