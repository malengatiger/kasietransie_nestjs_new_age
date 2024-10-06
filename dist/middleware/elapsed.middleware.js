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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElapsedTimeMiddleware = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const app_service_1 = require("../app.service");
const QueryElapsedTime_1 = require("../data/models/QueryElapsedTime");
const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
let ElapsedTimeMiddleware = class ElapsedTimeMiddleware {
    constructor(appService, qelModel) {
        this.appService = appService;
        this.qelModel = qelModel;
    }
    use(req, res, next) {
        const start = Date.now();
        res.on("finish", async () => {
            const elapsed = (Date.now() - start) / 1000;
            let tag = "🥬🥬🥬";
            if (res.statusCode > 201) {
                tag = "😈😈😈";
            }
            const yes = process.env.ADD_ELAPSED_TIME;
            if (yes === "yes") {
                const qel = new QueryElapsedTime_1.QueryElapsedTime();
                qel.created = new Date().toISOString();
                qel.elapsedSeconds = elapsed;
                qel.statusCode = res.statusCode;
                qel.queryParameters = JSON.stringify(req.query);
                qel.url = req.url;
                qel.longDate = new Date().getTime();
                qel.queryId = `${new Date().getTime()}${Math.random() * 100}`;
                await this.qelModel.create(qel);
                common_1.Logger.debug(`${mm} QueryElapsedTime added to MongoDB Atlas 🔶 🔶 🔶 \n🔶 🔶 🔶 QueryElapsedTime: ${JSON.stringify(qel, null, 2)}`);
            }
            common_1.Logger.debug(`${mm} request ${req.originalUrl} took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`);
        });
        next();
    }
};
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware;
exports.ElapsedTimeMiddleware = ElapsedTimeMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(QueryElapsedTime_1.QueryElapsedTime.name)),
    __metadata("design:paramtypes", [app_service_1.AppService, mongoose_2.default.Model])
], ElapsedTimeMiddleware);
//# sourceMappingURL=elapsed.middleware.js.map