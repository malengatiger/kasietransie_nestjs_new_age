"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModule = void 0;
const common_1 = require("@nestjs/common");
const city_service_1 = require("./city.service");
const city_controller_1 = require("./city.controller");
const City_1 = require("../../data/models/City");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
let CityModule = class CityModule {
};
exports.CityModule = CityModule;
exports.CityModule = CityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "City", schema: City_1.CitySchema },
            ]),
        ], controllers: [city_controller_1.CityController],
        providers: [city_service_1.CityService],
    })
], CityModule);
//# sourceMappingURL=city.module.js.map