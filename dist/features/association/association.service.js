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
exports.AssociationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Association_1 = require("../../data/models/Association");
const SettingsModel_1 = require("../../data/models/SettingsModel");
const ExampleFile_1 = require("../../data/models/ExampleFile");
const RegistrationBag_1 = require("../../data/models/RegistrationBag");
const User_1 = require("../../data/models/User");
const AppError_1 = require("../../data/models/AppError");
const fs = require("fs");
const path = require("path");
const firebase_admin_1 = require("firebase-admin");
const Vehicle_1 = require("../../data/models/Vehicle");
const zipper_1 = require("../../my-utils/zipper");
const Country_1 = require("../../data/models/Country");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const fcm_service_1 = require("../fcm/fcm.service");
const city_service_1 = require("../city/city.service");
const user_service_1 = require("../user/user.service");
const uuid_1 = require("uuid");
const Commuter_1 = require("../../data/models/Commuter");
const constants_1 = require("../../my-utils/constants");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const VehiclePhoto_1 = require("../../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../../data/models/VehicleVideo");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
const VehicleArrival_1 = require("../../data/models/VehicleArrival");
const Trip_1 = require("../../data/models/Trip");
const CommuterCashPayment_1 = require("../../data/models/CommuterCashPayment");
const CommuterCashCheckIn_1 = require("../../data/models/CommuterCashCheckIn");
const RankFeeCashCheckIn_1 = require("../../data/models/RankFeeCashCheckIn");
const RankFeeCashPayment_1 = require("../../data/models/RankFeeCashPayment");
const VehicleTelemetry_1 = require("../../data/models/VehicleTelemetry");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const Route_1 = require("../../data/models/Route");
const mm = "🍎🍎🍎 AssociationService: 🍎🍎🍎";
let AssociationService = class AssociationService {
    constructor(archiveService, userService, cityService, messagingService, errorHandler, associationModel, vehicleModel, settingsModel, userModel, countryModel, associationTokenModel, appErrorModel, vehiclePhotoModel, vehicleVideoModel, exampleFileModel, commuterModel, dispatchRecordModel, tripModel, commuterCashPaymentModel, commuterCashCheckInModel, rankFeeCashCheckInModel, rankFeeCashPaymentModel, commuterRequestModel, vehicleTelemetryModel, ambassadorPassengerCountModel, routeModel, vehicleArrivalModel) {
        this.archiveService = archiveService;
        this.userService = userService;
        this.cityService = cityService;
        this.messagingService = messagingService;
        this.errorHandler = errorHandler;
        this.associationModel = associationModel;
        this.vehicleModel = vehicleModel;
        this.settingsModel = settingsModel;
        this.userModel = userModel;
        this.countryModel = countryModel;
        this.associationTokenModel = associationTokenModel;
        this.appErrorModel = appErrorModel;
        this.vehiclePhotoModel = vehiclePhotoModel;
        this.vehicleVideoModel = vehicleVideoModel;
        this.exampleFileModel = exampleFileModel;
        this.commuterModel = commuterModel;
        this.dispatchRecordModel = dispatchRecordModel;
        this.tripModel = tripModel;
        this.commuterCashPaymentModel = commuterCashPaymentModel;
        this.commuterCashCheckInModel = commuterCashCheckInModel;
        this.rankFeeCashCheckInModel = rankFeeCashCheckInModel;
        this.rankFeeCashPaymentModel = rankFeeCashPaymentModel;
        this.commuterRequestModel = commuterRequestModel;
        this.vehicleTelemetryModel = vehicleTelemetryModel;
        this.ambassadorPassengerCountModel = ambassadorPassengerCountModel;
        this.routeModel = routeModel;
        this.vehicleArrivalModel = vehicleArrivalModel;
    }
    async sendToDevice(fcmToken, passengerCount) {
        const m = await this.messagingService.sendToDevice(fcmToken, 'PassengerCount', 'Passengers counted', constants_1.Constants.passengerCount, JSON.stringify(passengerCount));
    }
    async getAssociationVehicleDepartures(associationId, startDate, endDate) {
        return [];
    }
    async getAssociationDispatchRecords(associationId, startDate, endDate) {
        const res = await this.dispatchRecordModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationVehicleArrivals(associationId, startDate, endDate) {
        const res = await this.vehicleArrivalModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationVehicleTelemetry(associationId, startDate, endDate) {
        const res = await this.vehicleTelemetryModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationCommuterRequests(associationId, startDate, endDate) {
        const res = await this.commuterRequestModel.find({
            associationId: associationId,
            dateRequested: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationCommuterCashPayments(associationId, startDate, endDate) {
        const res = await this.commuterCashPaymentModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationCommuterCashCheckIns(associationId, startDate, endDate) {
        const res = await this.commuterCashCheckInModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationRankFeeCashPayments(associationId, startDate, endDate) {
        const res = await this.rankFeeCashPaymentModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationRankFeeCashCheckIns(associationId, startDate, endDate) {
        const res = await this.rankFeeCashCheckInModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationTrips(associationId, startDate, endDate) {
        const res = await this.tripModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationPassengerCounts(associationId, startDate, endDate) {
        const res = await this.ambassadorPassengerCountModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
        return res;
    }
    async getAssociationRoutes(associationId) {
        const res = await this.routeModel.find({
            associationId: associationId,
        });
        return res;
    }
    async getAssociationById(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationById starting, id: ${associationId} ...`);
        const list = await this.associationModel
            .find({
            associationId: associationId,
        })
            .limit(1);
        common_1.Logger.log(`${mm} ... getAssociationById found: ${list.length} ...`);
        if (list.length > 0) {
            return list[0];
        }
        throw new Error(`Association not found; associationId: ${associationId}`);
    }
    async resetAssociationData(associationId) {
        const res1 = await this.userModel.deleteMany({});
        const res2 = await this.vehicleModel.deleteMany({});
        common_1.Logger.log(`${mm} delete users: ${JSON.stringify(res1)}`);
        common_1.Logger.log(`${mm} delete vehicles: ${JSON.stringify(res2)}`);
        return {
            users: res1,
            vehicles: res2,
        };
    }
    async getAssociations() {
        common_1.Logger.log(`${mm} ... getAssociations starting ...`);
        const list = await this.associationModel.find({});
        common_1.Logger.log(`${mm} ... getAssociations found: ${list.length} ...`);
        return list;
    }
    async getAssociationUsers(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationUsers starting, id: ${associationId} ...`);
        const list = await this.userModel.find({
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} ... getAssociationUsers found: ${list.length} ...`);
        return list;
    }
    async getAssociationVehicles(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationVehicles starting, id: ${associationId} ...`);
        const list = await this.vehicleModel.find({
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
        return list;
    }
    async getAssociationVehiclesZippedFile(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationVehicles starting, id: ${associationId} ...`);
        const list = await this.getAssociationVehicles(associationId);
        const json = JSON.stringify(list);
        const file = await this.archiveService.zip([{ contentString: json }]);
        common_1.Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
        return file;
    }
    async getOwnerVehiclesZippedFile(userId) {
        const list = await this.vehicleModel.find({ ownerId: userId });
        const json = JSON.stringify(list);
        const file = await this.archiveService.zip([{ contentString: json }]);
        common_1.Logger.log(`${mm} ... getOwnerVehiclesZippedFile found: ${list.length} ...`);
        return file;
    }
    async getAssociationSettingsModels(associationId) {
        common_1.Logger.debug(`${mm} getAssociationSettingsModels AssociationId: ${JSON.stringify(associationId)}`);
        const list = await this.settingsModel.find({
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} ... getAssociationSettingsModels found: ${list.length} ...`);
        return list;
    }
    async getAllSettingsModels() {
        const list = await this.settingsModel.find({});
        common_1.Logger.log(`${mm} ... getAllSettingsModels found: ${list.length} ...`);
        return list;
    }
    async downloadExampleVehiclesFile() {
        return null;
    }
    async downloadExampleUserCSVFile() {
        common_1.Logger.log(`${mm} .... downloadExampleUserCSVFile ...................`);
        const fileName = `users.csv`;
        return this.downloadFileFromStorage(fileName);
    }
    async downloadExampleUserJSONFile() {
        common_1.Logger.log(`${mm} .... downloadExampleUserJSONFile ...................`);
        const fileName = `users.json`;
        return this.downloadFileFromStorage(fileName);
    }
    async downloadExampleVehicleCSVFile() {
        common_1.Logger.log(`${mm} .... downloadExampleVehicleCSVFile ...................`);
        const fileName = `vehicles.csv`;
        return this.downloadFileFromStorage(fileName);
    }
    async downloadExampleVehicleJSONFile() {
        common_1.Logger.log(`${mm} .... downloadExampleVehicleJSONFile ...................`);
        const fileName = `vehicles.json`;
        return this.downloadFileFromStorage(fileName);
    }
    async downloadFileFromStorage(fileName) {
        const tempDir = path.join(__dirname, "..", "tempFiles");
        const tempFilePath = path.join(tempDir, fileName);
        const storage = firebase_admin_1.default.storage();
        const folder = process.env.BUCKET_FOLDER;
        try {
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            const csFile = storage.bucket().file(`${folder}/${fileName}`);
            common_1.Logger.log(`${mm} Downloading file, csFile: ${csFile.cloudStorageURI} tempFilePath: ${tempFilePath} .....`);
            const contents = await csFile.download();
            const fileContent = contents[0];
            common_1.Logger.log(`${mm} ${fileContent}  🔵🔵🔵 fileContent.byteLength: ${fileContent.byteLength}`);
            const writeStream = fs.createWriteStream(tempFilePath);
            writeStream.write(fileContent);
            writeStream.end();
            common_1.Logger.log(`${mm} x marks the spot, tempFilePath: ${tempFilePath}`);
            return tempFilePath;
        }
        catch (error) {
            common_1.Logger.log(`${mm} Error downloading file: ${error}`);
            throw new Error("Failed to download file");
        }
    }
    generateUniqueId() {
        const uuid = (0, uuid_1.v4)();
        console.log(`UUID: ${uuid}`);
        return uuid;
    }
    async registerAssociation(association) {
        const associationId = this.generateUniqueId();
        common_1.Logger.log(`\n\n${mm} registerAssociation ... id: ${associationId}`);
        const existingAss = await this.associationModel.findOne({
            associationName: association.associationName,
        });
        if (existingAss) {
            common_1.Logger.debug(`${mm} existingAss Association: ${JSON.stringify(existingAss, null, 2)}`);
            this.errorHandler.handleError("Association exists", association.associationId, association.associationName);
            throw new common_1.HttpException("This association exists, so fuck you!", common_1.HttpStatus.BAD_REQUEST);
        }
        let mAdminUser;
        let mCarUser;
        let myAss;
        let mSettings;
        try {
            const date = new Date().toISOString();
            const adminUser = new User_1.User();
            adminUser.firstName = `admin`;
            adminUser.lastName = `admin${associationId}`;
            adminUser.countryId = association.countryId;
            adminUser.countryName = association.countryName;
            adminUser.associationId = associationId;
            adminUser.associationName = association.associationName;
            adminUser.email = `admin${associationId}${constants_1.Constants.associationEmailSuffix}`;
            adminUser.dateRegistered = date;
            adminUser.password = `${constants_1.Constants.associationPasswordPrefix}${associationId}`;
            adminUser.userType = constants_1.Constants.ADMINISTRATOR_ASSOCIATION;
            mAdminUser = await this.userService.createUser(adminUser);
            const carUser = new User_1.User();
            carUser.firstName = `vehicle`;
            carUser.lastName = `vehicle${associationId}`;
            carUser.email = `car${associationId}${constants_1.Constants.associationEmailSuffix}`;
            carUser.countryId = association.countryId;
            carUser.countryName = association.countryName;
            carUser.associationId = associationId;
            carUser.associationName = association.associationName;
            carUser.dateRegistered = date;
            carUser.password = `${constants_1.Constants.associationPasswordPrefix}${associationId}`;
            carUser.userType = constants_1.Constants.ASSOCIATION_CAR;
            mCarUser = await this.userService.createUser(carUser);
            const ass = new Association_1.Association();
            ass.associationName = association.associationName;
            ass.associationId = associationId;
            ass.countryId = association.countryId;
            ass.countryName = association.countryName;
            ass.dateRegistered = date;
            ass.adminUser = mAdminUser;
            ass.carUser = mCarUser;
            if (ass.countryId) {
                const country = await this.countryModel.find({
                    countryId: ass.countryId,
                });
                if (country.length > 0) {
                    ass.countryId = country[0].countryId;
                    ass.countryName = country[0].name;
                }
            }
            common_1.Logger.log(`\n${mm} send association to Atlas ...`);
            const existingAss = await this.associationModel.findOne({
                associationName: ass.associationName,
            });
            if (existingAss) {
                throw new Error("Association already here");
            }
            myAss = await this.associationModel.create(ass);
            const settings = new SettingsModel_1.SettingsModel();
            settings.created = date;
            settings.associationId = associationId;
            settings.commuterGeoQueryRadius = 50;
            settings.commuterGeofenceRadius = 200;
            settings.commuterSearchMinutes = 30;
            settings.distanceFilter = 25;
            settings.geofenceRadius = 200;
            settings.heartbeatIntervalSeconds = 600;
            settings.locale = "en";
            settings.loiteringDelay = 60;
            settings.refreshRateInSeconds = 600;
            settings.themeIndex = 0;
            settings.vehicleGeoQueryRadius = 100;
            settings.vehicleSearchMinutes = 30;
            const files = await this.getExampleFiles();
            common_1.Logger.log(`\n${mm} send settings to Atlas ...`);
            mSettings = await this.settingsModel.create(settings);
            const bag = new RegistrationBag_1.RegistrationBag();
            bag.association = myAss;
            bag.settings = mSettings;
            bag.adminUser = mAdminUser;
            bag.exampleFiles = files;
            bag.carUser = mCarUser;
            await this.messagingService.sendAssociationRegisteredMessage(ass);
            common_1.Logger.log(`\n${mm} 🥬 association registered successfully!! : 🥬 🥬 🥬 ${JSON.stringify(bag, null, 2)} 🥬 \n\n`);
            return bag;
        }
        catch (e) {
            if (mAdminUser) {
                await this.userService.deleteUser(mAdminUser.userId);
                await this.userModel.deleteOne({ userId: mAdminUser.userId });
                common_1.Logger.debug(`${mm} 😈😈😈 admin user deleted: ${JSON.stringify(mAdminUser, null, 2)}`);
            }
            if (mCarUser) {
                await this.userService.deleteUser(mCarUser.userId);
                await this.userModel.deleteOne({ userId: mCarUser.userId });
                common_1.Logger.debug(`${mm} 😈😈😈 car user deleted: ${JSON.stringify(mCarUser, null, 2)}`);
            }
            if (myAss) {
                await this.associationModel.deleteOne({
                    associationId: myAss.associationId,
                });
                common_1.Logger.debug(`${mm} 😈😈😈 ass deleted: ${JSON.stringify(myAss, null, 2)}`);
            }
            this.errorHandler.handleError(e, association.associationId, association.associationName);
            throw new common_1.HttpException(`Registration failed: ${JSON.stringify(e)}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addSettingsModel(model) {
        common_1.Logger.log(`adding addSettingsModel${model}`);
        return await this.settingsModel.create(model);
    }
    async addAssociationToken(associationId, userId, token) {
        const res = await this.associationTokenModel.deleteMany({ associationId: associationId });
        common_1.Logger.debug(`${mm} addAssociationToken... deleted tokens: ${res}`);
        const at = new AssociationToken_1.AssociationToken();
        at.associationId = associationId;
        at.userId = userId;
        at.token = token;
        at.created = new Date().toISOString();
        var res2 = await this.associationTokenModel.create(at);
        common_1.Logger.debug(`${mm} addAssociationToken... association token added to Atlas: ${res2}`);
        return res2;
    }
    async getAssociationTokens(associationId) {
        const toks = await this.associationTokenModel.find({
            associationId: associationId,
        });
        common_1.Logger.debug(`${mm} association tokens: ${toks.length}`);
        return toks;
    }
    async getAssociationAppErrors(associationId, startDate, endDate) {
        return this.appErrorModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
    }
    async getRandomCommuters(limit) {
        return this.commuterModel.find({ limit });
    }
    async getAppErrors(startDate) {
        return this.appErrorModel.find({
            created: { $gte: startDate },
        });
    }
    async getExampleFiles() {
        return this.exampleFileModel.find({});
    }
    async upLoadExampleFiles() {
        return [];
    }
    getFakeEmail() {
        const name = "fake admin";
        const mName = name.replace(" ", "").toLowerCase();
        return `${mName}_${new Date().getTime()}@kasietransie.com`;
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    getFakeCellphoneNumber() {
        const arr = [];
        arr.push("+2765");
        for (let i = 0; i < 7; i++) {
            const x = this.randomIntFromInterval(0, 9);
            arr.push(x);
        }
        return arr.join("");
    }
};
exports.AssociationService = AssociationService;
exports.AssociationService = AssociationService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __param(6, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(7, (0, mongoose_1.InjectModel)(SettingsModel_1.SettingsModel.name)),
    __param(8, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(9, (0, mongoose_1.InjectModel)(Country_1.Country.name)),
    __param(10, (0, mongoose_1.InjectModel)(AssociationToken_1.AssociationToken.name)),
    __param(11, (0, mongoose_1.InjectModel)(AppError_1.AppError.name)),
    __param(12, (0, mongoose_1.InjectModel)(VehiclePhoto_1.VehiclePhoto.name)),
    __param(13, (0, mongoose_1.InjectModel)(VehicleVideo_1.VehicleVideo.name)),
    __param(14, (0, mongoose_1.InjectModel)(ExampleFile_1.ExampleFile.name)),
    __param(15, (0, mongoose_1.InjectModel)(Commuter_1.Commuter.name)),
    __param(16, (0, mongoose_1.InjectModel)(DispatchRecord_1.DispatchRecord.name)),
    __param(17, (0, mongoose_1.InjectModel)(Trip_1.Trip.name)),
    __param(18, (0, mongoose_1.InjectModel)(CommuterCashPayment_1.CommuterCashPayment.name)),
    __param(19, (0, mongoose_1.InjectModel)(CommuterCashCheckIn_1.CommuterCashCheckIn.name)),
    __param(20, (0, mongoose_1.InjectModel)(RankFeeCashCheckIn_1.RankFeeCashCheckIn.name)),
    __param(21, (0, mongoose_1.InjectModel)(RankFeeCashPayment_1.RankFeeCashPayment.name)),
    __param(22, (0, mongoose_1.InjectModel)(CommuterRequest_1.CommuterRequest.name)),
    __param(23, (0, mongoose_1.InjectModel)(VehicleTelemetry_1.VehicleTelemetry.name)),
    __param(24, (0, mongoose_1.InjectModel)(AmbassadorPassengerCount_1.AmbassadorPassengerCount.name)),
    __param(25, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __param(26, (0, mongoose_1.InjectModel)(VehicleArrival_1.VehicleArrival.name)),
    __metadata("design:paramtypes", [zipper_1.FileArchiverService,
        user_service_1.UserService,
        city_service_1.CityService,
        fcm_service_1.MessagingService,
        errors_interceptor_1.KasieErrorHandler, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], AssociationService);
//# sourceMappingURL=association.service.js.map