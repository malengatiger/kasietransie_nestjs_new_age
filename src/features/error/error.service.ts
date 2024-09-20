/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { AppError } from 'src/data/models/AppError';
import { MessagingService } from '../fcm/fcm.service';
import { KasieError } from 'src/data/models/kasie.error';

const mm: string = '🍎🍎🍎 ErrorService';

@Injectable()
export class ErrorService {
  constructor(
    private messagingService: MessagingService,
    @InjectModel(KasieError.name)
    private kasieErrorModel: mongoose.Model<KasieError>,

    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,
  ) {}
  public async addAppErrors(errors: AppErrors): Promise<AppError[]> {
    const res = await this.appErrorModel.insertMany(errors.appErrorList);
    await this.messagingService.sendAppErrorMessages(errors);
    return res;
  }
  public async addAppError(error: AppError): Promise<AppError> {
    Logger.log(`adding AppError${error}`);
    const err = await this.appErrorModel.create(error);
    await this.messagingService.sendAppErrorMessage(error);
    return err;
  }
  public async getAppErrors(startDate: string): Promise<AppError[]> {
    const res = await this.appErrorModel
      .find({ created: { $gte: startDate } })
      .sort({ created: -1 });
    Logger.debug(`AppErrors found: ${res.length}`);
    return res;
  }
  public async getKasieErrors(startDate: string): Promise<KasieError[]> {
    const res = await this.kasieErrorModel
      .find({ date: { $gte: startDate } })
      .sort({ date: -1 });
    Logger.debug(`KasieErrors found: ${res.length}`);
    return res;
  }
  public async addKasieError(error: KasieError): Promise<void> {
    await this.kasieErrorModel.create(error);
  }
}
