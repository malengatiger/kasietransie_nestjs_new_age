"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModule = void 0;
const common_1 = require("@nestjs/common");
const country_service_1 = require("./country.service");
const country_controller_1 = require("./country.controller");
const fcm_service_1 = require("../fcm/fcm.service");
const Country_1 = require("../../data/models/Country");
const mongoose_1 = require("@nestjs/mongoose");
const City_1 = require("../../data/models/City");
const AppError_1 = require("../../data/models/AppError");
const kasie_error_1 = require("../../data/models/kasie.error");
const AssociationToken_1 = require("../../data/models/AssociationToken");
let CountryModule = class CountryModule {
};
exports.CountryModule = CountryModule;
exports.CountryModule = CountryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "City", schema: City_1.CitySchema },
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "Country", schema: Country_1.CountrySchema },
                { name: "AssociationToken", schema: AssociationToken_1.AssociationTokenSchema },
            ]),
        ],
        controllers: [country_controller_1.CountryController],
        providers: [country_service_1.CountryService, fcm_service_1.MessagingService],
    })
], CountryModule);
//# sourceMappingURL=country.module.js.map