import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
export declare class CloudStorageUploaderService {
    private configService;
    private fileModel;
    constructor(configService: ConfigService, fileModel: mongoose.Model<File>);
    uploadFile(objectName: string, file: File): Promise<string>;
    getSignedUrl(objectName: string, contentType: string): Promise<string>;
}
