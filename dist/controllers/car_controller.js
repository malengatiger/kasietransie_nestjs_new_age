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
var CarController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const Vehicle_1 = require("../data/models/Vehicle");
const VehicleService_1 = require("../services/VehicleService");
const platform_express_1 = require("@nestjs/platform-express");
const RouteAssignmentList_1 = require("../data/helpers/RouteAssignmentList");
const VehicleArrival_1 = require("../data/models/VehicleArrival");
const DispatchService_1 = require("../services/DispatchService");
const MediaService_1 = require("../services/MediaService");
const VehiclePhoto_1 = require("../data/models/VehiclePhoto");
const my_utils_1 = require("../my-utils/my-utils");
const LocationRequestService_1 = require("../services/LocationRequestService");
const LocationRequest_1 = require("../data/models/LocationRequest");
const LocationResponse_1 = require("../data/models/LocationResponse");
const RouteService_1 = require("../services/RouteService");
const VehicleMediaRequest_1 = require("../data/models/VehicleMediaRequest");
const kasie_error_1 = require("../my-utils/kasie.error");
const TimeSeriesService_1 = require("../services/TimeSeriesService");
const mm = ' 🚼 🚼 🚼 RouteController  🚼';
let CarController = CarController_1 = class CarController {
    constructor(carService, dispatchService, mediaService, locationRequestService, routeService, timeSeriesService) {
        this.carService = carService;
        this.dispatchService = dispatchService;
        this.mediaService = mediaService;
        this.locationRequestService = locationRequestService;
        this.routeService = routeService;
        this.timeSeriesService = timeSeriesService;
        this.logger = new common_1.Logger(CarController_1.name);
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
            throw new kasie_error_1.KasieError(400, 'UserId is missing!', 'getOwnerVehicles');
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
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)('addVehicle'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Vehicle_1.Vehicle]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addVehicle", null);
__decorate([
    (0, common_1.Post)('addLocationRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationRequest_1.LocationRequest]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addLocationRequest", null);
__decorate([
    (0, common_1.Post)('addLocationResponse'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationResponse_1.LocationResponse]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addLocationResponse", null);
__decorate([
    (0, common_1.Post)('addVehicleMediaRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleMediaRequest_1.VehicleMediaRequest]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addVehicleMediaRequest", null);
__decorate([
    (0, common_1.Post)('addVehiclePhoto'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehiclePhoto_1.VehiclePhoto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addVehiclePhoto", null);
__decorate([
    (0, common_1.Post)('addVehicleArrival'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VehicleArrival_1.VehicleArrival]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addVehicleArrival", null);
__decorate([
    (0, common_1.Post)('importVehiclesFromCSV'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "importVehiclesFromCSV", null);
__decorate([
    (0, common_1.Post)('importVehiclesFromJSON'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Query)('associationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "importVehiclesFromJSON", null);
__decorate([
    (0, common_1.Post)('addRouteAssignments'),
    __param(0, (0, common_1.Body)('assignments')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteAssignmentList_1.RouteAssignmentList]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "addRouteAssignments", null);
__decorate([
    (0, common_1.Get)('getPassengerTimeSeries'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getPassengerTimeSeries", null);
__decorate([
    (0, common_1.Get)('getAssociationHeartbeatTimeSeries'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getAssociationHeartbeatTimeSeries", null);
__decorate([
    (0, common_1.Get)('getOwnerVehicles'),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getOwnerVehicles", null);
__decorate([
    (0, common_1.Get)('getVehicleRouteAssignments'),
    __param(0, (0, common_1.Query)('vehicleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getVehicleRouteAssignments", null);
__decorate([
    (0, common_1.Get)('getVehicleBag'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getVehicleBag", null);
exports.CarController = CarController = CarController_1 = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [VehicleService_1.VehicleService,
        DispatchService_1.DispatchService,
        MediaService_1.MediaService,
        LocationRequestService_1.LocationRequestService,
        RouteService_1.RouteService,
        TimeSeriesService_1.TimeSeriesService])
], CarController);
//# sourceMappingURL=car_controller.js.map