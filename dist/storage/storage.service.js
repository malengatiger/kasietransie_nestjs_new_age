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
const mime = require("mime-types");
const mm = "CloudStorageUploaderService";
let CloudStorageUploaderService = class CloudStorageUploaderService {
    constructor(configService) {
        this.configService = configService;
        this.bucketName = this.configService.get("BUCKET_NAME");
        this.projectId = this.configService.get("PROJECT_ID");
        this.cloudStorageDirectory = this.configService.get("CLOUD_STORAGE_DIRECTORY");
    }
    async getSignedUrl(file) {
        common_1.Logger.log(`${mm} getSignedUrl for cloud storage: ${file.name}`);
        const signedUrlOptions = {
            action: "read",
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 10,
        };
        try {
            const [url] = await file.getSignedUrl(signedUrlOptions);
            common_1.Logger.log(`\n${mm} Signed URL acquired. Cool! \n 🤟🏽 🤟🏽 ${url}  🤟🏽 🤟🏽\n\n`);
            return url;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error getting signed URL: ${error}`);
            throw error;
        }
    }
    async uploadFile(objectName, filePath, associationId) {
        common_1.Logger.log(`${mm} uploadFile to cloud storage: ${objectName} in associationId: ${associationId}}`);
        const storage = new storage_1.Storage({ projectId: this.projectId });
        const bucket = storage.bucket(this.bucketName);
        const bucketFileName = `${this.cloudStorageDirectory}/${associationId}/${objectName}`;
        common_1.Logger.log(`${mm} .... bucketFileName: ${bucketFileName}`);
        const file = bucket.file(bucketFileName);
        try {
            const contentType = this.getFileContentType(filePath);
            common_1.Logger.log(`${mm} uploadFile to cloud storage, contentType: ${contentType}`);
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
            common_1.Logger.log(`${mm} File uploaded to cloud storage; \n🍐🍐 metadata = ${JSON.stringify(response[0].metadata)} 🍐🍐\n`);
            const signedUrl = await this.getSignedUrl(file);
            common_1.Logger.log(`${mm} File uploaded to cloud storage; url: \n🍐🍐 ${signedUrl} 🍐🍐\n`);
            return signedUrl;
        }
        catch (error) {
            common_1.Logger.error(`${mm} Error uploading file: ${error}`);
            throw error;
        }
    }
    getFileContentType(filePath) {
        const mimeType = mime.lookup(filePath);
        return mimeType || "application/octet-stream";
    }
    async createQRCode(data) {
        common_1.Logger.log(`${mm} qrcode prefix: ${data.prefix} - size: ${data.size}`);
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
            common_1.Logger.log(`${mm} qrcode version: ${version}`);
            await qrcode.toFile(tempFilePath, data.data, {
                version: version,
            });
            common_1.Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
            common_1.Logger.log(`${mm} qrcode file: ${tempFilePath} to be uploaded to ${fileName}`);
            return this.uploadFile(fileName, tempFilePath, data.associationId);
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