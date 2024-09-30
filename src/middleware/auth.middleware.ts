import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { de } from 'date-fns/locale';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { MyUtils } from 'src/my-utils/my-utils';
import { FirebaseAdmin } from 'src/services/firebase_util';
const mm = '🔑🔑🔑🔑 AuthMiddleware 🔑🔑';
const errorMessage = '🔴 🔴 🔴 Request is Unauthorized';

interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly fbService: FirebaseAdmin) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    Logger.log(`${mm} request url: ${req.originalUrl} `);
    //  Allow requests from localhost and 192.168.64.1 without authentication
    const serverIP = MyUtils.getServerIPaddress();
    Logger.debug(`${mm} server ip address: ${serverIP}`);
    if (serverIP.includes('192.168.64.1') || serverIP.includes('localhost')) {
      Logger.debug(`${mm} 🔵🔵🔵🔵🔵🔵 Getting into the club without a Diddy pass! 🥦 You are from: 🔵 ${serverIP} 🔵🔵`);
      next();
      return;
    }
    if (process.env.NODE_ENV == 'development') {
      Logger.debug(
        `${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `,
      );
      next();
      return;
    }
    if (req.baseUrl == '/api/v1/association/getCountries') {
      Logger.debug(
        `${mm} 🔴 letting you get countries without a ticket! 🔵 🔵 🔵 `,
      );
      next();
      return;
    }
    if (!authToken) {
      Logger.log(`${mm} authentication token not found in request header 🔴`);
      return res.status(401).json({
        message: errorMessage,
        statusCode: 401,
        date: new Date().toISOString(),
      });
    }
    try {
      const token = authToken.substring(7);
      Logger.log(`${mm} authentication continua: 🔵 token: ${token}`);
      const decodedToken = await this.fbService.getFirebaseApp().auth()
        .verifyIdToken(token);
      req.user = decodedToken; // Set the authenticated user in the request object
      Logger.log(`${mm} authentication seems OK; ✅ req: ${req}`);

      next();
    } catch (error) {
      Logger.log(`${mm} Error verifying authentication token: 🔴 ${error} 🔴`);
      return res.status(403).json({
        message: errorMessage,
        statusCode: 403,
        date: new Date().toISOString(),
      });
    }
  }
}
