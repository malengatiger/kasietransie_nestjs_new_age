import mongoose from "mongoose";
import { User } from "src/data/models/User";
import { Association } from "src/data/models/Association";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { FirebaseAdmin } from "src/services/firebase_util";
import { Vehicle } from "src/data/models/Vehicle";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
export declare class UserService {
    readonly storage: CloudStorageUploaderService;
    private readonly firebaseAdmin;
    private readonly errorHandler;
    private userModel;
    private userGeofenceModel;
    private associationModel;
    constructor(storage: CloudStorageUploaderService, firebaseAdmin: FirebaseAdmin, errorHandler: KasieErrorHandler, userModel: mongoose.Model<User>, userGeofenceModel: mongoose.Model<UserGeofenceEvent>, associationModel: mongoose.Model<Association>);
    convertExpressFileToString(expressFile: Express.Multer.File): string;
    createUser(user: User): Promise<User>;
    createAdminUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    importUsersFromCSV(file: Express.Multer.File, associationId: string): Promise<AddUsersResponse>;
    private buildUser;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByName(firstName: string, lastName: string): Promise<User | null>;
    fix(): Promise<number>;
    createOwner(car: Vehicle): Promise<User>;
    addUserGeofenceEvent(userGeofenceEvent: UserGeofenceEvent): Promise<UserGeofenceEvent>;
}
export interface AddUsersResponse {
    users: User[];
    errors: any[];
}
