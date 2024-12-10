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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationSchema = exports.Association = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
const User_1 = require("./User");
let Association = class Association {
};
exports.Association = Association;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "cityId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "countryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: { unique: true } }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "associationName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Association.prototype, "active", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "countryName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "cityName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Association.prototype, "dateRegistered", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], Association.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", User_1.User)
], Association.prototype, "carUser", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", User_1.User)
], Association.prototype, "adminUser", void 0);
exports.Association = Association = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "Association",
    })
], Association);
exports.AssociationSchema = mongoose_1.SchemaFactory.createForClass(Association);
//# sourceMappingURL=Association.js.map