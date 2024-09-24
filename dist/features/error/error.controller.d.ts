import { ErrorService } from 'src/features/error/error.service';
import { KasieError } from 'src/data/models/kasie.error';
import { AppError } from 'src/data/models/AppError';
export declare class ErrorController {
    private readonly errorService;
    private readonly logger;
    constructor(errorService: ErrorService);
    getAppErrors(startDate: string): Promise<AppError[]>;
    getKasieErrors(startDate: string): Promise<KasieError[]>;
}
