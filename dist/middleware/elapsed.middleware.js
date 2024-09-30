"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElapsedTimeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
let ElapsedTimeMiddleware = class ElapsedTimeMiddleware {
    use(req, res, next) {
        const start = Date.now();
        res.on("finish", async () => {
            const elapsed = (Date.now() - start) / 1000;
            common_1.Logger.log(`${mm} ${req.originalUrl} `);
            let tag = "🥬🥬🥬";
            if (res.statusCode > 201) {
                tag = "😈😈😈";
            }
            common_1.Logger.log(`${mm} request took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`);
        });
        next();
    }
};
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware;
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware = __decorate([
    (0, common_1.Injectable)()
], ElapsedTimeMiddleware);
//# sourceMappingURL=elapsed.middleware.js.map