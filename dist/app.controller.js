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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const nestjs_real_ip_1 = require("nestjs-real-ip");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async shakeKasieUp() {
        return this.appService.shakeKasieUp();
    }
    get(ip) {
        return ip;
    }
    async getAppIPaddress2(req) {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const host = req.headers.host;
        const protocol = req.protocol;
        const fullUrl = `${protocol}://${host}${req.originalUrl}`;
        console.log(`🌼 IP Address is what? 🌼🌼🌼 ${ip} 🌼🌼🌼`);
        console.log(`🌼 Full URL: 🌼🌼🌼 ${fullUrl} 🌼🌼🌼`);
        return fullUrl;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(""),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "shakeKasieUp", null);
__decorate([
    (0, common_1.Get)("getAppIPaddress"),
    __param(0, (0, nestjs_real_ip_1.RealIP)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], AppController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('getAppIPaddress2'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAppIPaddress2", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)("app"),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map