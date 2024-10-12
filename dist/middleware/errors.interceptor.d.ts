import { MessagingService } from 'src/features/fcm/fcm.service';
export declare class KasieErrorHandler {
    private readonly messageService;
    constructor(messageService: MessagingService);
    handleError(error: any, associationId: string): Promise<void>;
    private sendCloudMessage;
}
