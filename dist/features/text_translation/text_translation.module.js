"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextTranslationModule = void 0;
const common_1 = require("@nestjs/common");
const text_translation_service_1 = require("./text_translation.service");
const text_translation_controller_1 = require("./text_translation.controller");
const TranslationBag_1 = require("../../data/models/TranslationBag");
const mongoose_1 = require("@nestjs/mongoose");
let TextTranslationModule = class TextTranslationModule {
};
exports.TextTranslationModule = TextTranslationModule;
exports.TextTranslationModule = TextTranslationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "TranslationBag", schema: TranslationBag_1.TranslationBagSchema },
            ]),
        ],
        controllers: [text_translation_controller_1.TextTranslationController],
        providers: [text_translation_service_1.TextTranslationService],
    })
], TextTranslationModule);
//# sourceMappingURL=text_translation.module.js.map