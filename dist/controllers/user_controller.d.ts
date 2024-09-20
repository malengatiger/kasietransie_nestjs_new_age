import { User } from 'src/data/models/User';
import { UserService } from 'src/features/user/user.service';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    getUserById(userId: string): Promise<User>;
    importUsersFromCSV(file: Express.Multer.File, associationId: string): Promise<User[]>;
    importUsersFromJSON(file: Express.Multer.File, associationId: string): Promise<User[]>;
    private sendFile;
}
