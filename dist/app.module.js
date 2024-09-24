"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const my_utils_1 = require("./my-utils/my-utils");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./database.config");
const zipper_1 = require("./my-utils/zipper");
const dispatch_module_1 = require("./features/dispatch/dispatch.module");
const ambassador_module_1 = require("./features/ambassador/ambassador.module");
const association_module_1 = require("./features/association/association.module");
const location_request_module_1 = require("./features/location_request/location_request.module");
const heartbeat_module_1 = require("./features/heartbeat/heartbeat.module");
const vehicle_module_1 = require("./features/vehicle/vehicle.module");
const route_module_1 = require("./features/route/route.module");
const country_module_1 = require("./features/country/country.module");
const landmark_module_1 = require("./features/landmark/landmark.module");
const user_module_1 = require("./features/user/user.module");
const dispatch_service_1 = require("./features/dispatch/dispatch.service");
const fcm_module_1 = require("./features/fcm/fcm.module");
const fcm_service_1 = require("./features/fcm/fcm.service");
const city_module_1 = require("./features/city/city.module");
const commuter_module_1 = require("./features/commuter/commuter.module");
const time_series_module_1 = require("./features/time_series/time_series.module");
const text_translation_module_1 = require("./features/text_translation/text_translation.module");
const user_geofence_module_1 = require("./features/user_geofence/user_geofence.module");
const error_module_1 = require("./features/error/error.module");
const mongo_data_module_1 = require("./mongo_data/mongo_data.module");
const AppError_1 = require("./data/models/AppError");
const kasie_error_1 = require("./data/models/kasie.error");
const FirebaseService_1 = require("./services/FirebaseService");
const ambassador_service_1 = require("./features/ambassador/ambassador.service");
const association_service_1 = require("./features/association/association.service");
const location_request_service_1 = require("./features/location_request/location_request.service");
const time_series_service_1 = require("./features/time_series/time_series.service");
const VehicleHeartbeatTimeSeries_1 = require("./data/models/VehicleHeartbeatTimeSeries");
const PassengerTimeSeries_1 = require("./data/models/PassengerTimeSeries");
const AmbassadorPassengerCount_1 = require("./data/models/AmbassadorPassengerCount");
const User_1 = require("./data/models/User");
const UserGeofenceEvent_1 = require("./data/models/UserGeofenceEvent");
const Association_1 = require("./data/models/Association");
const City_1 = require("./data/models/City");
const Commuter_1 = require("./data/models/Commuter");
const ExampleFile_1 = require("./data/models/ExampleFile");
const Vehicle_1 = require("./data/models/Vehicle");
const AssociationToken_1 = require("./data/models/AssociationToken");
const Country_1 = require("./data/models/Country");
const SettingsModel_1 = require("./data/models/SettingsModel");
const LocationRequest_1 = require("./data/models/LocationRequest");
const LocationResponse_1 = require("./data/models/LocationResponse");
const dispatch_controller_1 = require("./features/dispatch/dispatch.controller");
const VehicleHeartbeat_1 = require("./data/models/VehicleHeartbeat");
const VehicleArrival_1 = require("./data/models/VehicleArrival");
const VehicleDeparture_1 = require("./data/models/VehicleDeparture");
const DispatchRecord_1 = require("./data/models/DispatchRecord");
const CommuterRequest_1 = require("./data/models/CommuterRequest");
const storage_module_1 = require("./storage/storage.module");
const firebase_util_1 = require("./services/firebase_util");
const AmbassadorCheckIn_1 = require("./data/models/AmbassadorCheckIn");
const city_service_1 = require("./features/city/city.service");
const user_service_1 = require("./features/user/user.service");
const storage_service_1 = require("./storage/storage.service");
const VehiclePhoto_1 = require("./data/models/VehiclePhoto");
const VehicleVideo_1 = require("./data/models/VehicleVideo");
const user_controller_1 = require("./features/user/user.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [database_config_1.default],
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: () => ({
                    uri: my_utils_1.MyUtils.getDatabaseUrl(),
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: "VehicleVideo", schema: VehicleVideo_1.VehicleVideoSchema },
                { name: "VehiclePhoto", schema: VehiclePhoto_1.VehiclePhotoSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "VehicleHeartbeat", schema: VehicleHeartbeat_1.VehicleHeartbeatSchema },
                { name: "VehicleHeartbeat", schema: VehicleHeartbeat_1.VehicleHeartbeatSchema },
                { name: "VehicleArrival", schema: VehicleArrival_1.VehicleArrivalSchema },
                { name: "VehicleDeparture", schema: VehicleDeparture_1.VehicleDepartureSchema },
                { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema },
                { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema },
                { name: "PassengerTimeSeries", schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema },
                { name: "User", schema: User_1.UserSchema },
                { name: "DispatchRecord", schema: DispatchRecord_1.DispatchRecordSchema },
                { name: "UserGeofenceEvent", schema: UserGeofenceEvent_1.UserGeofenceEventSchema },
                { name: "Association", schema: Association_1.AssociationSchema },
                { name: "City", schema: City_1.CitySchema },
                { name: "Commuter", schema: Commuter_1.CommuterSchema },
                { name: "ExampleFile", schema: ExampleFile_1.ExampleFileSchema },
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "Country", schema: Country_1.CountrySchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "SettingsModel", schema: SettingsModel_1.SettingsModelSchema },
                { name: "Country", schema: Country_1.CountrySchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "LocationRequest", schema: LocationRequest_1.LocationRequestSchema },
                { name: "LocationResponse", schema: LocationResponse_1.LocationResponseSchema },
                { name: "CommuterRequest", schema: CommuterRequest_1.CommuterRequestSchema },
                { name: "LocationResponse", schema: LocationResponse_1.LocationResponseSchema },
                { name: "AmbassadorCheckIn", schema: AmbassadorCheckIn_1.AmbassadorCheckInSchema },
                { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema },
            ]),
            dispatch_module_1.DispatchModule,
            ambassador_module_1.AmbassadorModule,
            association_module_1.AssociationModule,
            location_request_module_1.LocationRequestModule,
            heartbeat_module_1.HeartbeatModule,
            vehicle_module_1.VehicleModule,
            route_module_1.RouteModule,
            country_module_1.CountryModule,
            landmark_module_1.LandmarkModule,
            user_module_1.UserModule,
            fcm_module_1.FcmModule,
            city_module_1.CityModule,
            commuter_module_1.CommuterModule,
            time_series_module_1.TimeSeriesModule,
            text_translation_module_1.TextTranslationModule,
            user_geofence_module_1.UserGeofenceModule,
            error_module_1.ErrorModule,
            mongo_data_module_1.MongoDataModule,
            storage_module_1.StorageModule,
        ],
        controllers: [app_controller_1.AppController, dispatch_controller_1.DispatchController, user_controller_1.UserController],
        providers: [app_service_1.AppService, dispatch_service_1.DispatchService, fcm_service_1.MessagingService, time_series_service_1.TimeSeriesService,
            user_service_1.UserService, city_service_1.CityService, storage_service_1.CloudStorageUploaderService,
            ambassador_service_1.AmbassadorService, association_service_1.AssociationService, location_request_service_1.LocationRequestService,
            FirebaseService_1.MyFirebaseService, zipper_1.FileArchiverService, firebase_util_1.FirebaseAdmin,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map