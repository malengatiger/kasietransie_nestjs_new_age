import mongoose from "mongoose";
import { User } from "src/data/models/User";
import { Association } from "src/data/models/Association";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { FirebaseAdmin } from "src/services/firebase_util";
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
    createAssociationAuthUser(associationId: string): Promise<any>;
    createUser(user: User): Promise<User>;
    createInternalAdminUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserByName(firstName: string, lastName: string): Promise<User | null>;
    createOwner(user: User): Promise<User>;
    addUserGeofenceEvent(userGeofenceEvent: UserGeofenceEvent): Promise<UserGeofenceEvent>;
    deleteUser(uid: string): Promise<number>;
}
export interface AddUsersResponse {
    users: User[];
    errors: any[];
}
