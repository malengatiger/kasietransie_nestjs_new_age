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
const crypto_1 = require("crypto");
const Association_1 = require("../../data/models/Association");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const storage_service_1 = require("../../storage/storage.service");
const constants_1 = require("../../my-utils/constants");
const firebase_util_1 = require("../../services/firebase_util");
const errors_interceptor_1 = require("../../middleware/errors.interceptor");
const mm = "🏈 🏈 🏈 UserService 🏈 🏈";
let UserService = class UserService {
    constructor(storage, firebaseAdmin, errorHandler, userModel, userGeofenceModel, associationModel) {
        this.storage = storage;
        this.firebaseAdmin = firebaseAdmin;
        this.errorHandler = errorHandler;
        this.userModel = userModel;
        this.userGeofenceModel = userGeofenceModel;
        this.associationModel = associationModel;
    }
    convertExpressFileToString(expressFile) {
        const buffer = fs.readFileSync(expressFile.path);
        const fileString = buffer.toString("utf-8");
        return fileString;
    }
    async createAssociationAuthUser(associationId) {
        common_1.Logger.log(`${mm} createAssociationAuthUser  .... 🎽 associationId: ${associationId}`);
        const email = `${associationId}@kasie.com`;
        const password = `pass${associationId}`;
        const app = this.firebaseAdmin.getFirebaseApp();
        const ass = await this.associationModel.findOne({
            associationId: associationId,
        });
        if (ass) {
            const userRecord = await app.auth().createUser({
                email: email,
                password: password,
                displayName: `${ass.associationName}`,
                uid: associationId,
            });
            if (userRecord) {
                if (userRecord.uid == associationId) {
                    common_1.Logger.log(`${mm} createAssociationAuthUser  is Good!! 🎽 name: ${ass.associationName}`);
                    return {
                        email: email,
                        password: password,
                    };
                }
            }
        }
        common_1.Logger.error(`${mm} createAssociationAuthUser failed 😈😈😈 associationId: ${associationId} 😈😈😈`);
        throw new common_1.HttpException("Unable to authenticate Association", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async createUser(user) {
        const storedPassword = user.password;
        const app = this.firebaseAdmin.getFirebaseApp();
        common_1.Logger.log(`\n\n${mm} ........ create user on Firebase Authentication: ${JSON.stringify(user, null, 2)} \n`);
        let mUser = await this.userModel.findOne({
            email: user.email,
        });
        if (!mUser && user.cellphone) {
            mUser = await this.userModel.findOne({
                cellphone: user.cellphone,
            });
        }
        if (mUser) {
            common_1.Logger.log(`${mm} ........ User exists on Atlas: ${JSON.stringify(mUser, null, 2)} \n`);
            return mUser;
        }
        try {
            common_1.Logger.log(`${mm} createUser  .... 🎽 email: ${user.email}`);
            const uid = (0, crypto_1.randomUUID)();
            let userRecord = null;
            if (user.cellphone) {
                userRecord = await app.auth().createUser({
                    email: user.email,
                    password: user.password,
                    phoneNumber: user.cellphone,
                    displayName: `${user.firstName} ${user.lastName}`,
                    uid: uid,
                });
            }
            else {
                user.bucketFileName = "NAY";
                user.qrCodeBytes = "NAY";
                user.qrCodeBytes = "NAY";
                userRecord = await app.auth().createUser({
                    email: user.email,
                    password: user.password,
                    displayName: `${user.firstName} ${user.lastName}`,
                    uid: uid,
                });
            }
            common_1.Logger.log(`${mm} createUser: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`);
            user.dateRegistered = new Date().toISOString();
            user.password = null;
            user.userId = uid;
            common_1.Logger.debug(`${mm} createUser: ... bucketFileName: ${user.bucketFileName}`);
            common_1.Logger.debug(`${mm} ... adding user to Mongo, user; check bucketFileName: ${JSON.stringify(user)}`);
            await this.userModel.create(user);
            user.password = storedPassword;
            common_1.Logger.log(`\n\n${mm} createUser: 🔵 🔵 🔵 🔵 🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(user, null, 2)} 🥬\n\n`);
        }
        catch (e) {
            common_1.Logger.error(`${mm} User creation failed: ${e}`);
            this.errorHandler.handleError(`User creation failed: ${e}`, user.associationId, user.associationName);
            throw new common_1.HttpException(`${mm} User creation failed: ${e}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return user;
    }
    async createInternalAdminUser(user) {
        common_1.Logger.log(`\n\n${mm} createAdminUser: user: ${JSON.stringify(user)} \n`);
        user.userType = constants_1.Constants.ADMINISTRATOR_AFTAROBOT;
        user.associationId = "ADMIN";
        user.dateRegistered = new Date().toISOString();
        if (user.password == null) {
            user.password = "pass123";
        }
        try {
            const res = await this.createUser(user);
            common_1.Logger.log(`${mm} createAdminUser: seems pretty cool,  🔵 🔵 internal admin user has been created\n\n`);
            return res;
        }
        catch (e) {
            this.errorHandler.handleError(e, user.associationId, user.associationName);
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(user) {
        await this.userModel.updateOne({ userId: user.userId }, user);
        return user;
    }
    async getUserById(userId) {
        common_1.Logger.debug(`${mm} getting user by id: ${userId}`);
        const user = await this.userModel.findOne({ userId: userId });
        if (user) {
            common_1.Logger.debug(`${mm} getting user found: ${JSON.stringify(user)}`);
        }
        else {
            common_1.Logger.error(`${mm} user not found`);
            this.errorHandler.handleError("getUserById:User not found", "N/A", 'nay');
            throw new common_1.HttpException("getUserById User fucked!", common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }
    async getUserByName(firstName, lastName) {
        const user = await this.userModel.findOne({
            firstName: firstName,
            lastName: lastName,
        });
        if (user) {
            common_1.Logger.debug(`$mm user found by name: ${JSON.stringify(user)}`);
        }
        else {
            common_1.Logger.log(`${mm} user not found by name: ${user} - ${firstName} ${lastName}`);
        }
        return user;
    }
    async createOwner(user) {
        const storedPassword = user.password;
        const app = this.firebaseAdmin.getFirebaseApp();
        common_1.Logger.log(`\n\n${mm} ........ create user on Firebase Authentication: ${JSON.stringify(user, null, 2)} \n`);
        const mUser = await this.userModel.findOne({
            firstName: user.firstName,
            lastName: user.lastName,
        });
        if (mUser) {
            common_1.Logger.log(`${mm} ........  createOwner: User exists on Atlas: ${JSON.stringify(mUser, null, 2)} \n`);
            return mUser;
        }
        try {
            common_1.Logger.log(`${mm} createOwner  .... 🎽 email: ${user.email} ${user.cellphone}`);
            const uid = (0, crypto_1.randomUUID)();
            const userRecord = await app.auth().createUser({
                email: user.email,
                password: user.password,
                phoneNumber: user.cellphone,
                displayName: `${user.firstName} ${user.lastName}`,
                uid: uid,
            });
            common_1.Logger.log(`${mm} createOwner: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`);
            user.dateRegistered = new Date().toISOString();
            user.password = null;
            user.userId = uid;
            let url = null;
            common_1.Logger.debug(`${mm} createOwner: ... bucketFileName: ${user.bucketFileName}`);
            common_1.Logger.debug(`${mm} ... adding owner to Mongo, userId: ${user.userId} - ${user.firstName}`);
            const mUser = await this.userModel.create(user);
            user.password = storedPassword;
            common_1.Logger.log(`\n\n${mm} createOwner: 🔵🔵🔵🔵🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(mUser, null, 2)} 🥬\n\n`);
        }
        catch (e) {
            common_1.Logger.error(`${mm} owner creation failed: ${e}`);
            this.errorHandler.handleError(`owner creation failed: ${e}`, user.associationId, user.associationName);
            throw new common_1.HttpException(`${mm} Owner creation failed: ${e}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return user;
    }
    async addUserGeofenceEvent(userGeofenceEvent) {
        return await this.userGeofenceModel.create(userGeofenceEvent);
    }
    async deleteUser(uid) {
        const app = this.firebaseAdmin.getFirebaseApp();
        const user = await app.auth().getUser(uid);
        if (user) {
            common_1.Logger.debug(`${user.displayName} - ${user.email} - to be deleted`);
            await app.auth().deleteUser(uid);
            common_1.Logger.debug(`Firebase user deleted`);
            return 0;
        }
        return 9;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(User_1.User.name)),
    __param(4, (0, mongoose_1.InjectModel)(UserGeofenceEvent_1.UserGeofenceEvent.name)),
    __param(5, (0, mongoose_1.InjectModel)(Association_1.Association.name)),
    __metadata("design:paramtypes", [storage_service_1.CloudStorageUploaderService,
        firebase_util_1.FirebaseAdmin,
        errors_interceptor_1.KasieErrorHandler, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], UserService);
//# sourceMappingURL=user.service.js.map