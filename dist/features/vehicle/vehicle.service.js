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
const crypto_1 = require("crypto");
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
const csv_1 = require("csv");
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
        return await this.vehicleMediaRequestModel.find({
            associationId: associationId,
            startDate: startDate,
        });
    }
    async addVehiclePhoto(vehiclePhoto) {
        return await this.vehiclePhotoModel.create(vehiclePhoto);
    }
    async getVehicleMediaRequests(vehicleId) {
        return [];
    }
    async addVehicleVideo(vehicleVideo) {
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
            if (vehicle.ownerName != null) {
                common_1.Logger.debug(`${mm} ... checking owner ... create if none.`);
                const userCount = await this.createOwnerIfNotExists(vehicle);
                common_1.Logger.debug(`${mm} fresh new owner created: ${userCount} `);
            }
            const existingCar = await this.vehicleModel.findOne({
                vehicleId: vehicle.vehicleId,
            });
            if (existingCar) {
                common_1.Logger.debug(`${mm} ... car exists; will update ...`);
                vehicle.updated = new Date().toISOString();
                const res = await this.vehicleModel.updateOne({
                    vehicleId: vehicle.vehicleId,
                }, vehicle);
                common_1.Logger.debug(`$mm car updated, result: ${JSON.stringify(res)}`);
                return vehicle;
            }
            else {
                common_1.Logger.debug(`${mm} creating new vehicle ...`);
                vehicle.vehicleId = (0, crypto_1.randomUUID)();
                vehicle.created = new Date().toISOString();
                const url = await this.storage.createQRCode({
                    data: JSON.stringify(vehicle),
                    prefix: vehicle.vehicleReg.replaceAll(" ", ""),
                    size: 2,
                    associationId: vehicle.associationId,
                });
                vehicle.qrCodeUrl = url;
                return await this.vehicleModel.create(vehicle);
            }
        }
        catch (e) {
            common_1.Logger.debug(`${mm} add car failed: ${e}`);
            this.errorHandler.handleError(`Vehicle add failed: ${e}`, vehicle.associationId);
            throw new common_1.HttpException(`🔴🔴 ${e} 🔴🔴`, common_1.HttpStatus.BAD_REQUEST);
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
        return await this.vehicleModel.create(vehicle);
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
    async addCarsToDatabase(cars) {
        common_1.Logger.log(`${mm} ... addCarsToDatabase: ${cars.length}`);
        const errors = [];
        const uList = [];
        for (const mCar of cars) {
            try {
                const c = await this.vehicleModel.create(mCar);
                uList.push(c);
                common_1.Logger.log(`${mm} car added to Atlas: 🍎 ${JSON.stringify(c, null, 2)}\n`);
            }
            catch (e) {
                errors.push(mCar);
                common_1.Logger.error(`${mm} 😈 👿 error adding car: ${mCar.vehicleReg} to Atlas: ${e} 😈 👿\n`);
            }
        }
        common_1.Logger.log(`${mm}  🍎🍎🍎🍎 ${uList.length} cars added to Atlas 🍎🍎 🥬 🥬\n`);
        common_1.Logger.log(`${mm} 😈 👿 errors encountered adding cars to Atlas: ${errors.length} 😈 👿`);
        return { cars: uList, errors: errors };
    }
    async importVehiclesFromCSV(file, associationId) {
        common_1.Logger.log(`\n\n${mm} importVehiclesFromCSV: ... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`);
        common_1.Logger.debug(`${mm} importVehiclesFromCSV:... file size: ${file.buffer.length} bytes`);
        const list = await this.associationModel.find({
            associationId: associationId,
        });
        if (list.length == 0) {
            throw new Error("Association not found");
        }
        const ass = list[0];
        common_1.Logger.log(`${mm} importVehiclesFromCSV:... association: 🔵 ${JSON.stringify(ass, null, 2)} 🔵\n\n`);
        const cars = [];
        common_1.Logger.log(`${mm} importVehiclesFromCSV:... 🔵 read csv file: ${file.originalname}`);
        let response;
        const tempFilePath = path.join(os.tmpdir(), file.originalname);
        common_1.Logger.log(`${mm} importVehiclesFromCSV:... 🔵 tempFilePath: ${tempFilePath}`);
        const carList = [];
        try {
            let index = 0;
            await fs.promises.writeFile(tempFilePath, file.buffer);
            response = await new Promise((resolve, reject) => {
                fs.createReadStream(tempFilePath)
                    .pipe((0, csv_1.parse)())
                    .on("data", async (data) => {
                    if (index > 0) {
                        carList.push(data);
                    }
                    index++;
                })
                    .on("error", (err) => {
                    reject(new Error(`Error processing vehicles CSV file: ${err}`));
                })
                    .on("end", async () => {
                    common_1.Logger.debug(`${mm} CSV parsing completed ......`);
                    common_1.Logger.log(`${mm} Save the parsed cars to the database`);
                    const result = await this.handleExtractedCars(carList, cars, ass);
                    await fs.promises.unlink(tempFilePath);
                    resolve(result);
                });
            });
        }
        catch (err) {
            common_1.Logger.error(`${mm} 😈😈 Error processing vehicles CSV file: 😈😈 ${err}`);
            this.errorHandler.handleError(err, ass.associationId);
        }
        if (response) {
            common_1.Logger.log(`${mm} return response: ${JSON.stringify(response, null, 2)}`);
            return response;
        }
        else {
            common_1.Logger.error(`${mm} Unexpected error: response is undefined`);
            this.errorHandler.handleError("Unexpected Error", ass.associationId);
        }
    }
    async handleExtractedCars(carList, cars, ass) {
        common_1.Logger.debug(`${mm} handleExtractedCars: 🔷 ${carList.length} cars`);
        let userCount = 0;
        for (const mCar of carList) {
            const car = await this.buildCar(mCar, ass);
            userCount += await this.createOwnerIfNotExists(car);
            cars.push(car);
        }
        common_1.Logger.debug(`\n\n${mm} handleExtractedCars: 🔷 ${userCount} 🔷 owners have been added to Atlas`);
        common_1.Logger.debug(`${mm} handleExtractedCars: 🔷 ${cars.length} 🔷 cars to be added to Atlas`);
        const response = await this.addCarsToDatabase(cars);
        return response;
    }
    async buildCar(data, ass) {
        common_1.Logger.debug(`\n${mm} buildCar, data: check for vehicleReg in csv data:\n ${JSON.stringify(data)}\n`);
        common_1.Logger.debug(`${mm} buildCar, association: ${JSON.stringify(ass.associationName)}`);
        const myCar = new Vehicle_1.Vehicle();
        myCar.vehicleId = (0, crypto_1.randomUUID)().trim();
        myCar.ownerName = data[0];
        myCar.vehicleReg = data[1];
        myCar.model = data[2];
        myCar.make = data[3];
        myCar.year = data[4];
        myCar.passengerCapacity = parseInt(data[5]);
        myCar.associationId = ass.associationId;
        myCar.associationName = ass.associationName;
        myCar.active = 0;
        myCar.created = new Date().toISOString();
        const url = await this.storage.createQRCode({
            data: JSON.stringify(myCar),
            prefix: "car",
            size: 2,
            associationId: ass.associationName,
        });
        myCar.qrCodeUrl = url;
        common_1.Logger.debug(`\n${mm} buildCar:... 🔵 vehicle built: ${JSON.stringify(myCar, null, 2)} 🔵\n\n`);
        return myCar;
    }
    async createOwnerIfNotExists(car) {
        common_1.Logger.debug(`\n${mm} handleOwner: for car: 🔵 ${car.vehicleReg}`);
        const nameParts = car.ownerName.split(" ");
        const firstName = nameParts.slice(0, -1).join(" ");
        const lastName = nameParts[nameParts.length - 1];
        common_1.Logger.debug(`\n${mm} handleOwner: firstName: ${firstName} lastName: ${lastName}`);
        const user = await this.userService.getUserByName(firstName, lastName);
        try {
            if (user == null) {
                const mUser = await this.userService.createOwner(car);
                car.ownerId = mUser.userId;
                car.ownerName = mUser.firstName + " " + mUser.lastName;
                common_1.Logger.debug(`\n\n${mm} new owner created! 🍎 🍎 ${JSON.stringify(mUser, null, 2)} 🍎 🍎\n\n`);
                return 1;
            }
        }
        catch (e) {
            return 0;
        }
        common_1.Logger.debug(`${mm} owner exists already!  🔵 🔵 ${user.firstName} ${user.lastName}`);
        car.ownerId = user.userId;
        return 0;
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