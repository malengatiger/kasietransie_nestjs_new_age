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
const config_1 = require("@nestjs/config");
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
const new_mongo_service_1 = require("../../data/new_mongo_service");
const AssociationToken_1 = require("../../data/models/AssociationToken");
const Commuter_1 = require("../../data/models/Commuter");
const fcm_service_1 = require("../fcm/fcm.service");
const city_service_1 = require("../city/city.service");
const user_service_1 = require("../user/user.service");
const mm = "🍎🍎🍎 AssociationService: 🍎🍎🍎";
let AssociationService = class AssociationService {
    constructor(configService, archiveService, userService, cityService, messagingService, mongoService, userModel, commuterModel, appErrorModel, associationModel, exampleFileModel, vehicleModel, countryModel, associationTokenModel, settingsModel) {
        this.configService = configService;
        this.archiveService = archiveService;
        this.userService = userService;
        this.cityService = cityService;
        this.messagingService = messagingService;
        this.mongoService = mongoService;
        this.userModel = userModel;
        this.commuterModel = commuterModel;
        this.appErrorModel = appErrorModel;
        this.associationModel = associationModel;
        this.exampleFileModel = exampleFileModel;
        this.vehicleModel = vehicleModel;
        this.countryModel = countryModel;
        this.associationTokenModel = associationTokenModel;
        this.settingsModel = settingsModel;
    }
    async getAssociations() {
        common_1.Logger.log(`${mm} ... getAssociations starting ...`);
        const list = await this.mongoService.find("Association", {});
        common_1.Logger.log(`${mm} ... getAssociations found: ${list.length} ...`);
        return list;
    }
    async getAssociationUsers(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationUsers starting, id: ${associationId} ...`);
        const list = await this.mongoService.find("User", {
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} ... getAssociationUsers found: ${list.length} ...`);
        return list;
    }
    async getAssociationVehicles(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationVehicles starting, id: ${associationId} ...`);
        const list = await this.mongoService.find("Vehicle", {
            associationId: associationId,
        });
        common_1.Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
        return list;
    }
    async getAssociationVehiclesZippedFile(associationId) {
        common_1.Logger.log(`${mm} ... getAssociationVehicles starting, id: ${associationId} ...`);
        const list = await this.getAssociationVehicles(associationId);
        const json = JSON.stringify(list);
        const file = await this.archiveService.zip([{ content: json }]);
        common_1.Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
        return file;
    }
    async getOwnerVehiclesZippedFile(userId) {
        const list = await this.vehicleModel.find({ ownerId: userId });
        const json = JSON.stringify(list);
        const file = await this.archiveService.zip([{ content: json }]);
        common_1.Logger.log(`${mm} ... getOwnerVehiclesZippedFile found: ${list.length} ...`);
        return file;
    }
    async getCountryCitiesZippedFile(countryId) {
        common_1.Logger.log(`${mm} ... getCountryCitiesZippedFile starting, id: ${countryId} ...`);
        const list = await this.cityService.getCountryCities(countryId);
        const json = JSON.stringify(list);
        const file = await this.archiveService.zip([{ content: json }]);
        common_1.Logger.log(`${mm} ... getCountryCitiesZippedFile found: ${list.length} ...`);
        return file;
    }
    async getAssociationById(associationId) {
        const m = await this.mongoService.find("Association", {
            associationId: associationId,
        });
    }
    async getCountries() {
        return await this.mongoService.find("Country", {});
    }
    async getAssociationSettingsModels(associationId) {
        const list = await this.mongoService.find("SettingsModel", {
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
        const timestamp = new Date().getTime();
        const randomString = Math.random().toString(36).substring(2, 6);
        return `${timestamp}_${randomString}`;
    }
    async registerAssociation(association) {
        common_1.Logger.log(`${mm} registerAssociation ...`);
        const u = new User_1.User();
        u.firstName = association.adminUserFirstName;
        u.lastName = association.adminUserLastName;
        u.email = association.adminEmail;
        u.cellphone = association.adminCellphone;
        u.countryId = association.countryId;
        u.countryName = association.countryName;
        u.dateRegistered = new Date().toISOString();
        const user = await this.userService.createUser(u);
        association.userId = user.userId;
        const ass = new Association_1.Association();
        ass.userId = user.userId;
        ass.associationName = association.associationName;
        ass.associationId = this.generateUniqueId();
        ass.adminUserFirstName = association.adminUserFirstName;
        ass.adminUserLastName = association.adminUserLastName;
        ass.adminEmail = association.adminEmail;
        ass.adminCellphone = association.adminCellphone;
        ass.countryId = association.countryId;
        ass.countryName = association.countryName;
        ass.dateRegistered = new Date().toISOString();
        ass.userId = user.userId;
        const settings = new SettingsModel_1.SettingsModel();
        settings.created = new Date().toISOString();
        settings.associationId = ass.associationId;
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
        const bag = new RegistrationBag_1.RegistrationBag();
        bag.association = ass;
        bag.settings = settings;
        bag.user = user;
        bag.exampleFiles = files;
        if (ass.countryId) {
            const c = await this.mongoService.find("Country", {
                countryId: ass.countryId,
            });
            if (c.length > 0) {
                bag.country = c[0];
            }
        }
        common_1.Logger.log(`${mm} send association and settings to Atlas ...`);
        await this.mongoService.create("SettingsModel", settings);
        await this.mongoService.create("AssociationModel", ass);
        common_1.Logger.log(`${mm} 🥬 association and settings added to Atlas ...`);
        await this.messagingService.sendAssociationRegisteredMessage(ass);
        common_1.Logger.log(`${mm} 🥬 association registered: 🥬 🥬 🥬 ${JSON.stringify(bag, null, 2)} 🥬 `);
        return bag;
    }
    async addSettingsModel(model) {
        common_1.Logger.log(`adding addSettingsModel${model}`);
        return await this.mongoService.create("SettingsModel", model);
    }
    async addAssociationToken(associationId, userId, token) {
        const at = new AssociationToken_1.AssociationToken();
        at.associationId = associationId;
        at.userId = userId;
        at.token = token;
        await this.mongoService.delete("AssociationToken", {
            associationId: associationId,
        });
        return await this.mongoService.create("AssociationToken", at);
    }
    async getAssociationAppErrors(associationId, startDate, endDate) {
        return this.mongoService.find("AppError", {
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
        });
    }
    async getRandomCommuters(limit) {
        return this.mongoService.find("Commuter", {}, limit);
    }
    async getAppErrors(startDate) {
        return this.mongoService.find("AppError", {
            created: { $gte: startDate },
        });
    }
    async generateFakeAssociation(name) {
        common_1.Logger.log(`${mm} generateFakeAssociation ...`);
        const ass = new Association_1.Association();
        ass.associationName = name;
        ass.associationId = this.generateUniqueId();
        ass.adminEmail = this.getFakeEmail();
        ass.adminCellphone = this.getFakeCellphoneNumber();
        ass.adminUserFirstName = "James Earl";
        ass.adminUserLastName = `Jones_${Math.random() * 1000}`;
        ass.dateRegistered = new Date().toISOString();
        ass.countryId = '7a2328bf-915f-4194-82ae-6c220c046cac';
        ass.countryName = 'South Africa';
        const bag = await this.registerAssociation(ass);
        return bag;
    }
    async getExampleFiles() {
        return this.mongoService.find("ExampleFile", {});
    }
    async upLoadExampleFiles(files) {
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
    __param(6, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(7, (0, mongoose_1.InjectModel)(Commuter_1.Commuter.name)),
    __param(8, (0, mongoose_1.InjectModel)(AppError_1.AppError.name)),
    __param(9, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __param(10, (0, mongoose_1.InjectModel)(ExampleFile_1.ExampleFile.name)),
    __param(11, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(12, (0, mongoose_1.InjectModel)(Country_1.Country.name)),
    __param(13, (0, mongoose_1.InjectModel)(AssociationToken_1.AssociationToken.name)),
    __param(14, (0, mongoose_1.InjectModel)(SettingsModel_1.SettingsModel.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        zipper_1.FileArchiverService,
        user_service_1.UserService,
        city_service_1.CityService,
        fcm_service_1.MessagingService,
        new_mongo_service_1.NewMongoService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], AssociationService);
//# sourceMappingURL=association.service.js.map