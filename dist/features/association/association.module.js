"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationModule = void 0;
const common_1 = require("@nestjs/common");
const association_service_1 = require("./association.service");
const association_controller_1 = require("./association.controller");
const zipper_1 = require("../../my-utils/zipper");
const user_service_1 = require("../user/user.service");
const city_service_1 = require("../city/city.service");
const fcm_service_1 = require("../fcm/fcm.service");
const mongoose_1 = require("@nestjs/mongoose");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const AppError_1 = require("../../data/models/AppError");
const Association_1 = require("../../data/models/Association");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const City_1 = require("../../data/models/City");
const Commuter_1 = require("../../data/models/Commuter");
const Country_1 = require("../../data/models/Country");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const ExampleFile_1 = require("../../data/models/ExampleFile");
const kasie_error_1 = require("../../data/models/kasie.error");
const Route_1 = require("../../data/models/Route");
const RouteAssignment_1 = require("../../data/models/RouteAssignment");
const SettingsModel_1 = require("../../data/models/SettingsModel");
const User_1 = require("../../data/models/User");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const Vehicle_1 = require("../../data/models/Vehicle");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const storage_service_1 = require("../../storage/storage.service");
const firebase_util_1 = require("../../services/firebase_util");
let AssociationModule = class AssociationModule {
};
exports.AssociationModule = AssociationModule;
exports.AssociationModule = AssociationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "DispatchRecord", schema: DispatchRecord_1.DispatchRecordSchema },
                { name: "VehicleArrival", schema: VehicleArrival_1.VehicleArrivalSchema },
                { name: "VehicleDeparture", schema: VehicleDeparture_1.VehicleDepartureSchema },
                { name: "VehicleHeartbeat", schema: VehicleHeartbeat_1.VehicleHeartbeatSchema },
                { name: "Association", schema: Association_1.AssociationSchema },
                { name: "RouteAssignment", schema: RouteAssignment_1.RouteAssignmentSchema },
                { name: "User", schema: User_1.UserSchema },
                { name: "Route", schema: Route_1.RouteSchema },
                { name: "UserGeofenceEvent", schema: UserGeofenceEvent_1.UserGeofenceEventSchema },
                { name: "City", schema: City_1.CitySchema },
                { name: "Commuter", schema: Commuter_1.CommuterSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "ExampleFile", schema: ExampleFile_1.ExampleFileSchema },
                { name: "Country", schema: Country_1.CountrySchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "SettingsModel", schema: SettingsModel_1.SettingsModelSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema },
            ]),
        ],
        controllers: [association_controller_1.AssociationController],
        providers: [
            association_service_1.AssociationService,
            zipper_1.FileArchiverService,
            user_service_1.UserService,
            city_service_1.CityService,
            fcm_service_1.MessagingService,
            storage_service_1.CloudStorageUploaderService, firebase_util_1.FirebaseAdmin,
        ],
    })
], AssociationModule);
//# sourceMappingURL=association.module.js.map