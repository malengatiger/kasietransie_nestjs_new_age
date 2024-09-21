"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRequestModule = void 0;
const common_1 = require("@nestjs/common");
const location_request_service_1 = require("./location_request.service");
const location_request_controller_1 = require("./location_request.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const LocationRequest_1 = require("../../data/models/LocationRequest");
const mongoose_1 = require("@nestjs/mongoose");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const AppError_1 = require("../../data/models/AppError");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const kasie_error_1 = require("../../data/models/kasie.error");
const LocationResponse_1 = require("../../data/models/LocationResponse");
let LocationRequestModule = class LocationRequestModule {
};
exports.LocationRequestModule = LocationRequestModule;
exports.LocationRequestModule = LocationRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "LocationRequest", schema: LocationRequest_1.LocationRequestSchema },
                { name: "LocationResponse", schema: LocationResponse_1.LocationResponseSchema },
                { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema },
            ]),
        ],
        controllers: [location_request_controller_1.LocationRequestController],
        providers: [location_request_service_1.LocationRequestService, fcm_service_1.MessagingService],
    })
], LocationRequestModule);
//# sourceMappingURL=location_request.module.js.map