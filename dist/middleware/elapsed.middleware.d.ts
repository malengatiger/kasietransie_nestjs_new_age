import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MessagingService } from 'src/features/fcm/fcm.service';
import { KasieError } from 'src/data/models/kasie.error';
export declare class ElapsedTimeMiddleware implements NestMiddleware {
    private readonly messagingService;
    private kasieErrorModel;
    constructor(messagingService: MessagingService, kasieErrorModel: mongoose.Model<KasieError>);
    use(req: Request, res: Response, next: NextFunction): void;
}
