import { ConfigService } from '@nestjs/config';
export declare class SecretManagerService {
    private configService;
    constructor(configService: ConfigService);
    getPlacesAPIKey(): Promise<string>;
    getMongoString(): Promise<string>;
}
