"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGeofenceModule = void 0;
const common_1 = require("@nestjs/common");
const user_geofence_service_1 = require("./user_geofence.service");
const user_geofence_controller_1 = require("./user_geofence.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const mongoose_1 = require("@nestjs/mongoose");
const TranslationBag_1 = require("../../data/models/TranslationBag");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const firebase_util_1 = require("../../services/firebase_util");
let UserGeofenceModule = class UserGeofenceModule {
};
exports.UserGeofenceModule = UserGeofenceModule;
exports.UserGeofenceModule = UserGeofenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "TranslationBag", schema: TranslationBag_1.TranslationBagSchema },
                { name: "UserGeofenceEvent", schema: UserGeofenceEvent_1.UserGeofenceEventSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
            ]),
        ],
        controllers: [user_geofence_controller_1.UserGeofenceController],
        providers: [user_geofence_service_1.UserGeofenceService, fcm_service_1.MessagingService, firebase_util_1.FirebaseAdmin],
    })
], UserGeofenceModule);
//# sourceMappingURL=user_geofence.module.js.map