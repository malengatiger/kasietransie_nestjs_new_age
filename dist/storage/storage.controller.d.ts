import { CloudStorageUploaderService } from "./storage.service";
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: CloudStorageUploaderService);
    uploadExampleFiles(files: {
        userFile: Express.Multer.File[];
        vehicleFile: Express.Multer.File[];
    }): Promise<string>;
    uploadVehiclePhotoFiles(files: {
        imageFile: Express.Multer.File[];
        thumbFile: Express.Multer.File[];
    }, data: {
        vehicleId: string;
        latitude: number;
        longitude: number;
    }): Promise<string>;
    uploadVehicleVideo(file: Express.Multer.File, data: {
        vehicleId: string;
        latitude: number;
        longitude: number;
    }): Promise<any>;
}
