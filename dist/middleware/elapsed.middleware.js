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
exports.ElapsedTimeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fcm_service_1 = require("../features/fcm/fcm.service");
const kasie_error_1 = require("../data/models/kasie.error");
const mm = ' 🔇 🔇 🔇 ElapsedTimeMiddleware';
let ElapsedTimeMiddleware = class ElapsedTimeMiddleware {
    constructor(messagingService, kasieErrorModel) {
        this.messagingService = messagingService;
        this.kasieErrorModel = kasieErrorModel;
    }
    use(req, res, next) {
        const start = Date.now();
        res.on('finish', async () => {
            const elapsed = (Date.now() - start) / 1000;
            common_1.Logger.log(`${mm} ${req.originalUrl} took 🌸🌸🌸 ${elapsed} seconds 🔴 🔴 statusCode: ${res.statusCode}`);
            if (res.statusCode > 201) {
                const x = new kasie_error_1.KasieError(`Error on Kasie Backend, statusCode: ${res.statusCode} - ${res.statusMessage}`, common_1.HttpStatus.BAD_REQUEST);
                await this.kasieErrorModel.create(x);
                common_1.Logger.debug(`${mm} KasieError added to database `);
                await this.messagingService.sendKasieErrorMessage(x);
            }
        });
        next();
    }
};
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware;
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(kasie_error_1.KasieError.name)),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService, mongoose_2.default.Model])
], ElapsedTimeMiddleware);
//# sourceMappingURL=elapsed.middleware.js.map