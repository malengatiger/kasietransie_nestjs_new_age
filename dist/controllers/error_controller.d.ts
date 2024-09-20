import { AppError } from '../data/models/AppError';
import { ErrorService } from 'src/features/error/error.service';
import { KasieError } from 'src/data/models/kasie.error';
export declare class ErrorController {
    private readonly errorService;
    private readonly logger;
    constructor(errorService: ErrorService);
    getAppErrors(startDate: string): Promise<AppError[]>;
    getKasieErrors(startDate: string): Promise<KasieError[]>;
}
