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
exports.CountrySchema = exports.Country = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
const swagger_1 = require("@nestjs/swagger");
let Country = class Country {
};
exports.Country = Country;
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "countryId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "iso3", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "iso2", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "phoneCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "capital", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "currencyName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "currencySymbol", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "tld", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "region", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "subregion", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], Country.prototype, "timezones", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Country.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Country.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "emoji", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Country.prototype, "emojiU", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", position_1.Position)
], Country.prototype, "position", void 0);
exports.Country = Country = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: "Country",
    })
], Country);
exports.CountrySchema = mongoose_1.SchemaFactory.createForClass(Country);
//# sourceMappingURL=Country.js.map