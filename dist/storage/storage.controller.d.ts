import { CloudStorageUploaderService } from "./storage.service";
import { UserPhoto } from "src/data/models/UserPhoto";
import { User } from "src/data/models/User";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { ExampleFile } from "src/data/models/ExampleFile";
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: CloudStorageUploaderService);
    getExampleFiles(): Promise<ExampleFile[]>;
    addUserPhoto(userPhoto: UserPhoto): Promise<any>;
    uploadExampleFiles(files: {
        userFile: Express.Multer.File[];
        vehicleFile: Express.Multer.File[];
    }): Promise<string>;
    uploadVehiclePhoto(files: {
        imageFile: Express.Multer.File[];
        thumbFile: Express.Multer.File[];
    }, vehicleId: string, latitude: string, longitude: string): Promise<VehiclePhoto>;
    uploadUserProfilePicture(files: {
        imageFile: Express.Multer.File[];
        thumbFile: Express.Multer.File[];
    }, userId: string): Promise<User>;
    uploadQrCodeFile(files: {
        imageFile: Express.Multer.File[];
    }, associationId: string): Promise<User>;
    uploadVehicleVideo(file: Express.Multer.File, data: {
        vehicleId: string;
        latitude: number;
        longitude: number;
    }): Promise<any>;
}
