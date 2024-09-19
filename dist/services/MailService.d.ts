import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private configService;
    constructor(configService: ConfigService);
    sendHtmlEmail(to: string, message: string, subject: string): Promise<void>;
}
