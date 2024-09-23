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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const firebase_util_1 = require("../services/firebase_util");
const tag = '🔑🔑🔑 AuthGuard 🔑';
let AuthGuard = class AuthGuard {
    constructor(reflector, admin) {
        this.reflector = reflector;
        this.admin = admin;
    }
    async canActivate(context) {
        console.log(`${tag} canActivate .... `);
        const app = this.admin.getFirebaseApp();
        const idToken = context.getArgs()[0]?.headers?.authorization.split(" ")[1];
        const permissions = this.reflector.get("permissions", context.getHandler());
        try {
            const claims = await app.auth().verifyIdToken(idToken);
            console.log(`${tag} claims: ${JSON.stringify(claims, null, 2)}`);
            if (claims.role === permissions[0]) {
                return true;
            }
            throw new common_1.UnauthorizedException();
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        firebase_util_1.FirebaseAdmin])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map