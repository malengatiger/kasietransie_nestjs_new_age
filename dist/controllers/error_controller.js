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
var ErrorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
const common_1 = require("@nestjs/common");
const error_service_1 = require("../features/error/error.service");
const mm = ' 🚼 🚼 🚼 ErrorController  🚼';
let ErrorController = ErrorController_1 = class ErrorController {
    constructor(errorService) {
        this.errorService = errorService;
        this.logger = new common_1.Logger(ErrorController_1.name);
    }
    async getAppErrors(startDate) {
        return await this.errorService.getAppErrors(startDate);
    }
    async getKasieErrors(startDate) {
        return await this.errorService.getKasieErrors(startDate);
    }
};
exports.ErrorController = ErrorController;
__decorate([
    (0, common_1.Get)('getAppErrors'),
    __param(0, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ErrorController.prototype, "getAppErrors", null);
__decorate([
    (0, common_1.Get)('getKasieErrors'),
    __param(0, (0, common_1.Query)('startDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ErrorController.prototype, "getKasieErrors", null);
exports.ErrorController = ErrorController = ErrorController_1 = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [error_service_1.ErrorService])
], ErrorController);
//# sourceMappingURL=error_controller.js.map