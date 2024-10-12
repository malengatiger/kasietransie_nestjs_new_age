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
const csv_1 = require("csv");
const crypto_1 = require("crypto");
const Association_1 = require("../../data/models/Association");
const UserGeofenceEvent_1 = require("../../data/models/UserGeofenceEvent");
const storage_service_1 = require("../../storage/storage.service");
const constants_1 = require("../../my-utils/constants");
const firebase_util_1 = require("../../services/firebase_util");
const os = require("os");
const path = require("path");
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
    async createUser(user) {
        const storedPassword = user.password;
        const app = this.firebaseAdmin.getFirebaseApp();
        common_1.Logger.log(`\n\n${mm} ........ create user: ${JSON.stringify(user, null, 2)} \n`);
        try {
            let email = "";
            if (!user.email) {
                const name = `${user.firstName} ${user.lastName}`;
                const mName = name.replace(" ", "").toLowerCase();
                email = `${mName}_${new Date().getTime()}@kasietransie.com`;
                user.email = email;
            }
            else {
                email = user.email;
            }
            common_1.Logger.log(`${mm} createUser  .... 🎽 email: ${email}`);
            const userRecord = await app.auth().createUser({
                email,
                password: user.password,
                phoneNumber: user.cellphone,
                displayName: `${user.firstName} ${user.lastName}`,
            });
            common_1.Logger.log(`${mm} createUser: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`);
            const uid = userRecord.uid;
            user.userId = uid;
            const url = await this.storage.createQRCode({
                data: JSON.stringify(user),
                prefix: constants_1.Constants.qrcode_user,
                size: 1,
                associationId: user.associationName ?? "ADMIN",
            });
            common_1.Logger.debug(`${mm} createUser: ... qrCode url: ${url}`);
            user.password = null;
            user.qrCodeUrl = url;
            common_1.Logger.debug(`${mm} ... adding user to Mongo, userId: ${user.userId} - ${user.firstName}`);
            const mUser = await this.userModel.create(user);
            user.password = storedPassword;
            common_1.Logger.log(`\n\n${mm} createUser: 🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(mUser, null, 2)} 🥬\n\n`);
        }
        catch (e) {
            common_1.Logger.error(`${mm} User creation failed: ${e}`);
            this.errorHandler.handleError(`User creation failed: ${e}`, user.associationId);
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async createAdminUser(user) {
        common_1.Logger.log(`\n\n${mm} createAdminUser: user: ${JSON.stringify(user)} \n`);
        user.userType = constants_1.Constants.ADMINISTRATOR_AFTAROBOT;
        user.associationId = "ADMIN";
        user.dateRegistered = new Date().toISOString();
        try {
            const res = await this.createUser(user);
            common_1.Logger.log(`${mm} createAdminUser: seems pretty cool,  🔵 🔵 internal admin user has been created\n\n`);
            return res;
        }
        catch (e) {
            this.errorHandler.handleError(e, user.associationId);
            throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(user) {
        return null;
    }
    async importUsersFromCSV(file, associationId) {
        common_1.Logger.log(`\n\n${mm} importUsersFromCSV:... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`);
        common_1.Logger.debug(`${mm} importUsersFromCSV:...  🥦 file size: ${file.buffer.length} bytes;  🥦 originalname: ${file.originalname}`);
        const list = await this.associationModel.find({
            associationId: associationId,
        });
        if (list.length == 0) {
            throw new Error("Association not found");
        }
        const ass = list[0];
        common_1.Logger.log(`${mm} importUsersFromCSV:... association: 🔵 ${JSON.stringify(ass, null, 2)} 🔵\n\n`);
        const users = [];
        const mUsers = [];
        const errors = [];
        let response;
        let index = 0;
        const tempFilePath = path.join(os.tmpdir(), file.originalname);
        common_1.Logger.log(`${mm} importUsersFromCSV:... 🔵 tempFilePath: ${tempFilePath}`);
        common_1.Logger.log(`${mm} importUsersFromCSV:... 🔵 read csv file: ${file.originalname}`);
        await fs.promises.writeFile(tempFilePath, file.buffer);
        response = await new Promise((resolve, reject) => {
            fs.createReadStream(tempFilePath)
                .pipe((0, csv_1.parse)())
                .on("data", async (data) => {
                if (index > 0) {
                    const user = await this.buildUser(data, ass);
                    users.push(user);
                }
                index++;
            })
                .on("error", (err) => {
                reject(new Error(`Error processing user CSV file: ${err}`));
            })
                .on("end", async () => {
                common_1.Logger.debug(`${mm} CSV parsing completed ......`);
                common_1.Logger.log(`${mm} Save the parsed users to the database`);
                for (const user of users) {
                    try {
                        const u = await this.createUser(user);
                        mUsers.push(u);
                    }
                    catch (e) {
                        errors.push(user);
                        common_1.Logger.debug(`${mm} ${e} - errors: ${errors.length}`);
                    }
                }
                await fs.promises.unlink(tempFilePath);
                resolve({
                    users: mUsers,
                    errors: errors,
                });
            });
        });
        common_1.Logger.log(`${mm} return response: ${JSON.stringify(response, null, 2)}`);
        common_1.Logger.log(`\n\n${mm} 😎 😎 😎 😎 😎 😎 Work completed! Users from csv file, 🍎 users: ${response.users.length} 🍎 errors: ${response.errors.length}\n\n`);
        return response;
    }
    async buildUser(data, ass) {
        const uu = new User_1.User();
        uu.userType = data[0];
        uu.firstName = data[1];
        uu.lastName = data[2];
        uu.email = data[3];
        uu.cellphone = data[4];
        uu.associationId = ass.associationId;
        uu.associationName = ass.associationName;
        uu.password = (0, crypto_1.randomUUID)().trim();
        return uu;
    }
    async getUserById(userId) {
        const user = await this.userModel.findOne({ userId: userId });
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
    async fix() {
        const list = await this.userModel.find({});
        common_1.Logger.log(`${mm} fix all users ...`);
        let cnt = 0;
        for (const u of list) {
            if (u.firstName) {
                u.firstName = u.firstName.trim();
            }
            if (u.lastName) {
                u.lastName = u.lastName.trim();
            }
            await u.save();
            cnt++;
        }
        common_1.Logger.log(`${mm} fixed ${cnt} users`);
        return cnt;
    }
    async createOwner(car) {
        var asses = await this.associationModel
            .find({ associationId: car.associationId })
            .limit(1);
        let ass = null;
        const nameParts = car.ownerName.split(" ");
        const firstName = nameParts.slice(0, -1).join(" ");
        const lastName = nameParts[nameParts.length - 1];
        if (asses.length > 0) {
            ass = asses[0];
            const user = new User_1.User();
            user.associationId = car.associationId;
            user.associationName = car.associationName;
            user.firstName = firstName;
            user.lastName = lastName;
            user.userType = constants_1.Constants.OWNER;
            const emailSuffix = ass.adminEmail.split("@")[1];
            const emailPrefix = car.ownerName.replaceAll(" ", "_").toLowerCase();
            user.email = emailPrefix + "@" + emailSuffix;
            var mUser = await this.createUser(user);
            return mUser;
        }
        return null;
    }
    async addUserGeofenceEvent(userGeofenceEvent) {
        return await this.userGeofenceModel.create(userGeofenceEvent);
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