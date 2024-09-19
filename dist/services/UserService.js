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
const User_1 = require("../data/models/User");
const fs = require("fs");
const admin = require("firebase-admin");
const my_utils_1 = require("../my-utils/my-utils");
const csv_parser_1 = require("csv-parser");
const crypto_1 = require("crypto");
const Association_1 = require("../data/models/Association");
const UserGeofenceEvent_1 = require("../data/models/UserGeofenceEvent");
const mm = 'UserService';
let UserService = class UserService {
    constructor(userModel, userGeofenceModel, associationModel) {
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
        console.log(`🟢🟢 create user: ${JSON.stringify(user)}`);
        const firebaseAuth = admin.auth();
        console.log('🟢🟢 createRequest  .... ');
        const storedPassword = user.password;
        try {
            let email = '';
            if (!user.email) {
                const name = `${user.firstName} ${user.lastName}`;
                const mName = name.replace(' ', '').toLowerCase();
                email = `${mName}${Date.now()}@kasietransie.com`;
                user.email = email;
                console.log(`🟢🟢 createUserAsync  .... email: ${email}`);
            }
            else {
                email = user.email;
            }
            const userRecord = await firebaseAuth.createUser({
                email: email,
                emailVerified: false,
                phoneNumber: user.cellphone,
                password: user.password,
                displayName: `${user.firstName} ${user.lastName}`,
                disabled: false,
            });
            console.log(`🟢🟢 userRecord from Firebase : ${userRecord.email}`);
            if (userRecord.uid) {
                const uid = userRecord.uid;
                user.userId = uid;
                const url = await my_utils_1.MyUtils.createQRCodeAndUploadToCloudStorage(JSON.stringify(user), `${user.firstName}_${user.lastName}`.replace(' ', ''), 1);
                user.password = null;
                user.qrCodeUrl = url;
                const mUser = await this.userModel.create(user);
                user.password = storedPassword;
                common_1.Logger.log('🟢🟢 KasieTransie user created. ');
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
    __param(0, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserGeofenceEvent_1.UserGeofenceEvent.name)),
    __param(2, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], UserService);
//# sourceMappingURL=UserService.js.map