import { MessagingService } from 'src/features/fcm/fcm.service';
export declare class ErrorHandler {
    private readonly messageService;
    constructor(messageService: MessagingService);
    handleError(error: any): Promise<void>;
    private sendCloudMessage;
}
