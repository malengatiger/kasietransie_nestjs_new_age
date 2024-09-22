import { ConfigService } from "@nestjs/config";
export declare class CloudStorageUploaderService {
    private configService;
    private bucketName;
    private projectId;
    private cloudStorageDirectory;
    constructor(configService: ConfigService);
    private getSignedUrl;
    uploadFile(objectName: string, filePath: string, associationId: string): Promise<string>;
    private getFileContentType;
    createQRCode(data: string, prefix: string, size: number, associationId: string): Promise<string>;
}
