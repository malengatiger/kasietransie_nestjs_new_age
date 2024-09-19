/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { TranslationInput } from 'src/data/helpers/TranslationInput';
import { TranslationBag } from 'src/data/models/TranslationBag';

const mm = 'TextTranslationService';

@Injectable()
export class TextTranslationService {
  constructor(
    private configService: ConfigService,
    @InjectModel(TranslationBag.name)
    private translationBagModel: mongoose.Model<TranslationBag>,
  ) {}

  public async initialize(): Promise<void> {
    return null;
  }
  public async writeFile(
    newBags: TranslationBag[],
    languageCode: string,
  ): Promise<void> {
    return null;
  }
  public async setStrings(): Promise<void> {
    return null;
  }
  public async getBag(
    languageCode: string,
    stringToTranslate: string,
    key: string,
  ): Promise<TranslationBag> {
    return null;
  }
  public async translateText(bag: TranslationBag): Promise<string> {
    return null;
  }
  public async setLanguageCodes(): Promise<void> {
    return null;
  }
  public async createDartFile(fromDB: boolean): Promise<string> {
    return null;
  }
  public async generateTranslations(setBaseStrings: boolean): Promise<string> {
    return null;
  }
  public async generateInputStrings(
    input: TranslationInput[],
  ): Promise<string> {
    return null;
  }
  public async addBigStrings(): Promise<void> {
    return null;
  }
}
