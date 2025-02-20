"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyUtils = void 0;
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
const os = require("os");
const mm = "🥦 🥦 🥦 🥦 MyUtils 🥦🥦";
class MyUtils {
    static createQRCodeAndUploadToCloudStorage(arg0, arg1, arg2) {
        throw new Error("Method not implemented.");
    }
    static getDatabaseUrl() {
        const env = process.env.NODE_ENV;
        let dbUrl;
        if (env === "production") {
            dbUrl = process.env.REMOTE_DB_URI;
            common_1.Logger.debug(`${mm} db url from env: ${dbUrl}`);
        }
        const pre = 'mongodb+srv';
        const first = '://bryan:kkTiger23';
        const sec = '@cluster0.njz1rn4.mongodb.net/';
        const kasie = 'kasie_transie';
        if (!dbUrl) {
            dbUrl = `${pre}${first}${sec}${kasie}`;
        }
        common_1.Logger.log(`\n\n${mm} getDatabaseUrl: 🍷🍷🍷🍷 Atlas dbUrl: ${dbUrl} 🍷🍷🍷🍷`);
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
        if (!port) {
            port = '8080';
        }
        common_1.Logger.log(`${mm} port: ${port} 🍷🍷 `);
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
        common_1.Logger.log(`\n\n${mm} ... Deleting old files ...`);
        const tempZipsDir = path.join(__dirname, "..", "tempZips");
        const files = fs.readdirSync(tempZipsDir);
        const currentTime = Date.now();
        const tenMinutesAgo = currentTime - 10 * 60 * 1000;
        let cnt = 0;
        for (const file of files) {
            const filePath = path.join(tempZipsDir, file);
            const fileStats = fs.statSync(filePath);
            const fileCreatedTime = fileStats.ctimeMs;
            if (fileCreatedTime < tenMinutesAgo) {
                fs.unlinkSync(filePath);
                cnt++;
            }
        }
        common_1.Logger.log(`${mm} ... Deleted: ${cnt} temporary files\n`);
    }
    static getServerIPaddress() {
        const interfaces = os.networkInterfaces();
        let serverIP = "127.0.0.1";
        for (const name of Object.keys(interfaces)) {
            for (const iface of interfaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    serverIP = iface.address;
                    break;
                }
            }
        }
        return serverIP;
    }
}
exports.MyUtils = MyUtils;
//# sourceMappingURL=my-utils.js.map