import { User } from "src/data/models/User";
import { UserService } from "src/features/user/user.service";
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    addUser(user: User): Promise<any>;
    createVehicleUser(user: User): Promise<any>;
    createOwner(user: User): Promise<any>;
    addAdminUser(user: User): Promise<any>;
    getUserById(userId: string): Promise<User>;
    deleteFirebaseUser(uid: string): Promise<number>;
    createAssociationAuthUser(associationId: string): Promise<any>;
    getUserByName(firstName: string, lastName: string): Promise<User>;
}
