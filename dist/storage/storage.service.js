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
const storage_2 = require("firebase-admin/storage");
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
const User_1 = require("../data/models/User");
const UserPhoto_1 = require("../data/models/UserPhoto");
const crypto_1 = require("crypto");
const errors_interceptor_1 = require("../middleware/errors.interceptor");
const Association_1 = require("../data/models/Association");
console.log(`${typeof sharp_1.default} - Should output "function"`);
const mm = "🔶🔶🔶 StorageService 🔶 ";
let CloudStorageUploaderService = class CloudStorageUploaderService {
    constructor(configService, errorHandler, exampleFileModel, vehicleModel, userModel, userPhotoModel, vehiclePhotoModel, vehicleVideoModel, associationModel) {
        this.configService = configService;
        this.errorHandler = errorHandler;
        this.exampleFileModel = exampleFileModel;
        this.vehicleModel = vehicleModel;
        this.userModel = userModel;
        this.userPhotoModel = userPhotoModel;
        this.vehiclePhotoModel = vehiclePhotoModel;
        this.vehicleVideoModel = vehicleVideoModel;
        this.associationModel = associationModel;
        this.bucketName = "kasie-transie-3.appspot.com";
        this.projectId = "kasie-transie-3";
        this.cloudStorageDirectory = "kasie-transie-3_data";
        this.storage = new storage_1.Storage({ projectId: "kasie-transie-3" });
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
            p.thumbNailUrl = "tbd";
            p.vehicleId = car.vehicleId;
            p.vehicleReg = car.vehicleReg;
            const pos = new position_1.Position("Point", [longitude, latitude]);
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
        common_1.Logger.log(`\n\n${mm} uploadVehiclePhoto: getting vehicle from Atlas, 🔵 vehicleId: ${vehicleId} 🔵 latitude: ${latitude} 🔵 longitude: ${longitude}`);
        const latitudeNum = parseFloat(latitude);
        const longitudeNum = parseFloat(longitude);
        const cars = await this.vehicleModel
            .find({ vehicleId: vehicleId })
            .limit(1);
        console.log(cars);
        const dt = new Date().getTime();
        if (cars.length > 0) {
            const car = cars[0];
            common_1.Logger.debug(`${mm} ...... uploading vehicle photo, 🔵 car: ${car.vehicleReg}`);
            const url = await this.uploadFile(`photo_${vehicleId}_${dt}`, filePath, car.associationName);
            const thumbUrl = await this.uploadFile(`thumbnail_${vehicleId}_${dt}`, thumbFilePath, car.associationName);
            try {
                const photo = new VehiclePhoto_1.VehiclePhoto();
                photo.associationId = car.associationId;
                photo.vehiclePhotoId = `${vehicleId}_${dt}`;
                photo.url = url["url"];
                photo.thumbNailUrl = thumbUrl["url"];
                photo.vehicleId = car.vehicleId;
                photo.vehicleReg = car.vehicleReg;
                const pos = new position_1.Position("Point", [longitudeNum, latitudeNum]);
                photo.position = pos;
                photo.created = new Date().toISOString();
                common_1.Logger.debug(`${mm} vehicle photo about to be added: 🔵 ${JSON.stringify(photo, null, 2)}🔵`);
                const resp = await this.vehiclePhotoModel.create(photo);
                common_1.Logger.log(`\n${mm} 🍎 🍎 vehicle photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`);
                return resp;
            }
            catch (e) {
                this.errorHandler.handleError(e, car.associationId, car.associationName);
                throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async createUserPhoto(userPhoto) {
        userPhoto.userPhotoId = (0, crypto_1.randomUUID)();
        userPhoto.created = new Date().toISOString();
        const users = await this.userModel
            .find({ userId: userPhoto.userId })
            .limit(1);
        console.log(users);
        const dt = new Date().getTime();
        if (users.length > 0) {
            const user = users[0];
            user.profileUrl = userPhoto.url;
            user.profileThumbnail = userPhoto.thumbNailUrl;
            await this.userModel.updateOne({
                userId: userPhoto.userId,
            }, user);
            common_1.Logger.log(`\n${mm} 🍎 🍎 user profile url updated 🍎 🍎 ${JSON.stringify(user)} 🍎 🍎`);
            const resp = await this.userPhotoModel.create(userPhoto);
            common_1.Logger.log(`\n${mm} 🍎 🍎 user photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`);
            return user;
        }
        common_1.Logger.error(`${mm} .. user photo upload failed`);
        const msg = `Failed to upload user photo`;
        await this.errorHandler.handleError(msg, userPhoto.associationId, userPhoto.associationName);
        throw new common_1.HttpException(msg, common_1.HttpStatus.BAD_REQUEST);
    }
    async uploadUserProfilePicture(userId, filePath, thumbFilePath) {
        common_1.Logger.log(`${mm} uploadUserProfilePicture: getting user from Atlas, 🔵 userId: ${userId}`);
        const users = await this.userModel.find({ userId: userId }).limit(1);
        console.log(users);
        const dt = new Date().getTime();
        if (users.length > 0) {
            const user = users[0];
            common_1.Logger.log(`${mm} uploading user photo, 🔵 user: ${user.firstName}`);
            const url = await this.uploadFile(`photo_${userId}_${dt}`, filePath, user.associationName);
            const thumbUrl = await this.uploadFile(`thumbnail_${userId}_${dt}`, thumbFilePath, user.associationName);
            const p = new UserPhoto_1.UserPhoto();
            p.associationId = user.associationId;
            p.userPhotoId = `${userId}_${dt}`;
            p.url = url;
            p.thumbNailUrl = thumbUrl;
            p.userId = user.userId;
            p.userName = user.firstName + " " + user.lastName;
            p.associationName = user.associationName;
            p.created = new Date().toISOString();
            user.profileUrl = url;
            user.profileThumbnail = thumbUrl;
            await this.userModel.updateOne({
                userId: userId,
            }, user);
            common_1.Logger.log(`\n${mm} 🍎 🍎 user profile url updated 🍎 🍎 ${JSON.stringify(user)} 🍎 🍎`);
            const resp = await this.userPhotoModel.create(p);
            common_1.Logger.log(`\n${mm} 🍎 🍎 user photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`);
            return resp;
        }
        else {
            throw new Error("User not found");
        }
    }
    async uploadQRCodeFile(associationId, filePath) {
        common_1.Logger.log(`${mm} uploadQRCodeFile: creating qrcode 🔵 associationId: ${associationId}`);
        const objectName = `qrCode_${(0, crypto_1.randomUUID)()}.png`;
        let name = 'General';
        try {
            if (associationId) {
                const ass = await this.associationModel
                    .findOne({ associationId: associationId })
                    .limit(1);
                common_1.Logger.debug(`${mm} uploadQRCodeFile: association from Atlas 🔵 name: ${ass.associationName}`);
                if (ass == null) {
                    throw new common_1.HttpException("Association not found", common_1.HttpStatus.BAD_REQUEST);
                }
                name = ass.associationName;
            }
            const uploadResult = await this.uploadFile(`${objectName}`, filePath, name);
            common_1.Logger.log(`${mm} uploadQRCodeFile: returning fileName: 🔵  ${JSON.stringify(uploadResult)}`);
            if (!uploadResult) {
                this.errorHandler.handleError("url is blank", associationId, "nay");
                throw new common_1.HttpException("url is blank", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return uploadResult;
        }
        catch (e) {
            const msg = `QRCode file upload failed: ${e}`;
            common_1.Logger.error(`${mm} ${msg}: ${e}`);
            this.errorHandler.handleError(msg, associationId, "nay");
            throw new common_1.HttpException(msg, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadExampleFiles(userFilePath, vehicleFilePath) {
        common_1.Logger.log(`${mm} ... upload example files ... 🍐 users: ${userFilePath} 🍐 cars: ${vehicleFilePath}`);
        const userUrl = await this.uploadFile("users.csv", userFilePath, "admin");
        const vehicleUrl = await this.uploadFile("vehicles.csv", vehicleFilePath, "admin");
        const u = new ExampleFile_1.ExampleFile();
        u.bucketFileName = userUrl;
        u.fileName = "users.csv";
        u.type = "csv";
        await this.exampleFileModel.create(u);
        const v = new ExampleFile_1.ExampleFile();
        v.bucketFileName = vehicleUrl;
        v.fileName = "vehicles.csv";
        v.type = "csv";
        await this.exampleFileModel.create(v);
        common_1.Logger.log(`${mm} Example files uploaded and written to Atlas ✅ `);
    }
    async getExampleFiles() {
        const list = await this.exampleFileModel.find({});
        return list;
    }
    async uploadFile(objectName, filePath, folder) {
        common_1.Logger.log(`uploadFile : ${filePath} bucket: ${this.bucketName} `);
        const bucketFileName = `${this.cloudStorageDirectory}/${folder}/${objectName}`;
        common_1.Logger.log(`${mm} uploadFile : ${filePath} bucketFileName: ${bucketFileName} to ${this.bucketName}`);
        await this.storage.bucket(this.bucketName).setCorsConfiguration([
            {
                method: ["*"],
                origin: ["*"],
            },
        ]);
        common_1.Logger.log(`${mm} Bucket ${this.bucketName} was updated with a CORS config
        to allow all requests from any origin`);
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
            common_1.Logger.log(`${mm} upload ${filePath} to cloud: await storage.bucket ${this.bucketName}...`);
            const response = await this.storage
                .bucket(this.bucketName)
                .upload(filePath, options);
            common_1.Logger.log(`${mm} UploadResponse: ${response[0].name}  ${response[0].baseUrl}  ${response[0].cloudStorageURI} ...`);
            const fileRef = this.storage.bucket(this.bucketName).file(bucketFileName);
            const downloadURL = await (0, storage_2.getDownloadURL)(fileRef);
            var mFile = response[0];
            var prop = response[1];
            common_1.Logger.log(`\n\n${mm} UploadResponse mFile: ${mFile.name} ✅ downloadURL: \n ✅  ${downloadURL} ✅ ...\n\n`);
            if (mFile) {
                const resp = {
                    fileName: mFile.name,
                    url: downloadURL,
                };
                common_1.Logger.debug(`${mm} upload response ${JSON.stringify(resp, null, 2)}}`);
                return resp;
            }
        }
        catch (error) {
            common_1.Logger.error(`\n\n${mm} Error uploading file to cloud storage: ${error}`);
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
    __param(2, (0, mongoose_2.InjectModel)(ExampleFile_1.ExampleFile.name)),
    __param(3, (0, mongoose_2.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(4, (0, mongoose_2.InjectModel)(User_1.User.name)),
    __param(5, (0, mongoose_2.InjectModel)(UserPhoto_1.UserPhoto.name)),
    __param(6, (0, mongoose_2.InjectModel)(VehiclePhoto_1.VehiclePhoto.name)),
    __param(7, (0, mongoose_2.InjectModel)(VehicleVideo_1.VehicleVideo.name)),
    __param(8, (0, mongoose_2.InjectModel)(Association_1.Association.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        errors_interceptor_1.KasieErrorHandler, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model, mongoose_1.default.Model])
], CloudStorageUploaderService);
//# sourceMappingURL=storage.service.js.map