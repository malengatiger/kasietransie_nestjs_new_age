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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_1 = require("../../data/models/User");
const fs = require("fs");
const csv_parser_1 = require("csv-parser");
const crypto_1 = require("crypto");
const Association_1 = require("../../data/models/Association");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const storage_service_1 = require("../../storage/storage.service");
const constants_1 = require("../../my-utils/constants");
const firebase_util_1 = require("../../services/firebase_util");
const mm = '🟢 🟢 UserService 🟢';
let UserService = class UserService {
    constructor(storage, firebaseAdmin, userModel, userGeofenceModel, associationModel) {
        this.storage = storage;
        this.firebaseAdmin = firebaseAdmin;
        this.userModel = userModel;
        this.userGeofenceModel = userGeofenceModel;
        this.associationModel = associationModel;
    }
    convertExpressFileToString(expressFile) {
        const buffer = fs.readFileSync(expressFile.path);
        const fileString = buffer.toString('utf-8');
        return fileString;
    }
    async createUser(user) {
        const storedPassword = user.password;
        const app = this.firebaseAdmin.getFirebaseApp();
        console.log(`\n\n${mm} create user: ${JSON.stringify(user)} on app: ${JSON.stringify(app.options)}\n`);
        try {
            let email = '';
            if (!user.email) {
                const name = `${user.firstName} ${user.lastName}`;
                const mName = name.replace(' ', '').toLowerCase();
                email = `${mName}_${new Date().getTime()}@kasietransie.com`;
                user.email = email;
            }
            else {
                email = user.email;
            }
            console.log(`${mm} createUserAsync  .... 🎽 email: ${email}`);
            const userRecord = await app.auth().createUser({
                email,
                password: user.password,
                displayName: `${user.firstName} ${user.lastName}`,
            });
            console.log(`${mm} auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`);
            if (userRecord.uid) {
                const uid = userRecord.uid;
                user.userId = uid;
                const url = await this.storage.createQRCode({
                    data: JSON.stringify(user),
                    prefix: constants_1.Constants.qrcode_user,
                    size: 1,
                    associationId: user.associationName,
                });
                user.password = null;
                user.qrCodeUrl = url;
                const mUser = await this.userModel.create(user);
                user.password = storedPassword;
                await app.auth().setCustomUserClaims(uid, {});
                common_1.Logger.log(`\n\n${mm} KasieTransie user created. 🥬🥬🥬 ${JSON.stringify(mUser)} 🥬\n\n`);
            }
            else {
                throw new Error('userRecord.uid == null. We have a problem with Firebase, Jack!');
            }
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return user;
    }
    async updateUser(user) {
        return null;
    }
    async importUsersFromJSON(file, associationId) {
        const ass = await this.associationModel.findOne({
            associationId: associationId,
        });
        const users = [];
        try {
            const jsonData = fs.readFileSync(file.path, 'utf-8');
            const jsonUsers = JSON.parse(jsonData);
            jsonUsers.forEach(async (data) => {
                const user = await this.buildUser(data, ass);
                users.push(user);
            });
            const mUsers = [];
            users.forEach(async (user) => {
                const u = await this.createUser(user);
                mUsers.push(u);
            });
            common_1.Logger.log(`${mUsers.length} users added`);
        }
        catch (error) {
            console.error('Failed to parse JSON string:', error);
        }
        return users;
    }
    async importUsersFromCSV(file, associationId) {
        const ass = await this.associationModel.findOne({
            associationId: associationId,
        });
        const users = [];
        const mUsers = [];
        fs.createReadStream(file.path)
            .pipe((0, csv_parser_1.default)())
            .on('data', async (data) => {
            const user = await this.buildUser(data, ass);
            users.push(user);
        })
            .on('end', () => {
            users.forEach(async (user) => {
                const u = await this.createUser(user);
                mUsers.push(u);
            });
        });
        common_1.Logger.log(`${mUsers.length} users added`);
        return mUsers;
    }
    async buildUser(data, ass) {
        const u = {
            userType: data.userType,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            cellphone: data.cellphone,
            userId: null,
            gender: null,
            countryId: ass.countryId,
            associationId: ass.associationId,
            associationName: ass.associationName,
            fcmToken: '',
            password: crypto_1.randomUUID.toString(),
            countryName: ass.countryName,
            dateRegistered: '',
            qrCodeUrl: null,
            profileUrl: null,
            profileThumbnail: null,
            _partitionKey: null,
            _id: null,
        };
        return u;
    }
    async getUserById(userId) {
        const user = await this.userModel.findOne({ userId: userId });
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }
    async addUserGeofenceEvent(userGeofenceEvent) {
        return await this.userGeofenceModel.create(userGeofenceEvent);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(3, (0, mongoose_1.InjectModel)(UserGeofenceEvent_1.UserGeofenceEvent.name)),
    __param(4, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService,
        firebase_util_1.FirebaseAdmin, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], UserService);
//# sourceMappingURL=user.service.js.map