import { ConfigService } from "@nestjs/config";
import { KasieQRCode } from "src/data/helpers/kasie_qr_code";
import mongoose from "mongoose";
import { ExampleFile } from "src/data/models/ExampleFile";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { Vehicle } from "src/data/models/Vehicle";
export declare class CloudStorageUploaderService {
    private configService;
    private exampleFileModel;
    private vehicleModel;
    private vehiclePhotoModel;
    private vehicleVideoModel;
    private bucketName;
    private projectId;
    private cloudStorageDirectory;
    constructor(configService: ConfigService, exampleFileModel: mongoose.Model<ExampleFile>, vehicleModel: mongoose.Model<Vehicle>, vehiclePhotoModel: mongoose.Model<VehiclePhoto>, vehicleVideoModel: mongoose.Model<VehicleVideo>);
    uploadVehicleVideo(vehicleId: string, filePath: string, latitude: number, longitude: number): Promise<any>;
    uploadVehiclePhoto(vehicleId: string, filePath: string, thumbFilePath: string, latitude: number, longitude: number): Promise<any>;
    uploadExampleFiles(userFilePath: string, vehicleFilePath: string): Promise<void>;
    private getSignedUrl;
    uploadFile(objectName: string, filePath: string, folder: string): Promise<string>;
    private getFileContentType;
    createQRCode(data: KasieQRCode): Promise<string>;
}
