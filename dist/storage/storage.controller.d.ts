import { CloudStorageUploaderService } from "./storage.service";
import { UserPhoto } from "src/data/models/UserPhoto";
import { User } from "src/data/models/User";
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: CloudStorageUploaderService);
    addUserPhoto(userPhoto: UserPhoto): Promise<any>;
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
    uploadUserProfilePicture(files: {
        imageFile: Express.Multer.File[];
        thumbFile: Express.Multer.File[];
    }, userId: string): Promise<User>;
    uploadVehicleVideo(file: Express.Multer.File, data: {
        vehicleId: string;
        latitude: number;
        longitude: number;
    }): Promise<any>;
}
