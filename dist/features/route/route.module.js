"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteModule = void 0;
const common_1 = require("@nestjs/common");
const route_service_1 = require("./route.service");
const route_controller_1 = require("./route.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const zipper_1 = require("../../my-utils/zipper");
const city_service_1 = require("../city/city.service");
const Route_1 = require("../../data/models/Route");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const RouteUpdateRequest_1 = require("../../data/models/RouteUpdateRequest");
const VehicleMediaRequest_1 = require("../../data/models/VehicleMediaRequest");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const RoutePoint_1 = require("../../data/models/RoutePoint");
const RouteCity_1 = require("../../data/models/RouteCity");
const City_1 = require("../../data/models/City");
const CalculatedDistance_1 = require("../../data/models/CalculatedDistance");
const Country_1 = require("../../data/models/Country");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const storage_service_1 = require("../../storage/storage.service");
const ExampleFile_1 = require("../../data/models/ExampleFile");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../../data/models/VehicleVideo");
const Vehicle_1 = require("../../data/models/Vehicle");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const User_1 = require("../../data/models/User");
const UserPhoto_1 = require("../../data/models/UserPhoto");
const Association_1 = require("../../data/models/Association");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
let RouteModule = class RouteModule {
};
exports.RouteModule = RouteModule;
exports.RouteModule = RouteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
                { name: "RouteUpdateRequest", schema: RouteUpdateRequest_1.RouteUpdateRequestSchema },
                { name: "VehicleMediaRequest", schema: VehicleMediaRequest_1.VehicleMediaRequestSchema },
                { name: "RouteLandmark", schema: RouteLandmark_1.RouteLandmarkSchema },
                { name: "Route", schema: Route_1.RouteSchema },
                { name: "VehicleVideo", schema: VehicleVideo_1.VehicleVideoSchema },
                { name: "VehiclePhoto", schema: VehiclePhoto_1.VehiclePhotoSchema },
                { name: "RoutePoint", schema: RoutePoint_1.RoutePointSchema },
                { name: "RouteCity", schema: RouteCity_1.RouteCitySchema },
                { name: "City", schema: City_1.CitySchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "CalculatedDistance", schema: CalculatedDistance_1.CalculatedDistanceSchema },
                { name: "Country", schema: Country_1.CountrySchema },
                { name: 'ExampleFile', schema: ExampleFile_1.ExampleFileSchema },
                { name: "User", schema: User_1.UserSchema },
                { name: "UserPhoto", schema: UserPhoto_1.UserPhotoSchema },
                { name: "Association", schema: Association_1.AssociationSchema },
                { name: "DispatchRecord", schema: DispatchRecord_1.DispatchRecordSchema },
                { name: "CommuterRequest", schema: CommuterRequest_1.CommuterRequestSchema },
            ]),
        ],
        controllers: [route_controller_1.RouteController],
        providers: [route_service_1.RouteService, errors_interceptor_1.KasieErrorHandler, zipper_1.FileArchiverService, fcm_service_1.MessagingService, city_service_1.CityService, storage_service_1.CloudStorageUploaderService],
    })
], RouteModule);
//# sourceMappingURL=route.module.js.map