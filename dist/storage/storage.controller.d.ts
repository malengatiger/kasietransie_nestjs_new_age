import { CloudStorageUploaderService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: CloudStorageUploaderService);
    uploadExampleFiles(files: {
        userFile: Express.Multer.File[];
        vehicleFile: Express.Multer.File[];
    }): Promise<string>;
}
