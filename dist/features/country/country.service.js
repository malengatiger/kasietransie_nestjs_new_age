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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const City_1 = require("../../data/models/City");
const Country_1 = require("../../data/models/Country");
const zipper_1 = require("../../my-utils/zipper");
const mm = '🥦🥦🥦 CountryService 🥦';
let CountryService = class CountryService {
    constructor(zipper, countryModel, cityModel) {
        this.zipper = zipper;
        this.countryModel = countryModel;
        this.cityModel = cityModel;
    }
    async getCountryCities(countryId) {
        const res = await this.cityModel
            .find({ countryId: countryId })
            .sort({ name: 1 });
        common_1.Logger.log(`${mm} ... getCountryCities starting, id: ${countryId} found: 🔷🔷 ${res.length} cities`);
        return res;
    }
    async getCountries() {
        const countries = await this.countryModel.find({}).sort({ name: 1 });
        console.log(`${mm} ... getCountries ... ${countries.length} found on MongoDB Atlas`);
        return countries;
    }
    async getCountryCitiesZippedFile(countryId) {
        common_1.Logger.log(`${mm} ... getCountryCitiesZippedFile starting, id: ${countryId} ...`);
        const list = await this.getCountryCities(countryId);
        const json = JSON.stringify(list);
        const file = await this.zipper.zip([{ content: json }]);
        common_1.Logger.log(`${mm} ... getCountryCitiesZippedFile found:  🔷🔷 ${list.length} cities 🔷🔷`);
        return file;
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(Country_1.Country.name)),
    __param(2, (0, mongoose_1.InjectModel)(City_1.City.name)),
    __metadata("design:paramtypes", [zipper_1.FileArchiverService, mongoose_2.default.Model, mongoose_2.default.Model])
], CountryService);
//# sourceMappingURL=country.service.js.map