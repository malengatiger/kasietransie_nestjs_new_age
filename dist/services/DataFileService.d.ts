import { ConfigService } from '@nestjs/config';
export declare class DataFileService {
    private configService;
    constructor(configService: ConfigService);
    addToZip(file: File, zipOutputStream: any): Promise<void>;
    createZippedFile(): Promise<File>;
    createZippedByteArray(): Promise<any[]>;
}
