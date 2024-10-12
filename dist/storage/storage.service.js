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
exports.CloudStorageUploaderService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode");
const mime = require("mime-types");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const ExampleFile_1 = require("../data/models/ExampleFile");
const VehicleVideo_1 = require("../data/models/VehicleVideo");
const VehiclePhoto_1 = require("../data/models/VehiclePhoto");
const Vehicle_1 = require("../data/models/Vehicle");
const sharp_1 = require("sharp");
const position_1 = require("../data/models/position");
console.log(`${typeof sharp_1.default} - Should output "function"`);
const mm = "🔶🔶🔶 CloudStorageUploaderService 🔶 ";
let CloudStorageUploaderService = class CloudStorageUploaderService {
    constructor(configService, exampleFileModel, vehicleModel, vehiclePhotoModel, vehicleVideoModel) {
        this.configService = configService;
        this.exampleFileModel = exampleFileModel;
        this.vehicleModel = vehicleModel;
        this.vehiclePhotoModel = vehiclePhotoModel;
        this.vehicleVideoModel = vehicleVideoModel;
        this.bucketName = this.configService.get("BUCKET_NAME");
        this.projectId = this.configService.get("PROJECT_ID");
        this.cloudStorageDirectory = this.configService.get("CLOUD_STORAGE_DIRECTORY");
    }
    async uploadVehicleVideo(vehicleId, filePath, latitude, longitude) {
        common_1.Logger.log(`${mm} getting vehicle from Atlas, car: ${vehicleId}`);
        const cars = await this.vehicleModel
            .find({ vehicleId: vehicleId })
            .limit(1);
        console.log(cars);
        const dt = new Date().getTime();
        if (cars.length > 0) {
            const car = cars[0];
            common_1.Logger.log(`${mm} uploading vehicle video, car: ${car.vehicleReg}`);
            const url = await this.uploadFile(`${vehicleId}_${dt}`, filePath, car.associationId);
            const p = new VehicleVideo_1.VehicleVideo();
            p.associationId = car.associationId;
            p.vehicleVideoId = `${vehicleId}_${dt}`;
            p.url = url;
            p.thumbNailUrl = 'tbd';
            p.vehicleId = car.vehicleId;
            p.vehicleReg = car.vehicleReg;
            const pos = new position_1.Position();
            pos.type = "Point";
            pos.coordinates = [longitude, latitude];
            p.position = pos;
            p.created = new Date().toISOString();
            const resp = await this.vehicleVideoModel.create(p);
            common_1.Logger.log(`${mm} vehicle video uploaded and added to Atlas: ${JSON.stringify(resp)}}\n\n`);
            return resp;
        }
        else {
            throw new Error("Vehicle not found");
        }
    }
    async uploadVehiclePhoto(vehicleId, filePath, thumbFilePath, latitude, longitude) {
        common_1.Logger.log(`${mm} uploadVehiclePhoto: getting vehicle from Atlas, 🔵 car: ${vehicleId}`);
        const cars = await this.vehicleModel
            .find({ vehicleId: vehicleId })
            .limit(1);
        console.log(cars);
        const dt = new Date().getTime();
        if (cars.length > 0) {
            const car = cars[0];
            common_1.Logger.log(`${mm} uploading vehicle photo, 🔵 car: ${car.vehicleReg}`);
            const url = await this.uploadFile(`photo_${vehicleId}_${dt}`, filePath, car.associationName);
            const thumbUrl = await this.uploadFile(`thumbnail_${vehicleId}_${dt}`, thumbFilePath, car.associationName);
            const p = new VehiclePhoto_1.VehiclePhoto();
            p.associationId = car.associationId;
            p.vehiclePhotoId = `${vehicleId}_${dt}`;
            p.url = url;
            p.thumbNailUrl = thumbUrl;
            p.vehicleId = car.vehicleId;
            p.vehicleReg = car.vehicleReg;
            const pos = new position_1.Position();
            pos.type = "Point";
            pos.coordinates = [longitude, latitude];
            p.position = pos;
            p.created = new Date().toISOString();
            const resp = await this.vehiclePhotoModel.create(p);
            common_1.Logger.log(`\n${mm} 🍎 🍎 vehicle photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`);
            return resp;
        }
        else {
            throw new Error("Vehicle not found");
        }
    }
    async uploadExampleFiles(userFilePath, vehicleFilePath) {
        common_1.Logger.log(`${mm} ... upload example files ... 🍐 users: ${userFilePath} 🍐 cars: ${vehicleFilePath}`);
        const userUrl = await this.uploadFile("users.csv", userFilePath, "admin");
        const vehicleUrl = await this.uploadFile("vehicles.csv", vehicleFilePath, "admin");
        const u = new ExampleFile_1.ExampleFile();
        u.downloadUrl = userUrl;
        u.fileName = "users.csv";
        u.type = "csv";
        await this.exampleFileModel.create(u);
        const v = new ExampleFile_1.ExampleFile();
        v.downloadUrl = vehicleUrl;
        v.fileName = "vehicles.csv";
        v.type = "csv";
        await this.exampleFileModel.create(v);
        common_1.Logger.log(`${mm} Example files uploaded and written to Atlas ✅ `);
    }
    async getSignedUrl(file) {
        const signedUrlOptions = {
            action: "read",
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 30,
        };
        try {
            const [url] = await file.getSignedUrl(signedUrlOptions);
            return url;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error getting signed URL: ${error}`);
            throw error;
        }
    }
    async uploadFile(objectName, filePath, folder) {
        const storage = new storage_1.Storage({ projectId: this.projectId });
        const bucket = storage.bucket(this.bucketName);
        const bucketFileName = `${this.cloudStorageDirectory}/${folder}/${objectName}`;
        const file = bucket.file(bucketFileName);
        try {
            const contentType = this.getFileContentType(filePath);
            const options = {
                destination: bucketFileName,
                preconditionOpts: {},
                metadata: {
                    contentType: contentType,
                    predefinedAcl: "publicRead",
                },
            };
            const response = await storage
                .bucket(this.bucketName)
                .upload(filePath, options);
            const signedUrl = await this.getSignedUrl(file);
            common_1.Logger.log(`${mm} File uploaded to cloud storage and signed url obtained ✅✅✅\n`);
            return signedUrl;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error uploading file to cloud storage: ${error}`);
            throw error;
        }
    }
    getFileContentType(filePath) {
        const mimeType = mime.lookup(filePath);
        return mimeType || "application/octet-stream";
    }
    async createQRCode(data) {
        common_1.Logger.log(`${mm} createQRCode: 🌀 qrcode prefix: ${data.prefix} - size: ${data.size}`);
        try {
            const fileName = `qrcode_${data.prefix}_${new Date().getTime()}.png`;
            const tempDir = path.join(__dirname, "..", "tempFiles");
            const tempFilePath = path.join(tempDir, fileName);
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            let version = 15;
            if (data.size == 1) {
                version = 20;
            }
            if (data.size == 2) {
                version = 30;
            }
            if (data.size == 3) {
                version = 40;
            }
            await qrcode.toFile(tempFilePath, data.data, {
                version: version,
            });
            return await this.uploadFile(fileName, tempFilePath, data.associationId);
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new Error("Failed to create QR code and upload to Cloud Storage.");
        }
    }
};
exports.CloudStorageUploaderService = CloudStorageUploaderService;
exports.CloudStorageUploaderService = CloudStorageUploaderService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(ExampleFile_1.ExampleFile.name)),
    __param(2, (0, mongoose_2.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(3, (0, mongoose_2.InjectModel)(VehiclePhoto_1.VehiclePhoto.name)),
    __param(4, (0, mongoose_2.InjectModel)(VehicleVideo_1.VehicleVideo.name)),
    __metadata("design:paramtypes", [config_1.ConfigService, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model])
], CloudStorageUploaderService);
//# sourceMappingURL=storage.service.js.map