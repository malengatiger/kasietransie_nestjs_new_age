import mongoose from 'mongoose';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { AppError } from 'src/data/models/AppError';
import { MessagingService } from '../fcm/fcm.service';
import { KasieError } from 'src/data/models/kasie.error';
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
