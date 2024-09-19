import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { MyFirebaseService } from 'src/services/FirebaseService';
interface AuthenticatedRequest extends Request {
    user: admin.auth.DecodedIdToken;
}
export declare class AuthMiddleware implements NestMiddleware {
    private readonly fbService;
    constructor(fbService: MyFirebaseService);
    use(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
export {};
