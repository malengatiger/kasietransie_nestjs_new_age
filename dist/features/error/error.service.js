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
exports.ErrorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const AppError_1 = require("../../data/models/AppError");
const fcm_service_1 = require("../fcm/fcm.service");
const kasie_error_1 = require("../../data/models/kasie.error");
const mm = '🍎🍎🍎 ErrorService';
let ErrorService = class ErrorService {
    constructor(messagingService, kasieErrorModel, appErrorModel) {
        this.messagingService = messagingService;
        this.kasieErrorModel = kasieErrorModel;
        this.appErrorModel = appErrorModel;
    }
    async addAppErrors(errors) {
        const res = await this.appErrorModel.insertMany(errors.appErrorList);
        await this.messagingService.sendAppErrorMessages(errors);
        return res;
    }
    async addAppError(error) {
        common_1.Logger.log(`adding AppError${error}`);
        const err = await this.appErrorModel.create(error);
        await this.messagingService.sendAppErrorMessage(error);
        return err;
    }
    async getAppErrors(startDate) {
        const res = await this.appErrorModel
            .find({ created: { $gte: startDate } })
            .sort({ created: -1 });
        common_1.Logger.debug(`AppErrors found: ${res.length}`);
        return res;
    }
    async getKasieErrors(startDate) {
        const res = await this.kasieErrorModel
            .find({ date: { $gte: startDate } })
            .sort({ date: -1 });
        common_1.Logger.debug(`KasieErrors found: ${res.length}`);
        return res;
    }
    async addKasieError(error) {
        await this.kasieErrorModel.create(error);
    }
};
exports.ErrorService = ErrorService;
exports.ErrorService = ErrorService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(kasie_error_1.KasieError.name)),
    __param(2, (0, mongoose_1.InjectModel)(AppError_1.AppError.name)),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService, mongoose_2.default.Model, mongoose_2.default.Model])
], ErrorService);
//# sourceMappingURL=error.service.js.map