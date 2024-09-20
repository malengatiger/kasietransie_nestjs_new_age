"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VehicleController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const common_1 = require("@nestjs/common");
const Vehicle_1 = require("../../data/models/Vehicle");
const platform_express_1 = require("@nestjs/platform-express");
const RouteAssignmentList_1 = require("../../data/helpers/RouteAssignmentList");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const MediaService_1 = require("../../services/MediaService");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const my_utils_1 = require("../../my-utils/my-utils");
const dispatch_service_1 = require("../dispatch/dispatch.service");
const location_request_service_1 = require("../location_request/location_request.service");
const route_service_1 = require("../route/route.service");
const time_series_service_1 = require("../time_series/time_series.service");
const vehicle_service_1 = require("./vehicle.service");
const kasie_error_1 = require("../../data/models/kasie.error");
const LocationRequest_1 = require("../../data/models/LocationRequest");
const LocationResponse_1 = require("../../data/models/LocationResponse");
const VehicleMediaRequest_1 = require("../../data/models/VehicleMediaRequest");
const mm = ' 🚼 🚼 🚼 RouteController  🚼';
let VehicleController = VehicleController_1 = class VehicleController {
    constructor(carService, dispatchService, mediaService, locationRequestService, routeService, timeSeriesService) {
        this.carService = carService;
        this.dispatchService = dispatchService;
        this.mediaService = mediaService;
        this.locationRequestService = locationRequestService;
        this.routeService = routeService;
        this.timeSeriesService = timeSeriesService;
        this.logger = new common_1.Logger(VehicleController_1.name);
    }
    async addVehicle(vehicle) {
        return await this.carService.addVehicle(vehicle);
    }
    async addLocationRequest(request) {
        return await this.locationRequestService.addLocationRequest(request);
    }
    async addLocationResponse(request) {
        return await this.locationRequestService.addLocationResponse(request);
    }
    async addVehicleMediaRequest(request) {
        return await this.routeService.addVehicleMediaRequest(request);
    }
    async addVehiclePhoto(vehiclePhoto) {
        return await this.mediaService.addVehiclePhoto(vehiclePhoto);
    }
    async addVehicleArrival(vehicle) {
        return await this.dispatchService.addVehicleArrival(vehicle);
    }
    async importVehiclesFromCSV(file, associationId) {
        const res = await this.carService.importVehiclesFromCSV(file, associationId);
        return res;
    }
    async importVehiclesFromJSON(file, associationId) {
        const res = await this.carService.importVehiclesFromJSON(file, associationId);
        return res;
    }
    async addRouteAssignments(assignments) {
        return await this.carService.addRouteAssignments(assignments);
    }
    async getPassengerTimeSeries(query) {
        return await this.timeSeriesService.getPassengerTimeSeries(query.associationId, query.routeId, query.startDate);
    }
    async getAssociationHeartbeatTimeSeries(query, res) {
        try {
            const fileName = await this.timeSeriesService.aggregateAssociationHeartbeatData(query.associationId, query.startDate);
            this.sendFile(fileName, res);
        }
        catch (error) {
            common_1.Logger.error(`${mm} 👿👿👿👿 Error getAssociationHeartbeatTimeSeries:`, error);
            res.status(500).send(`${mm} 👿👿👿 Error downloading file: ${error}`);
        }
    }
    async getOwnerVehicles(userId) {
        if (userId) {
            throw new kasie_error_1.KasieError('getOwnerVehicles: UserId is missing!', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.carService.getOwnerVehicles(userId, 0);
    }
    async getVehicleRouteAssignments(vehicleId) {
        return await this.carService.getVehicleRouteAssignments(vehicleId);
    }
    async getVehicleBag(query) {
        return await this.carService.getVehicleBag(query.vehicleId, query.startDate);
    }
    sendFile(fileName, res) {
        this.logger.log('Sending file: ' + fileName);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
        my_utils_1.MyUtils.deleteOldFiles();
        res.sendFile(fileName);
    }
};
exports.VehicleController = VehicleController;
__decorate([
    (0, common_1.Post)('addVehicle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Vehicle_1.Vehicle]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addVehicle", null);
__decorate([
    (0, common_1.Post)('addLocationRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationRequest_1.LocationRequest]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addLocationRequest", null);
__decorate([
    (0, common_1.Post)('addLocationResponse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationResponse_1.LocationResponse]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addLocationResponse", null);
__decorate([
    (0, common_1.Post)('addVehicleMediaRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleMediaRequest_1.VehicleMediaRequest]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addVehicleMediaRequest", null);
__decorate([
    (0, common_1.Post)('addVehiclePhoto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehiclePhoto_1.VehiclePhoto]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addVehiclePhoto", null);
__decorate([
    (0, common_1.Post)('addVehicleArrival'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleArrival_1.VehicleArrival]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addVehicleArrival", null);
__decorate([
    (0, common_1.Post)('importVehiclesFromCSV'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "importVehiclesFromCSV", null);
__decorate([
    (0, common_1.Post)('importVehiclesFromJSON'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "importVehiclesFromJSON", null);
__decorate([
    (0, common_1.Post)('addRouteAssignments'),
    __param(0, (0, common_1.Body)('assignments')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteAssignmentList_1.RouteAssignmentList]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "addRouteAssignments", null);
__decorate([
    (0, common_1.Get)('getPassengerTimeSeries'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getPassengerTimeSeries", null);
__decorate([
    (0, common_1.Get)('getAssociationHeartbeatTimeSeries'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getAssociationHeartbeatTimeSeries", null);
__decorate([
    (0, common_1.Get)('getOwnerVehicles'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getOwnerVehicles", null);
__decorate([
    (0, common_1.Get)('getVehicleRouteAssignments'),
    __param(0, (0, common_1.Query)('vehicleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicleRouteAssignments", null);
__decorate([
    (0, common_1.Get)('getVehicleBag'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehicleController.prototype, "getVehicleBag", null);
exports.VehicleController = VehicleController = VehicleController_1 = __decorate([
    (0, common_1.Controller)('vehicle'),
    __metadata("design:paramtypes", [vehicle_service_1.VehicleService,
        dispatch_service_1.DispatchService,
        MediaService_1.MediaService,
        location_request_service_1.LocationRequestService,
        route_service_1.RouteService,
        time_series_service_1.TimeSeriesService])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map