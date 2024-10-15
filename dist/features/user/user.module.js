"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const User_1 = require("../../data/models/User");
const mongoose_1 = require("@nestjs/mongoose");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const Association_1 = require("../../data/models/Association");
const storage_service_1 = require("../../storage/storage.service");
const firebase_util_1 = require("../../services/firebase_util");
const ExampleFile_1 = require("../../data/models/ExampleFile");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../../data/models/VehicleVideo");
const Vehicle_1 = require("../../data/models/Vehicle");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const fcm_service_1 = require("../fcm/fcm.service");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const kasie_error_1 = require("../../data/models/kasie.error");
const UserPhoto_1 = require("../../data/models/UserPhoto");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "User", schema: User_1.UserSchema },
                { name: "UserGeofenceEvent", schema: UserGeofenceEvent_1.UserGeofenceEventSchema },
                { name: "Association", schema: Association_1.AssociationSchema },
                { name: "ExampleFile", schema: ExampleFile_1.ExampleFileSchema },
                { name: "VehicleVideo", schema: VehicleVideo_1.VehicleVideoSchema },
                { name: "VehiclePhoto", schema: VehiclePhoto_1.VehiclePhotoSchema },
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "UserPhoto", schema: UserPhoto_1.UserPhotoSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
            ]),
        ], controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, storage_service_1.CloudStorageUploaderService, firebase_util_1.FirebaseAdmin, errors_interceptor_1.KasieErrorHandler, fcm_service_1.MessagingService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map