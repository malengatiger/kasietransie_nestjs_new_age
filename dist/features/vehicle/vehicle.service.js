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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Vehicle_1 = require("../../data/models/Vehicle");
const Association_1 = require("../../data/models/Association");
const User_1 = require("../../data/models/User");
const Route_1 = require("../../data/models/Route");
const RouteAssignment_1 = require("../../data/models/RouteAssignment");
const VehicleHeartbeat_1 = require("../../data/models/VehicleHeartbeat");
const fs = require("fs");
const VehicleBag_1 = require("../../data/helpers/VehicleBag");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const VehicleDeparture_1 = require("../../data/models/VehicleDeparture");
const association_service_1 = require("../association/association.service");
const storage_service_1 = require("../../storage/storage.service");
const VehicleMediaRequest_1 = require("../../data/models/VehicleMediaRequest");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../../data/models/VehicleVideo");
const os = require("os");
const path = require("path");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const user_service_1 = require("../user/user.service");
const mm = "💚 💚 💚 VehicleService  💚 ";
let VehicleService = class VehicleService {
    constructor(storage, associationService, userService, errorHandler, vehicleModel, dispatchRecordModel, vehicleArrivalModel, vehicleHeartbeatModel, ambassadorPassengerCountModel, vehicleDepartureModel, associationModel, userModel, assignModel, routeModel, vehicleMediaRequestModel, vehiclePhotoModel, vehicleVideoModel) {
        this.storage = storage;
        this.associationService = associationService;
        this.userService = userService;
        this.errorHandler = errorHandler;
        this.vehicleModel = vehicleModel;
        this.dispatchRecordModel = dispatchRecordModel;
        this.vehicleArrivalModel = vehicleArrivalModel;
        this.vehicleHeartbeatModel = vehicleHeartbeatModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.vehicleDepartureModel = vehicleDepartureModel;
        this.associationModel = associationModel;
        this.userModel = userModel;
        this.assignModel = assignModel;
        this.routeModel = routeModel;
        this.vehicleMediaRequestModel = vehicleMediaRequestModel;
        this.vehiclePhotoModel = vehiclePhotoModel;
        this.vehicleVideoModel = vehicleVideoModel;
    }
    async getAssociationVehicleMediaRequests(associationId, startDate) {
        return this.vehicleMediaRequestModel.find({
            associationId: associationId,
            created: { $gte: startDate },
        });
    }
    async addVehiclePhoto(vehiclePhoto) {
        const mDate = new Date(vehiclePhoto.created);
        vehiclePhoto.mDate = mDate;
        return await this.vehiclePhotoModel.create(vehiclePhoto);
    }
    async getVehicleMediaRequests(vehicleId) {
        return [];
    }
    async addVehicleVideo(vehicleVideo) {
        const mDate = new Date(vehicleVideo.created);
        vehicleVideo.mDate = mDate;
        return await this.vehicleVideoModel.create(vehicleVideo);
    }
    async getVehiclePhotos(vehicleId) {
        const photos = await this.vehiclePhotoModel.find({
            vehicleId: vehicleId,
        });
        common_1.Logger.debug(`${mm} vehicle photos found: ${photos.length}`);
        return photos;
    }
    async getVehicleVideos(vehicleId) {
        return [];
    }
    async findOwnerVehiclesByLocationAndTime(userId, latitude, longitude, minutes) {
        return [];
    }
    async findAssociationVehiclesByLocationAndTime(associationId, latitude, longitude, minutes) {
        return [];
    }
    async generateFakeVehiclesFromFile(associationId) {
        return [];
    }
    async getPoints(route) {
        return [];
    }
    async buildUser(cellphone, lastName, firstName, ass, responses) {
        return null;
    }
    async insertCar(resultVehicles, responses, existingUser, vehicle, result) {
        return null;
    }
    async addVehicle(vehicle) {
        try {
            common_1.Logger.debug(`${mm} ... addVehicle; car ... ${vehicle.vehicleReg}`);
            const existingCar = await this.vehicleModel.findOne({
                vehicleId: vehicle.vehicleId,
            });
            if (existingCar) {
                common_1.Logger.debug(`${mm} ... car exists; will update ...`);
                vehicle.updated = new Date().toISOString();
                const res = await this.vehicleModel.updateOne({
                    vehicleId: vehicle.vehicleId,
                }, vehicle);
                common_1.Logger.debug(`${mm} car updated, result: ${JSON.stringify(res, null, 2)}`);
                return vehicle;
            }
            else {
                common_1.Logger.debug(`${mm} ... creating new car ... ${JSON.stringify(vehicle)}`);
                vehicle.created = new Date().toISOString();
                await this.vehicleModel.create(vehicle);
                return vehicle;
            }
        }
        catch (e) {
            common_1.Logger.debug(`${mm} add car failed: ${e}`);
            this.errorHandler.handleError(`Vehicle add failed: ${e}`, vehicle.associationId, vehicle.associationName);
            throw new common_1.HttpException(`🔴🔴 addVehicle failed ${e} 🔴🔴`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getVehicleBag(vehicleId, startDate) {
        const dispatches = await this.dispatchRecordModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const beats = await this.vehicleHeartbeatModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const counts = await this.ambassadorPassengerCountModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const arrivals = await this.vehicleArrivalModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const deps = await this.vehicleDepartureModel.find({
            vehicleId: vehicleId,
            created: { $gte: startDate },
        });
        const bag = new VehicleBag_1.VehicleBag();
        bag.arrivals = arrivals;
        bag.dispatchRecords = dispatches;
        bag.created = new Date().toISOString();
        bag.departures = deps;
        bag.heartbeats = beats;
        bag.vehicleId = vehicleId;
        bag.passengerCounts = counts;
        return bag;
    }
    async addRouteAssignments(list) {
        common_1.Logger.log(`${mm} ... addRouteAssignments: ${list.assignments}`);
        return await this.assignModel.insertMany(list.assignments);
    }
    async getVehicleRouteAssignments(vehicleId) {
        return this.assignModel.find({ vehicleId: vehicleId });
    }
    async getRouteAssignments(routeId) {
        return this.assignModel.find({ routeId: routeId });
    }
    async generateHeartbeats(associationId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async generateRouteHeartbeats(routeId, numberOfCars, intervalInSeconds) {
        return [];
    }
    async updateVehicle(vehicle) {
        common_1.Logger.debug(`${mm} Update vehicle: ${JSON.stringify(vehicle)}`);
        const del = await this.vehicleModel.deleteOne({
            vehicleId: vehicle.vehicleId,
        });
        common_1.Logger.debug(`${mm} delete result: ${del}`);
        const updateResult = await this.vehicleModel.updateOne(vehicle);
        common_1.Logger.debug(`${mm} Update result: ${updateResult}`);
        return updateResult.matchedCount;
    }
    async getOwnerVehicles(userId, page) {
        return this.vehicleModel.find({ ownerId: userId }).sort({ vehicleReg: 1 });
    }
    async updateVehicleQRCode(vehicle) {
        const url = await this.storage.createQRCode({
            data: JSON.stringify(vehicle),
            prefix: vehicle.vehicleReg.replace(" ", ""),
            size: 2,
            associationId: vehicle.associationId,
        });
        vehicle.qrCodeUrl = url;
        await this.vehicleModel.create(vehicle);
        return 0;
    }
    async uploadQRFile(file, associationId) {
        common_1.Logger.log(`\n\n${mm} uploadQRFile: ... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`);
        common_1.Logger.debug(`${mm} uploadQRFile:... file size: ${file.buffer.length} bytes`);
        let uploadResult = null;
        try {
            const tempFilePath = path.join(os.tmpdir(), file.originalname);
            await fs.promises.writeFile(tempFilePath, file.buffer);
            common_1.Logger.log(`${mm} uploadQRFile: ... 🔵 tempFilePath: ${tempFilePath}`);
            uploadResult = await this.storage.uploadQRCodeFile(associationId, tempFilePath);
        }
        catch (err) {
            common_1.Logger.error(`${mm} 😈😈 Error uploadQRFile: 😈😈 ${err}`);
            this.errorHandler.handleError(err, associationId, "nay");
            throw new common_1.HttpException(`🔴🔴 Error uploadQRFile failed ${err} 🔴🔴`, common_1.HttpStatus.BAD_REQUEST);
        }
        if (uploadResult) {
            common_1.Logger.log(`${mm} return qrcode upload result: ${uploadResult}`);
            return uploadResult;
        }
        else {
            common_1.Logger.error(`${mm} Unexpected error: url is undefined`);
            this.errorHandler.handleError("Unexpected Error: url is undefine", associationId, "nay");
            throw new common_1.HttpException(`🔴🔴 Error uploadQRFile failed 🔴🔴`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(5, (0, mongoose_1.InjectModel)(DispatchRecord_1.DispatchRecord.name)),
    __param(6, (0, mongoose_1.InjectModel)(VehicleArrival_1.VehicleArrival.name)),
    __param(7, (0, mongoose_1.InjectModel)(VehicleHeartbeat_1.VehicleHeartbeat.name)),
    __param(8, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(9, (0, mongoose_1.InjectModel)(VehicleDeparture_1.VehicleDeparture.name)),
    __param(10, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __param(11, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(12, (0, mongoose_1.InjectModel)(RouteAssignment_1.RouteAssignment.name)),
    __param(13, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __param(14, (0, mongoose_1.InjectModel)(VehicleMediaRequest_1.VehicleMediaRequest.name)),
    __param(15, (0, mongoose_1.InjectModel)(VehiclePhoto_1.VehiclePhoto.name)),
    __param(16, (0, mongoose_1.InjectModel)(VehicleVideo_1.VehicleVideo.name)),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService,
        association_service_1.AssociationService,
        user_service_1.UserService,
        errors_interceptor_1.KasieErrorHandler, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], VehicleService);
//# sourceMappingURL=vehicle.service.js.map