"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModule = void 0;
const common_1 = require("@nestjs/common");
const error_service_1 = require("./error.service");
const error_controller_1 = require("./error.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const kasie_error_1 = require("../../data/models/kasie.error");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const AssociationToken_1 = require("../../data/models/AssociationToken");
let ErrorModule = class ErrorModule {
};
exports.ErrorModule = ErrorModule;
exports.ErrorModule = ErrorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
            ]),
        ],
        controllers: [error_controller_1.ErrorController],
        providers: [error_service_1.ErrorService, fcm_service_1.MessagingService],
    })
], ErrorModule);
//# sourceMappingURL=error.module.js.map