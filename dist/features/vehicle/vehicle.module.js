"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleModule = void 0;
const common_1 = require("@nestjs/common");
const vehicle_service_1 = require("./vehicle.service");
const vehicle_controller_1 = require("./vehicle.controller");
const association_service_1 = require("../association/association.service");
const fcm_service_1 = require("../fcm/fcm.service");
const Vehicle_1 = require("../../data/models/Vehicle");
const mongoose_1 = require("@nestjs/mongoose");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const Association_1 = require("../../data/models/Association");
const User_1 = require("../../data/models/User");
const RouteAssignment_1 = require("../../data/models/RouteAssignment");
const Route_1 = require("../../data/models/Route");
const zipper_1 = require("../../my-utils/zipper");
const user_service_1 = require("../user/user.service");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const city_service_1 = require("../city/city.service");
const City_1 = require("../../data/models/City");
const Commuter_1 = require("../../data/models/Commuter");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const ExampleFile_1 = require("../../data/models/ExampleFile");
const Country_1 = require("../../data/models/Country");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const SettingsModel_1 = require("../../data/models/SettingsModel");
const dispatch_service_1 = require("../dispatch/dispatch.service");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const MediaService_1 = require("../../services/MediaService");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../../data/models/VehicleVideo");
const VehicleMediaRequest_1 = require("../../data/models/VehicleMediaRequest");
const LocationRequest_1 = require("../../data/models/LocationRequest");
const location_request_service_1 = require("../location_request/location_request.service");
const LocationResponse_1 = require("../../data/models/LocationResponse");
const route_service_1 = require("../route/route.service");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const RouteCity_1 = require("../../data/models/RouteCity");
const RoutePoint_1 = require("../../data/models/RoutePoint");
const CalculatedDistance_1 = require("../../data/models/CalculatedDistance");
const time_series_service_1 = require("../time_series/time_series.service");
const VehicleHeartbeatTimeSeries_1 = require("../../data/models/VehicleHeartbeatTimeSeries");
const PassengerTimeSeries_1 = require("../../data/models/PassengerTimeSeries");
const RouteUpdateRequest_1 = require("../../data/models/RouteUpdateRequest");
const storage_service_1 = require("../../storage/storage.service");
const firebase_util_1 = require("../../services/firebase_util");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const UserPhoto_1 = require("../../data/models/UserPhoto");
const heartbeat_service_1 = require("../heartbeat/heartbeat.service");
const VehicleTelemetry_1 = require("../../data/models/VehicleTelemetry");
let VehicleModule = class VehicleModule {
};
exports.VehicleModule = VehicleModule;
exports.VehicleModule = VehicleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "DispatchRecord", schema: DispatchRecord_1.DispatchRecordSchema },
                { name: "VehicleArrival", schema: VehicleArrival_1.VehicleArrivalSchema },
                { name: "VehicleDeparture", schema: VehicleDeparture_1.VehicleDepartureSchema },
                { name: "VehicleHeartbeat", schema: VehicleHeartbeat_1.VehicleHeartbeatSchema },
                { name: "VehicleTelemetry", schema: VehicleTelemetry_1.VehicleTelemetrySchema },
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
                { name: "CommuterRequest", schema: CommuterRequest_1.CommuterRequestSchema },
                { name: "VehiclePhoto", schema: VehiclePhoto_1.VehiclePhotoSchema },
                { name: "VehicleVideo", schema: VehicleVideo_1.VehicleVideoSchema },
                { name: "VehicleMediaRequest", schema: VehicleMediaRequest_1.VehicleMediaRequestSchema },
                {
                    name: "AmbassadorPassengerCount",
                    schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema,
                },
                { name: "LocationRequest", schema: LocationRequest_1.LocationRequestSchema },
                { name: "LocationResponse", schema: LocationResponse_1.LocationResponseSchema },
                { name: "RouteUpdateRequest", schema: RouteUpdateRequest_1.RouteUpdateRequestSchema },
                { name: "RouteLandmark", schema: RouteLandmark_1.RouteLandmarkSchema },
                { name: "RouteCity", schema: RouteCity_1.RouteCitySchema },
                { name: "Route", schema: Route_1.RouteSchema },
                { name: "RoutePoint", schema: RoutePoint_1.RoutePointSchema },
                { name: "CalculatedDistance", schema: CalculatedDistance_1.CalculatedDistanceSchema },
                { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema },
                { name: "PassengerTimeSeries", schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema },
                { name: "City", schema: City_1.CitySchema },
                { name: "City", schema: City_1.CitySchema },
                { name: "UserPhoto", schema: UserPhoto_1.UserPhotoSchema },
            ]),
        ],
        controllers: [vehicle_controller_1.VehicleController],
        providers: [
            heartbeat_service_1.HeartbeatService,
            vehicle_service_1.VehicleService,
            user_service_1.UserService,
            city_service_1.CityService,
            errors_interceptor_1.KasieErrorHandler,
            route_service_1.RouteService,
            time_series_service_1.TimeSeriesService,
            dispatch_service_1.DispatchService,
            MediaService_1.MediaService,
            location_request_service_1.LocationRequestService,
            association_service_1.AssociationService,
            fcm_service_1.MessagingService,
            zipper_1.FileArchiverService,
            storage_service_1.CloudStorageUploaderService, firebase_util_1.FirebaseAdmin,
        ],
    })
], VehicleModule);
//# sourceMappingURL=vehicle.module.js.map