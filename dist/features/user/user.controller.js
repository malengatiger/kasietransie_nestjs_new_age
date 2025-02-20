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
var UserController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const User_1 = require("../../data/models/User");
const user_service_1 = require("./user.service");
const mm = " 🚼 🚼 🚼 UserController  🚼";
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    async addUser(user) {
        common_1.Logger.log(`${mm} addUser; check bucketFileName: ${JSON.stringify(user, null, 2)}`);
        return await this.userService.createUser(user);
    }
    async createVehicleUser(user) {
        return await this.userService.createVehicleUser(user);
    }
    async createOwner(user) {
        return await this.userService.createOwner(user);
    }
    async addAdminUser(user) {
        return await this.userService.createInternalAdminUser(user);
    }
    async getUserById(userId) {
        return await this.userService.getUserById(userId);
    }
    async deleteFirebaseUser(uid) {
        return await this.userService.deleteUser(uid);
    }
    async createAssociationAuthUser(associationId) {
        return await this.userService.createAssociationAuthUser(associationId);
    }
    async getUserByName(firstName, lastName) {
        const res = await this.userService.getUserByName(firstName, lastName);
        if (res == null) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.BAD_REQUEST);
        }
        return res;
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("addUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)("createVehicleUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createVehicleUser", null);
__decorate([
    (0, common_1.Post)("createOwner"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createOwner", null);
__decorate([
    (0, common_1.Post)("addAdminUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addAdminUser", null);
__decorate([
    (0, common_1.Get)("getUserById"),
    __param(0, (0, common_1.Query)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)("getUserById"),
    __param(0, (0, common_1.Query)("uid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteFirebaseUser", null);
__decorate([
    (0, common_1.Get)("createAssociationAuthUser"),
    __param(0, (0, common_1.Query)("associationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createAssociationAuthUser", null);
__decorate([
    (0, common_1.Get)("getUserByName"),
    __param(0, (0, common_1.Query)("firstName")),
    __param(1, (0, common_1.Query)("lastName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByName", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map