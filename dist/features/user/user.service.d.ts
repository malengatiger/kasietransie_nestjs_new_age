import mongoose from "mongoose";
import { User } from "src/data/models/User";
import { Association } from "src/data/models/Association";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { FirebaseAdmin } from "src/services/firebase_util";
export declare class UserService {
    readonly storage: CloudStorageUploaderService;
    private readonly firebaseAdmin;
    private userModel;
    private userGeofenceModel;
    private associationModel;
    constructor(storage: CloudStorageUploaderService, firebaseAdmin: FirebaseAdmin, userModel: mongoose.Model<User>, userGeofenceModel: mongoose.Model<UserGeofenceEvent>, associationModel: mongoose.Model<Association>);
    convertExpressFileToString(expressFile: Express.Multer.File): string;
    createUser(user: User): Promise<User>;
    createAdminUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    importUsersFromCSV(file: Express.Multer.File, associationId: string): Promise<AddUsersResponse>;
    private buildUser;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    addUserGeofenceEvent(userGeofenceEvent: UserGeofenceEvent): Promise<UserGeofenceEvent>;
}
export interface AddUsersResponse {
    users: User[];
    errors: any[];
}
