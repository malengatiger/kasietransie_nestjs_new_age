"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileArchiverService = void 0;
const common_1 = require("@nestjs/common");
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");
const mm = '🍎🍎🍎 FileArchiverService: 🍎🍎🍎';
let FileArchiverService = class FileArchiverService {
    async zip(fileContents) {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(2, 8);
        const key = `${timestamp}_${randomString}`;
        const zipFileName = `file${key}.zip`;
        const tempZipsDir = path.join(__dirname, '..', 'tempZips');
        if (!fs.existsSync(tempZipsDir)) {
            fs.mkdirSync(tempZipsDir);
        }
        const zipFilePath = path.join(tempZipsDir, zipFileName);
        const sizeInMB = (fileContents[0].content.length / (1024 * 1024)).toFixed(2);
        common_1.Logger.log(`${mm} string content to be zipped: ${sizeInMB}MB`);
        const resultPath = new Promise((resolve, reject) => {
            const output = fs.createWriteStream(zipFilePath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            output.on('data', (chunk) => {
                common_1.Logger.log(`${mm} ... on data: chunk length: ${chunk.length} bytes`);
            });
            output.on('close', () => {
                const stats = fs.statSync(zipFilePath);
                const fileSizeInBytes = stats.size;
                const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
                common_1.Logger.log(`${mm} ... onClose .. zipped file size: 🔷 ${fileSizeInMB}MB 🔷`);
                resolve(zipFilePath);
            });
            archive.on('error', (error) => {
                common_1.Logger.log(`${mm} ... archive error: ${error}`);
                reject(error);
            });
            archive.pipe(output);
            for (const file of fileContents) {
                archive.append(file.content, { name: zipFileName });
            }
            common_1.Logger.log(`${mm} ... finalize archive: file zipped??`);
            archive.finalize();
        });
        common_1.Logger.debug(`${mm} zipped file path: 🥬 \n🥬${await resultPath}🥬`);
        return resultPath;
    }
};
exports.FileArchiverService = FileArchiverService;
exports.FileArchiverService = FileArchiverService = __decorate([
    (0, common_1.Injectable)()
], FileArchiverService);
//# sourceMappingURL=zipper.js.map