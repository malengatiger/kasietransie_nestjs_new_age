import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';
export declare class TextTranslationService {
    private configService;
    private translationBagModel;
    constructor(configService: ConfigService, translationBagModel: mongoose.Model<TranslationBag>);
    initialize(): Promise<void>;
    writeFile(newBags: TranslationBag[], languageCode: string): Promise<void>;
    setStrings(): Promise<void>;
    getBag(languageCode: string, stringToTranslate: string, key: string): Promise<TranslationBag>;
    translateText(bag: TranslationBag): Promise<string>;
    setLanguageCodes(): Promise<void>;
    createDartFile(fromDB: boolean): Promise<string>;
    generateTranslations(setBaseStrings: boolean): Promise<string>;
    generateInputStrings(input: TranslationInput[]): Promise<string>;
    addBigStrings(): Promise<void>;
}
