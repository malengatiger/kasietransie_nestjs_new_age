"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUtils = void 0;
const qrcode = require("qrcode");
const firebase_admin_1 = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const mm = '🥦 🥦 🥦 🥦 MyUtils 🥦🥦';
class MyUtils {
    static getDatabaseUrl() {
        const env = process.env.NODE_ENV;
        let dbUrl;
        if (env === 'production') {
            dbUrl = process.env.REMOTE_DB_URI;
        }
        else {
            dbUrl = process.env.LOCAL_DB_URI;
        }
        if (!dbUrl) {
            dbUrl = process.env.REMOTE_DB_URI;
        }
        common_1.Logger.log(`${mm} 🍷🍷 MONGODB dbUrl: ${dbUrl}`);
        return dbUrl;
    }
    static getPort() {
        let port;
        const env = process.env.NODE_ENV;
        if (env === 'production') {
            port = process.env.REMOTE_PORT;
        }
        else {
            port = process.env.LOCAL_PORT;
        }
        common_1.Logger.log(`${mm} port: ${port} 🍷🍷 `);
        if (!port) {
            port = process.env.REMOTE_PORT;
        }
        return port;
    }
    static getStartDate(numberOfHours) {
        const date = new Date();
        date.setHours(date.getHours() - numberOfHours);
        const isoString = date.toISOString();
        return isoString;
    }
    static async createQRCodeAndUploadToCloudStorage(input, prefix, size) {
        common_1.Logger.log(`${mm} qrcode prefix: ${prefix} - size: ${size}`);
        const bucketName = process.env.BUCKET_NAME;
        try {
            const fileName = `qrcode_${prefix}_${new Date().getTime()}.png`;
            const tempDir = path.join(__dirname, '..', 'tempFiles');
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
            await qrcode.toFile(tempFilePath, input, {
                version: version,
            });
            common_1.Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
            const storage = firebase_admin_1.default.storage().bucket(bucketName);
            common_1.Logger.log(`${mm} uploading qrcode file: ${tempFilePath}`);
            const options = {
                destination: `kasieMedia/${fileName}`,
                metadata: {
                    contentType: 'image/png',
                    predefinedAcl: 'publicRead',
                },
            };
            const [file] = await storage.upload(tempFilePath, options);
            const publicUrl = file.publicUrl();
            common_1.Logger.log(`${mm} returning public URL: 🔵 🔵 🔵 ${publicUrl}`);
            return publicUrl;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create QR code and upload to Cloud Storage.');
        }
    }
    static formatISOStringDate(dateString, locale) {
        const date = new Date(dateString);
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        if (locale) {
            return date.toLocaleString(locale, options);
        }
        else {
            return date.toLocaleString('en', options);
        }
    }
    static deleteOldFiles() {
        common_1.Logger.log(`${mm} Deleting old files ...`);
        const tempDir = path.join(__dirname, '..', 'tempFiles');
        const files = fs.readdirSync(tempDir);
        const currentTime = Date.now();
        const tenMinutesAgo = currentTime - (10 * 60 * 1000);
        let cnt = 0;
        for (const file of files) {
            const filePath = path.join(tempDir, file);
            const fileStats = fs.statSync(filePath);
            const fileCreatedTime = fileStats.ctimeMs;
            if (fileCreatedTime < tenMinutesAgo) {
                fs.unlinkSync(filePath);
                cnt++;
            }
        }
        common_1.Logger.log(`${mm} Deleted: ${cnt} temporary files`);
    }
}
exports.MyUtils = MyUtils;
//# sourceMappingURL=my-utils.js.map