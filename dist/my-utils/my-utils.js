"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUtils = void 0;
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const mm = "🥦 🥦 🥦 🥦 MyUtils 🥦🥦";
class MyUtils {
    static createQRCodeAndUploadToCloudStorage(arg0, arg1, arg2) {
        throw new Error('Method not implemented.');
    }
    static getDatabaseUrl() {
        const env = process.env.NODE_ENV;
        let dbUrl;
        if (env === "production") {
            dbUrl = process.env.REMOTE_DB_URI;
        }
        else {
            dbUrl = process.env.LOCAL_DB_URI;
        }
        if (!dbUrl) {
            dbUrl = process.env.REMOTE_DB_URI;
        }
        common_1.Logger.log(`${mm} getDatabaseUrl: 🍷🍷 MONGODB dbUrl: ${dbUrl}`);
        return dbUrl;
    }
    static getPort() {
        let port;
        const env = process.env.NODE_ENV;
        if (env === "production") {
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
    static formatISOStringDate(dateString, locale) {
        const date = new Date(dateString);
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        if (locale) {
            return date.toLocaleString(locale, options);
        }
        else {
            return date.toLocaleString("en", options);
        }
    }
    static deleteOldFiles() {
        common_1.Logger.log(`${mm} Deleting old files ...`);
        const tempDir = path.join(__dirname, "..", "tempFiles");
        const files = fs.readdirSync(tempDir);
        const currentTime = Date.now();
        const tenMinutesAgo = currentTime - 10 * 60 * 1000;
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