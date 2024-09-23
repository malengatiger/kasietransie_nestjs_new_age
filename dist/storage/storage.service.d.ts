import { ConfigService } from "@nestjs/config";
import { KasieQRCode } from "src/data/helpers/kasie_qr_code";
import mongoose from "mongoose";
import { ExampleFile } from "src/data/models/ExampleFile";
export declare class CloudStorageUploaderService {
    private configService;
    private exampleFileModel;
    private bucketName;
    private projectId;
    private cloudStorageDirectory;
    constructor(configService: ConfigService, exampleFileModel: mongoose.Model<ExampleFile>);
    uploadExampleFiles(userFilePath: string, vehicleFilePath: string): Promise<void>;
    private getSignedUrl;
    uploadFile(objectName: string, filePath: string, associationId: string): Promise<string>;
    private getFileContentType;
    createQRCode(data: KasieQRCode): Promise<string>;
}
