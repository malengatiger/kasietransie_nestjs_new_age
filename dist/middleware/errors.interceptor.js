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
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const kasie_error_1 = require("../data/models/kasie.error");
const fcm_service_1 = require("../features/fcm/fcm.service");
const mm = '🔴 🔴 🔴 🔴 🔴 🔴 ErrorsInterceptor 🔴 ';
let ErrorsInterceptor = class ErrorsInterceptor {
    constructor(messageService) {
        this.messageService = messageService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(this.handleError.bind(this)));
    }
    async handleError(err) {
        common_1.Logger.error(`\n\n${mm} ... 😈😈 handling error: \n${err} `);
        try {
            const uri = process.env.REMOTE_DB_URI;
            common_1.Logger.debug(`${mm} connectToMongoDB: Atlas uri: ${uri}`);
            const client = new mongodb_1.MongoClient(uri);
            const db = client.db("kasie_transie");
            const errorData = {
                message: `😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
            };
            await db.collection('KasieError').insertOne(errorData);
            common_1.Logger.debug(`${mm} KasieError added to database; 😈 sending error to FCM topic ... `);
            await this.sendCloudMessage(err);
        }
        catch (e) {
            common_1.Logger.error(`${mm} Error handling error: ${e}`);
        }
        return (0, rxjs_1.throwError)(() => new kasie_error_1.KasieError(`😈😈 ${err.message}`, common_1.HttpStatus.BAD_REQUEST));
    }
    async sendCloudMessage(err) {
        try {
            const error = new kasie_error_1.KasieError(`😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
            await this.messageService.sendKasieErrorMessage(error);
        }
        catch (e) {
            common_1.Logger.error(`${mm} ${e}`);
        }
    }
};
exports.ErrorsInterceptor = ErrorsInterceptor;
exports.ErrorsInterceptor = ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService])
], ErrorsInterceptor);
//# sourceMappingURL=errors.interceptor.js.map