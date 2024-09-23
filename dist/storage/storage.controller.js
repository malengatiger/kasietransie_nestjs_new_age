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
const tag = '🔵 🔵 🔵 StorageController 🔵 ';
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
};
exports.StorageController = StorageController;
__decorate([
    (0, common_1.Post)('uploadExampleFiles'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'userFile', maxCount: 1 },
        { name: 'vehicleFile', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadExampleFiles", null);
exports.StorageController = StorageController = __decorate([
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService])
], StorageController);
//# sourceMappingURL=storage.controller.js.map