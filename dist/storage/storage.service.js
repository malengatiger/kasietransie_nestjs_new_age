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
exports.CloudStorageUploaderService = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("@google-cloud/storage");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode");
const mm = "CloudStorageUploaderService";
let CloudStorageUploaderService = class CloudStorageUploaderService {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get("BUCKET_NAME");
        this.projectId = this.configService.get("PROJECT_ID");
        this.cloudStorageDirectory = this.configService.get("CLOUD_STORAGE_DIRECTORY");
    }
    async getSignedUrl(objectName) {
        common_1.Logger.log(`${mm} getSignedUrl for cloud storage: ${objectName}`);
        const storage = new storage_1.Storage({ projectId: this.projectId });
        const bucket = storage.bucket(this.bucketName);
        const file = bucket.file(`${this.cloudStorageDirectory}/${objectName}`);
        const signedUrlOptions = {
            action: "read",
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 10,
        };
        try {
            const [url] = await file.getSignedUrl(signedUrlOptions);
            common_1.Logger.log(`${mm} Signed URL acquired. Cool! ${url}`);
            return url;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error getting signed URL: ${error}`);
            throw error;
        }
    }
    async uploadFile(objectName, filePath, associationId) {
        common_1.Logger.log(`${mm} uploadFile to cloud storage: ${objectName}`);
        const storage = new storage_1.Storage({ projectId: this.projectId });
        const bucket = storage.bucket(this.bucketName);
        const file = bucket.file(`${this.cloudStorageDirectory}/${associationId}/${objectName}`);
        try {
            const contentType = this.getFileContentType(filePath);
            common_1.Logger.log(`${mm} uploadFile to cloud storage, contentType: ${contentType}`);
            await file.bucket.upload(filePath, {
                metadata: { contentType, predefinedAcl: "publicRead" },
            });
            const signedUrl = await this.getSignedUrl(objectName);
            common_1.Logger.log(`${mm} File uploaded to cloud storage; url = ${signedUrl}`);
            return signedUrl;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error uploading file: ${error}`);
            throw error;
        }
    }
    getFileContentType(filePath) {
        try {
            return fs.readFileSync(filePath).toString();
        }
        catch (error) {
            common_1.Logger.warn(`${mm} Could not determine content type, using 'application/octet-stream'`);
            return "application/octet-stream";
        }
    }
    async createQRCode(data, prefix, size, associationId) {
        common_1.Logger.log(`${mm} qrcode prefix: ${prefix} - size: ${size}`);
        try {
            const fileName = `qrcode_${prefix}_${new Date().getTime()}.png`;
            const tempDir = path.join(__dirname, "..", "tempFiles");
            const tempFilePath = path.join(tempDir, fileName);
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            let version = 15;
            if (size == 1) {
                version = 20;
            }
            if (size == 2) {
                version = 30;
            }
            if (size == 3) {
                version = 40;
            }
            common_1.Logger.log(`${mm} qrcode version: ${version}`);
            await qrcode.toFile(tempFilePath, data, {
                version: version,
            });
            common_1.Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
            common_1.Logger.log(`${mm} qrcode file: ${tempFilePath}`);
            return this.uploadFile(fileName, tempFilePath, associationId);
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed to create QR code and upload to Cloud Storage.");
        }
    }
};
exports.CloudStorageUploaderService = CloudStorageUploaderService;
exports.CloudStorageUploaderService = CloudStorageUploaderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudStorageUploaderService);
//# sourceMappingURL=storage.service.js.map