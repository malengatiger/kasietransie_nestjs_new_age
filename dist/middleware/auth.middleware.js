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
const my_utils_1 = require("../my-utils/my-utils");
const firebase_util_1 = require("../services/firebase_util");
const mm = '🔑🔑🔑🔑 AuthMiddleware 🔑🔑';
const errorMessage = '🔴 🔴 🔴 Request is Unauthorized';
let AuthMiddleware = class AuthMiddleware {
    constructor(fbService) {
        this.fbService = fbService;
    }
    async use(req, res, next) {
        const authToken = req.headers.authorization;
        common_1.Logger.log(`${mm} request url: ${req.originalUrl} `);
        const serverIP = my_utils_1.MyUtils.getServerIPaddress();
        common_1.Logger.debug(`${mm} server ip address: ${serverIP}`);
        if (serverIP.includes('192.168.64.1') || serverIP.includes('localhost')) {
            common_1.Logger.debug(`${mm} 🔵🔵🔵🔵🔵🔵 Getting into the club without a Diddy pass! 🥦 You are from: 🔵 ${serverIP} 🔵🔵`);
            next();
            return;
        }
        if (process.env.NODE_ENV == 'development') {
            common_1.Logger.debug(`${mm} 🔴 letting you into the club without a ticket! 🔵 🔵 🔵 `);
            next();
            return;
        }
        if (req.baseUrl == '/api/v1/association/getCountries') {
            common_1.Logger.debug(`${mm} 🔴 letting you get countries without a ticket! 🔵 🔵 🔵 `);
            next();
            return;
        }
        if (!authToken) {
            common_1.Logger.log(`${mm} authentication token not found in request header 🔴`);
            return res.status(401).json({
                message: errorMessage,
                statusCode: 401,
                date: new Date().toISOString(),
            });
        }
        try {
            const token = authToken.substring(7);
            common_1.Logger.log(`${mm} authentication continua: 🔵 token: ${token}`);
            const decodedToken = await this.fbService.getFirebaseApp().auth().verifyIdToken(token);
            req.user = decodedToken;
            common_1.Logger.log(`${mm} authentication seems OK; ✅ req: ${req}`);
            next();
        }
        catch (error) {
            common_1.Logger.log(`${mm} Error verifying authentication token: 🔴 ${error} 🔴`);
            return res.status(403).json({
                message: errorMessage,
                statusCode: 403,
                date: new Date().toISOString(),
            });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_util_1.FirebaseAdmin])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map