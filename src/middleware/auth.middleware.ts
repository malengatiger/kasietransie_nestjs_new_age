import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { de } from "date-fns/locale";
import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import { MyUtils } from "src/my-utils/my-utils";
import { FirebaseAdmin } from "src/services/firebase_util";
const mm = "🔑🔑 AuthMiddleware 🔑";
const errorMessage = "🔴 🔴 🔴 Request is Unauthorized";

interface AuthenticatedRequest extends Request {
  user: admin.auth.DecodedIdToken;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly fbService: FirebaseAdmin) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    //Allow requests from localhost and 192.168.64.1 without authentication
    const allowedIPs = [
      "127.0.0.1",
      "::1",
      "192.168.64.1",
      "localhost",
      "192.168.88.253",
    ];

    // Get the client's IP address
    const clientIP = this.getClientIP(req);
    // Check if the client IP is in the whitelist
    let allow = false;
    allowedIPs.forEach((ip) => {
      if (clientIP.includes(ip)) {
        allow = true;
      }
    });
    if (allow) {
      Logger.log(
        `${mm} 🔵🔵🔵🔵🔵🔵 Letting you into the club without a Diddy ticket! 🍎 Request from: 🔵  ${req.originalUrl}  🔵🔵`
      );
      next();
      return;
    }
    if (process.env.NODE_ENV == "development") {
      Logger.debug(
        `${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `
      );
      next();
      return;
    }
    if (req.baseUrl == "/api/v1/association/getCountries") {
      Logger.debug(
        `${mm} 🔴 letting you get countries without a ticket! 🔵 🔵 🔵 `
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
      const decodedToken = await this.fbService
        .getFirebaseApp()
        .auth()
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
  private getClientIP(req: Request): string {
    // Check for the 'x-forwarded-for' header first
    let ip = req.headers["x-forwarded-for"] as string;

    // If not present, use the request's remote address
    if (!ip && req.socket) {
      ip = req.socket.remoteAddress;
    }

    // Handle multiple IPs in 'x-forwarded-for' (if any)
    if (typeof ip === "string" && ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    // Construct the full URL
    const protocol = req.protocol;
    const host = ip || "unknown"; // Use the retrieved IP or 'unknown'
    const port = req.socket?.localPort ? `:${req.socket.localPort}` : "";

    return host;
  }
}
