import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../data/models/User';
import mongoose from 'mongoose';
import { MessagingService } from 'src/features/fcm/fcm.service';
import { KasieError } from 'src/data/models/kasie.error';

const mm = ' 🔇 🔇 🔇 ElapsedTimeMiddleware';
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  constructor(
    private readonly messagingService: MessagingService,
    @InjectModel(KasieError.name)
    private kasieErrorModel: mongoose.Model<KasieError>,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', async () => {
      const elapsed = (Date.now() - start) / 1000;
      Logger.log(
        `${mm} ${req.originalUrl} took 🌸🌸🌸 ${elapsed} seconds 🔴 🔴 statusCode: ${res.statusCode}`,
      );
      if (res.statusCode > 201) {
        //send message & write to database
        const x: KasieError = new KasieError(
          `Error on Kasie Backend, statusCode: ${res.statusCode} - ${res.statusMessage}`,
          HttpStatus.BAD_REQUEST,
        );
        await this.kasieErrorModel.create(x);
        Logger.debug(`${mm} KasieError added to database `);
        await this.messagingService.sendKasieErrorMessage(x);
      }
    });

    next();
  }
}
