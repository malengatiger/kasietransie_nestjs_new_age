"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmModule = void 0;
const common_1 = require("@nestjs/common");
const fcm_controller_1 = require("./fcm.controller");
const fcm_service_1 = require("./fcm.service");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
let FcmModule = class FcmModule {
};
exports.FcmModule = FcmModule;
exports.FcmModule = FcmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
            ]),
        ],
        controllers: [fcm_controller_1.FcmController],
        providers: [fcm_service_1.MessagingService],
    })
], FcmModule);
//# sourceMappingURL=fcm.module.js.map