import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { KasieError } from '../my-utils/kasie.error';
import { MessagingService } from '../messaging/messaging.service';
import mongoose from 'mongoose';
export declare class ElapsedTimeMiddleware implements NestMiddleware {
    private readonly messagingService;
    private kasieErrorModel;
    constructor(messagingService: MessagingService, kasieErrorModel: mongoose.Model<KasieError>);
    use(req: Request, res: Response, next: NextFunction): void;
}
