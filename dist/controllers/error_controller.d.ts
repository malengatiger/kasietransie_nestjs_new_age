import { KasieError } from '../my-utils/kasie.error';
import { ErrorService } from '../services/ErrorService';
import { AppError } from '../data/models/AppError';
export declare class ErrorController {
    private readonly errorService;
    private readonly logger;
    constructor(errorService: ErrorService);
    getAppErrors(startDate: string): Promise<AppError[]>;
    getKasieErrors(startDate: string): Promise<KasieError[]>;
}
