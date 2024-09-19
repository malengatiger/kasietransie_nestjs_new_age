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
exports.TextTranslationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const TranslationBag_1 = require("../data/models/TranslationBag");
const mm = 'TextTranslationService';
let TextTranslationService = class TextTranslationService {
    constructor(configService, translationBagModel) {
        this.configService = configService;
        this.translationBagModel = translationBagModel;
    }
    async initialize() {
        return null;
    }
    async writeFile(newBags, languageCode) {
        return null;
    }
    async setStrings() {
        return null;
    }
    async getBag(languageCode, stringToTranslate, key) {
        return null;
    }
    async translateText(bag) {
        return null;
    }
    async setLanguageCodes() {
        return null;
    }
    async createDartFile(fromDB) {
        return null;
    }
    async generateTranslations(setBaseStrings) {
        return null;
    }
    async generateInputStrings(input) {
        return null;
    }
    async addBigStrings() {
        return null;
    }
};
exports.TextTranslationService = TextTranslationService;
exports.TextTranslationService = TextTranslationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(TranslationBag_1.TranslationBag.name)),
    __metadata("design:paramtypes", [config_1.ConfigService, mongoose_2.default.Model])
], TextTranslationService);
//# sourceMappingURL=TextTranslationService.js.map