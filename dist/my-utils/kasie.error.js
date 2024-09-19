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
exports.KasieErrorSchema = exports.KasieError = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let KasieError = class KasieError extends common_1.HttpException {
    constructor(statusCode, message, request) {
        super(`${message} - ${request}`, statusCode);
        this.statusCode = statusCode;
        this.message = message;
        this.date = new Date().toISOString();
        this.request = request;
    }
};
exports.KasieError = KasieError;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], KasieError.prototype, "statusCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], KasieError.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], KasieError.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], KasieError.prototype, "request", void 0);
exports.KasieError = KasieError = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'KasieError',
    }),
    __metadata("design:paramtypes", [Number, String, String])
], KasieError);
exports.KasieErrorSchema = mongoose_1.SchemaFactory.createForClass(KasieError);
//# sourceMappingURL=kasie.error.js.map