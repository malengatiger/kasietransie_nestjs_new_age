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
exports.ElapsedTimeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("../app.service");
const QueryElapsedTime_1 = require("../data/models/QueryElapsedTime");
const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
let ElapsedTimeMiddleware = class ElapsedTimeMiddleware {
    constructor(appService) {
        this.appService = appService;
    }
    use(req, res, next) {
        const start = Date.now();
        res.on("finish", async () => {
            const elapsed = (Date.now() - start) / 1000;
            common_1.Logger.log(`${mm} ${req.originalUrl} `);
            let tag = "🥬🥬🥬";
            if (res.statusCode > 201) {
                tag = "😈😈😈";
            }
            const qel = new QueryElapsedTime_1.QueryElapsedTime();
            qel;
            common_1.Logger.log(`${mm} request took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`);
        });
        next();
    }
};
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware;
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], ElapsedTimeMiddleware);
//# sourceMappingURL=elapsed.middleware.js.map