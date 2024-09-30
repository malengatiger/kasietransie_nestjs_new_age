"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const kasie_error_1 = require("../data/models/kasie.error");
const mm = '🔴🔴🔴 ErrorsInterceptor';
let ErrorsInterceptor = class ErrorsInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)(handleError));
        function handleError(err) {
            common_1.Logger.log(`\n\n${mm} ... 😈😈 handling error: ${err} `);
            sendMessage(err);
            return (0, rxjs_1.throwError)(() => new kasie_error_1.KasieError(`😈😈 ${err.message}`, common_1.HttpStatus.BAD_REQUEST));
        }
        async function sendMessage(err) {
            const x = new kasie_error_1.KasieError(`😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
            await this.kasieErrorModel.create(x);
            common_1.Logger.debug(`${mm} KasieError added to database; 😈 sending error to FCM topic ... `);
            await this.messagingService.sendKasieErrorMessage(x);
        }
    }
};
exports.ErrorsInterceptor = ErrorsInterceptor;
exports.ErrorsInterceptor = ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorsInterceptor);
//# sourceMappingURL=errors.interceptor.js.map