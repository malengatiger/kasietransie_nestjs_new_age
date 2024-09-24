import { User } from 'src/data/models/User';
import { AddUsersResponse, UserService } from 'src/features/user/user.service';
export declare class UserController {
    private readonly userService;
    private readonly logger;
    constructor(userService: UserService);
    addUser(user: User): Promise<any>;
    getUserById(userId: string): Promise<User>;
    importUsersFromCSV(file: Express.Multer.File, associationId: string): Promise<AddUsersResponse>;
    private sendFile;
}
