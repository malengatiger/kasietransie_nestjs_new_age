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
exports.RegistrationBag = void 0;
const Association_1 = require("./Association");
const Country_1 = require("./Country");
const SettingsModel_1 = require("./SettingsModel");
const User_1 = require("./User");
const swagger_1 = require("@nestjs/swagger");
class RegistrationBag {
}
exports.RegistrationBag = RegistrationBag;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Association_1.Association)
], RegistrationBag.prototype, "association", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", User_1.User)
], RegistrationBag.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", SettingsModel_1.SettingsModel)
], RegistrationBag.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Country_1.Country)
], RegistrationBag.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], RegistrationBag.prototype, "exampleFiles", void 0);
//# sourceMappingURL=RegistrationBag.js.map