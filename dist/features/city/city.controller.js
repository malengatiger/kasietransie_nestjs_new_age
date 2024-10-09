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
exports.CityController = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const City_1 = require("../../data/models/City");
const mm = '🌼🌼🌼 CityController  🌼';
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    async addCity(city) {
        return this.cityService.addCity(city);
    }
    async findCitiesByLocation(latitude, longitude, maxDistanceInMetres, limit) {
        common_1.Logger.debug(`${mm} latitude: ${latitude} longitude: ${longitude} max: ${maxDistanceInMetres} limit: ${limit}`);
        return this.cityService.findCitiesByLocation(latitude, longitude, maxDistanceInMetres, limit);
    }
    async fix(countryId) {
        return await this.cityService.fixCreated(countryId);
    }
};
exports.CityController = CityController;
__decorate([
    (0, common_1.Post)('addCity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [City_1.City]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "addCity", null);
__decorate([
    (0, common_1.Get)('findCitiesByLocation'),
    __param(0, (0, common_1.Query)('latitude')),
    __param(1, (0, common_1.Query)('longitude')),
    __param(2, (0, common_1.Query)('maxDistanceInMetres')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "findCitiesByLocation", null);
__decorate([
    (0, common_1.Get)('fix'),
    __param(0, (0, common_1.Query)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "fix", null);
exports.CityController = CityController = __decorate([
    (0, common_1.Controller)('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
//# sourceMappingURL=city.controller.js.map