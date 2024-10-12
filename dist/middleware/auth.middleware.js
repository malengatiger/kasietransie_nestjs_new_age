"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_util_1 = require("../services/firebase_util");
const mm = "🔑🔑 AuthMiddleware 🔑";
const errorMessage = "🔴 🔴 🔴 Request is Unauthorized";
let AuthMiddleware = class AuthMiddleware {
    constructor(fbService) {
        this.fbService = fbService;
    }
    async use(req, res, next) {
        const authToken = req.headers.authorization;
        const authOverride = process.env.AUTH_OVERRIDE;
        if (authOverride == "yes") {
            const allowedIPs = [
                "127.0.0.1",
                "::1",
                "192.168.64.1",
                "localhost",
                "192.168.88.253",
            ];
            const clientIP = this.getClientIP(req);
            let allow = false;
            allowedIPs.forEach((ip) => {
                if (clientIP.includes(ip)) {
                    allow = true;
                }
            });
            if (allow) {
                common_1.Logger.log(`\n\n${mm} 🔵🔵🔵🔵🔵🔵 Letting you into the club without a Diddy ticket! 🍎 Request from: 🔵  ${req.originalUrl}  🔵🔵\n`);
                next();
                return;
            }
        }
        if (process.env.NODE_ENV == "development") {
            common_1.Logger.debug(`${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `);
            next();
            return;
        }
        if (req.baseUrl == "/api/v1/association/getCountries") {
            common_1.Logger.debug(`${mm} 🔴 letting you get countries without a ticket! 🔵 🔵 🔵 `);
            next();
            return;
        }
        if (!authToken) {
            common_1.Logger.log(`${mm} authentication token not found in request header 🔴`);
            return res.status(401).json({
                message: `authentication token not found in request header 🔴`,
                statusCode: 401,
                date: new Date().toISOString(),
            });
        }
        try {
            const token = authToken.substring(7);
            if (token) {
                const decodedToken = await this.fbService
                    .getFirebaseApp()
                    .auth()
                    .verifyIdToken(token);
                req.user = decodedToken;
                common_1.Logger.log(`\n\n${mm} authentication seems OK; ✅ ✅ ✅ request user email: ${req.user.email} ✅ \n`);
                next();
            }
            else {
                return res.status(403).json({
                    message: `🔴🔴🔴 Authentication Token missing 🔴🔴🔴`,
                    statusCode: 401,
                    date: new Date().toISOString(),
                });
            }
        }
        catch (error) {
            common_1.Logger.log(`\n\n${mm} Error verifying authentication token: 🔴 ${error} 🔴`);
            return res.status(403).json({
                message: `🔴🔴🔴 ${error} 🔴🔴🔴`,
                statusCode: 403,
                date: new Date().toISOString(),
            });
        }
    }
    getClientIP(req) {
        let ip = req.headers["x-forwarded-for"];
        if (!ip && req.socket) {
            ip = req.socket.remoteAddress;
        }
        if (typeof ip === "string" && ip.includes(",")) {
            ip = ip.split(",")[0].trim();
        }
        const protocol = req.protocol;
        const host = ip || "unknown";
        const port = req.socket?.localPort ? `:${req.socket.localPort}` : "";
        return host;
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_util_1.FirebaseAdmin])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map