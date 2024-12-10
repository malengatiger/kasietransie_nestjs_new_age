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
exports.KasieErrorHandler = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const kasie_error_1 = require("../data/models/kasie.error");
const fcm_service_1 = require("../features/fcm/fcm.service");
const mm = "🔴 🔴 🔴 🔴 🔴 🔴 KasieErrorHandler 🔴 ";
let KasieErrorHandler = class KasieErrorHandler {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async handleError(error, associationId, associationName) {
        common_1.Logger.error(`\n\n${mm} ... 😈😈 handling error: \n${error} `);
        try {
            const uri = process.env.REMOTE_DB_URI;
            common_1.Logger.debug(`${mm} connectToMongoDB: Atlas uri: ${uri}`);
            const client = new mongodb_1.MongoClient(uri);
            const db = client.db("kasie_transie");
            const errorData = {
                associationId: associationId,
                associationName: associationName,
                date: new Date().getTime(),
                dateString: new Date().toISOString(),
                message: JSON.stringify(error),
                statusCode: error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
            try {
                db.collection("KasieError")
                    .insertOne(errorData)
                    .catch((reason) => {
                    common_1.Logger.debug(`${mm} KasieError add to database failed: ${JSON.stringify(reason)}`);
                })
                    .then((result) => {
                    common_1.Logger.debug(`${mm} KasieError added to database: ${JSON.stringify(result)}`);
                });
            }
            catch (e) {
                common_1.Logger.debug(`${mm} KasieError add to database failed: ${JSON.stringify(e)}`);
            }
            await this.sendCloudMessage(errorData);
        }
        catch (e) {
            common_1.Logger.error(`${mm} Error handling error: ${e}`);
        }
    }
    async sendCloudMessage(err) {
        try {
            const errorMessage = err.message || "An unexpected error occurred.";
            await this.messageService.sendKasieErrorMessage(new kasie_error_1.KasieError(errorMessage, err.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        }
        catch (e) {
            common_1.Logger.error(`${mm} sendCloudMessage failed: ${e}`);
        }
    }
};
exports.KasieErrorHandler = KasieErrorHandler;
exports.KasieErrorHandler = KasieErrorHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fcm_service_1.MessagingService])
], KasieErrorHandler);
//# sourceMappingURL=errors.interceptor.js.map