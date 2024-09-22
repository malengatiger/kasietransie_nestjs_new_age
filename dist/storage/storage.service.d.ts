import { ConfigService } from "@nestjs/config";
import { KasieQRCode } from "src/data/helpers/kasie_qr_code";
export declare class CloudStorageUploaderService {
    private configService;
    private bucketName;
    private projectId;
    private cloudStorageDirectory;
    constructor(configService: ConfigService);
    private getSignedUrl;
    callCreateFolder(folderName: string): Promise<import("@google-cloud/storage-control/build/protos/protos").google.storage.control.v2.IFolder>;
    uploadFile(objectName: string, filePath: string, associationId: string): Promise<string>;
    private getFileContentType;
    createQRCode(data: KasieQRCode): Promise<string>;
}
