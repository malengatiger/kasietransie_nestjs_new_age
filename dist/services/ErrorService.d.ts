import mongoose from 'mongoose';
import { MessagingService } from 'src/messaging/messaging.service';
import { KasieError } from '../my-utils/kasie.error';
import { AppError } from '../data/models/AppError';
import { AppErrors } from '../data/helpers/AppErrors';
export declare class ErrorService {
    private messagingService;
    private kasieErrorModel;
    private appErrorModel;
    constructor(messagingService: MessagingService, kasieErrorModel: mongoose.Model<KasieError>, appErrorModel: mongoose.Model<AppError>);
    addAppErrors(errors: AppErrors): Promise<AppError[]>;
    addAppError(error: AppError): Promise<AppError>;
    getAppErrors(startDate: string): Promise<AppError[]>;
    getKasieErrors(startDate: string): Promise<KasieError[]>;
    addKasieError(error: KasieError): Promise<void>;
}
