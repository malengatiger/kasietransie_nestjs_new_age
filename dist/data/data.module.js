"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModule = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
const data_controller_1 = require("./data.controller");
const mongoose_1 = require("@nestjs/mongoose");
const AmbassadorCheckIn_1 = require("./models/AmbassadorCheckIn");
const AmbassadorPassengerCount_1 = require("./models/AmbassadorPassengerCount");
const AppError_1 = require("./models/AppError");
const Association_1 = require("./models/Association");
const AssociationToken_1 = require("./models/AssociationToken");
const CalculatedDistance_1 = require("./models/CalculatedDistance");
const City_1 = require("./models/City");
const Commuter_1 = require("./models/Commuter");
const CommuterRequest_1 = require("./models/CommuterRequest");
const CommuterResponse_1 = require("./models/CommuterResponse");
const Country_1 = require("./models/Country");
const DispatchRecord_1 = require("./models/DispatchRecord");
const ExampleFile_1 = require("./models/ExampleFile");
const Landmark_1 = require("./models/Landmark");
const LocationRequest_1 = require("./models/LocationRequest");
const LocationResponse_1 = require("./models/LocationResponse");
const PassengerTimeSeries_1 = require("./models/PassengerTimeSeries");
const Route_1 = require("./models/Route");
const RoutePoint_1 = require("./models/RoutePoint");
const RouteUpdateRequest_1 = require("./models/RouteUpdateRequest");
const SettingsModel_1 = require("./models/SettingsModel");
const User_1 = require("./models/User");
const UserGeofenceEvent_1 = require("./models/UserGeofenceEvent");
const Vehicle_1 = require("./models/Vehicle");
const VehicleArrival_1 = require("./models/VehicleArrival");
const VehicleDeparture_1 = require("./models/VehicleDeparture");
const VehicleHeartbeat_1 = require("./models/VehicleHeartbeat");
const VehicleHeartbeatTimeSeries_1 = require("./models/VehicleHeartbeatTimeSeries");
const VehicleMediaRequest_1 = require("./models/VehicleMediaRequest");
const VehiclePhoto_1 = require("./models/VehiclePhoto");
const VehicleVideo_1 = require("./models/VehicleVideo");
const RouteAssignment_1 = require("./models/RouteAssignment");
const StateProvince_1 = require("./models/StateProvince");
const country_controller_1 = require("../controllers/country_controller");
const country_service_1 = require("../features/country/country.service");
let DataModule = class DataModule {
};
exports.DataModule = DataModule;
exports.DataModule = DataModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: AmbassadorCheckIn_1.AmbassadorCheckIn.name, schema: AmbassadorCheckIn_1.AmbassadorCheckInSchema },
                {
                    name: AmbassadorPassengerCount_1.AmbassadorPassengerCount.name,
                    schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema,
                },
                {
                    name: AppError_1.AppError.name,
                    schema: AppError_1.AppErrorSchema,
                },
                {
                    name: Association_1.Association.name,
                    schema: Association_1.AssociationSchema,
                },
                {
                    name: AssociationToken_1.AssociationToken.name,
                    schema: AssociationToken_1.AssociationTokenSchema,
                },
                {
                    name: CalculatedDistance_1.CalculatedDistance.name,
                    schema: CalculatedDistance_1.CalculatedDistanceSchema,
                },
                {
                    name: City_1.City.name,
                    schema: City_1.CitySchema,
                },
                {
                    name: Commuter_1.Commuter.name,
                    schema: Commuter_1.CommuterSchema,
                },
                {
                    name: CommuterRequest_1.CommuterRequest.name,
                    schema: CommuterRequest_1.CommuterRequestSchema,
                },
                {
                    name: CommuterRequest_1.CommuterRequest.name,
                    schema: CommuterRequest_1.CommuterRequestSchema,
                },
                {
                    name: CommuterResponse_1.CommuterResponse.name,
                    schema: CommuterResponse_1.CommuterResponseSchema,
                },
                {
                    name: Country_1.Country.name,
                    schema: Country_1.CountrySchema,
                },
                {
                    name: DispatchRecord_1.DispatchRecord.name,
                    schema: DispatchRecord_1.DispatchRecordSchema,
                },
                {
                    name: ExampleFile_1.ExampleFile.name,
                    schema: ExampleFile_1.ExampleFileSchema,
                },
                {
                    name: Landmark_1.Landmark.name,
                    schema: Landmark_1.LandmarkSchema,
                },
                {
                    name: LocationRequest_1.LocationRequest.name,
                    schema: LocationRequest_1.LocationRequestSchema,
                },
                {
                    name: LocationResponse_1.LocationResponse.name,
                    schema: LocationResponse_1.LocationResponseSchema,
                },
                {
                    name: PassengerTimeSeries_1.PassengerTimeSeries.name,
                    schema: PassengerTimeSeries_1.PassengerTimeSeriesSchema,
                },
                {
                    name: Route_1.Route.name,
                    schema: Route_1.RouteSchema,
                },
                {
                    name: RoutePoint_1.RoutePoint.name,
                    schema: RoutePoint_1.RoutePointSchema,
                },
                {
                    name: RouteUpdateRequest_1.RouteUpdateRequest.name,
                    schema: RouteUpdateRequest_1.RouteUpdateRequestSchema,
                },
                {
                    name: SettingsModel_1.SettingsModel.name,
                    schema: SettingsModel_1.SettingsModelSchema,
                },
                {
                    name: User_1.User.name,
                    schema: User_1.UserSchema,
                },
                {
                    name: UserGeofenceEvent_1.UserGeofenceEvent.name,
                    schema: UserGeofenceEvent_1.UserGeofenceEventSchema,
                },
                {
                    name: RouteUpdateRequest_1.RouteUpdateRequest.name,
                    schema: RouteUpdateRequest_1.RouteUpdateRequestSchema,
                },
                {
                    name: SettingsModel_1.SettingsModel.name,
                    schema: SettingsModel_1.SettingsModelSchema,
                },
                {
                    name: Vehicle_1.Vehicle.name,
                    schema: Vehicle_1.VehicleSchema,
                },
                {
                    name: VehicleArrival_1.VehicleArrival.name,
                    schema: VehicleArrival_1.VehicleArrivalSchema,
                },
                {
                    name: VehicleDeparture_1.VehicleDeparture.name,
                    schema: VehicleDeparture_1.VehicleDepartureSchema,
                },
                {
                    name: VehicleHeartbeat_1.VehicleHeartbeat.name,
                    schema: VehicleHeartbeat_1.VehicleHeartbeatSchema,
                },
                {
                    name: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeries.name,
                    schema: VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeriesSchema,
                },
                {
                    name: VehicleMediaRequest_1.VehicleMediaRequest.name,
                    schema: VehicleMediaRequest_1.VehicleMediaRequestSchema,
                },
                {
                    name: VehiclePhoto_1.VehiclePhoto.name,
                    schema: VehiclePhoto_1.VehiclePhotoSchema,
                },
                {
                    name: VehicleVideo_1.VehicleVideo.name,
                    schema: VehicleVideo_1.VehicleVideoSchema,
                },
                {
                    name: RouteAssignment_1.RouteAssignment.name,
                    schema: RouteAssignment_1.RouteAssignmentSchema,
                },
                {
                    name: StateProvince_1.StateProvince.name,
                    schema: StateProvince_1.StateProvinceSchema,
                },
            ]),
        ],
        controllers: [data_controller_1.DataController, country_controller_1.CountryController],
        providers: [data_service_1.DataService, country_service_1.CountryService],
    })
], DataModule);
//# sourceMappingURL=data.module.js.map