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
var CountryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const country_service_1 = require("./country.service");
const mm = "🚼 🚼 🚼 CountryController 🚼";
let CountryController = CountryController_1 = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
        this.logger = new common_1.Logger(CountryController_1.name);
    }
    async getCountries() {
        return await this.countryService.getCountries();
    }
    async getCountryCities(countryId) {
        return await this.countryService.getCountryCities(countryId);
    }
    async getCountryCitiesZippedFile(countryId, res) {
        try {
            const filePath = await this.countryService.getCountryCitiesZippedFile(countryId);
            this.sendFile(filePath, res);
        }
        catch (error) {
            this.logger.error("Error getting countryCities zipped file:", error);
            res.status(500).send("Error downloading file: " + error.message);
        }
    }
    sendFile(filePath, res) {
        this.logger.debug(`\n\n${mm} .... 💦💦💦💦💦 sending file ....\n💦💦 path:` + filePath);
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename=route.zip`);
        res.sendFile(filePath);
    }
};
exports.CountryController = CountryController;
__decorate([
    (0, common_1.Get)("getCountries"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getCountries", null);
__decorate([
    (0, common_1.Get)("getCountryCities"),
    __param(0, (0, common_1.Query)("countryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getCountryCities", null);
__decorate([
    (0, common_1.Get)("getCountryCitiesZippedFile"),
    __param(0, (0, common_1.Query)("countryId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "getCountryCitiesZippedFile", null);
exports.CountryController = CountryController = CountryController_1 = __decorate([
    (0, common_1.Controller)("country"),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
//# sourceMappingURL=country.controller.js.map