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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const City_1 = require("../../data/models/City");
const mm = '🌼🌼🌼 CityService 🌼';
let CityService = class CityService {
    constructor(cityModel) {
        this.cityModel = cityModel;
    }
    async fixCreated(countryId) {
        common_1.Logger.log(`\n\n${mm} fix city created date ...`);
        const cars = await this.cityModel.find({ countryId: countryId });
        let counter = 0;
        for (const city of cars) {
            city.created = new Date().toISOString();
            await this.cityModel.updateOne({ _id: city._id }, city);
            counter++;
            if (counter % 100 === 0) {
                common_1.Logger.log(`${mm} Processed 🍎 ${counter} cities 🍎`);
            }
            await this.delay(10);
        }
        return `${mm} work done; cities fixed: 🔵🔵 ${cars.length} 🔵🔵\n\n`;
    }
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async addCity(city) {
        common_1.Logger.log(`${mm} addCity: ${JSON.stringify(city)}`);
        const res = await this.cityModel.create(city);
        return res;
    }
    async findCitiesByLocation(latitude, longitude, radiusInKM, limit) {
        return await this.getCitiesNear(latitude, longitude, radiusInKM * 1000, limit);
    }
    async getCitiesNear(latitude, longitude, maxDistanceInMetres, limit) {
        common_1.Logger.debug(`${mm} latitude: ${latitude} longitude: ${longitude} max: ${maxDistanceInMetres} limit: ${limit}`);
        const query = {
            position: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [Number(longitude), Number(latitude)],
                    },
                    $maxDistance: maxDistanceInMetres,
                },
            },
        };
        const cities = await this.cityModel.find(query).limit(limit);
        common_1.Logger.log(`${mm} cities found by location: ${cities.length}`);
        return cities;
    }
    async getCountryStates(countryId) {
        return [];
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(City_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], CityService);
//# sourceMappingURL=city.service.js.map