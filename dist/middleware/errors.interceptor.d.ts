import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessagingService } from 'src/features/fcm/fcm.service';
export declare class ErrorsInterceptor implements NestInterceptor {
    private readonly messageService;
    constructor(messageService: MessagingService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private handleError;
    private sendCloudMessage;
}
