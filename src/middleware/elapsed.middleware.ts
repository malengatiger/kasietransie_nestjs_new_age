import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { KasieError } from '../my-utils/kasie.error';
import { MessagingService } from '../messaging/messaging.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../data/models/User';
import mongoose from 'mongoose';

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
          res.statusCode,
          'Error on Kasie Backend',
          req.originalUrl,
        );
        await this.kasieErrorModel.create(x);
        Logger.debug(`${mm} KasieError added to database `);
        await this.messagingService.sendKasieErrorMessage(x);
      }
    });

    next();
  }
}
