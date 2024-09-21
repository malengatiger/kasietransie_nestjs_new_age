"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommuterModule = void 0;
const common_1 = require("@nestjs/common");
const commuter_service_1 = require("./commuter.service");
const commuter_controller_1 = require("./commuter.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const Commuter_1 = require("../../data/models/Commuter");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const CommuterResponse_1 = require("../../data/models/CommuterResponse");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const Route_1 = require("../../data/models/Route");
const RoutePoint_1 = require("../../data/models/RoutePoint");
const AssociationToken_1 = require("../../data/models/AssociationToken");
let CommuterModule = class CommuterModule {
};
exports.CommuterModule = CommuterModule;
exports.CommuterModule = CommuterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "Commuter", schema: Commuter_1.CommuterSchema },
                { name: "CommuterResponse", schema: CommuterResponse_1.CommuterResponseSchema },
                { name: "CommuterRequest", schema: CommuterRequest_1.CommuterRequestSchema },
                { name: "RouteLandmark", schema: RouteLandmark_1.RouteLandmarkSchema },
                { name: "Route", schema: Route_1.RouteSchema },
                { name: "RoutePoint", schema: RoutePoint_1.RoutePointSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
            ]),
        ],
        controllers: [commuter_controller_1.CommuterController],
        providers: [commuter_service_1.CommuterService, fcm_service_1.MessagingService],
    })
], CommuterModule);
//# sourceMappingURL=commuter.module.js.map