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
exports.CommuterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Commuter_1 = require("../data/models/Commuter");
const CommuterResponse_1 = require("../data/models/CommuterResponse");
const CommuterRequest_1 = require("../data/models/CommuterRequest");
const RouteLandmark_1 = require("../data/models/RouteLandmark");
const Route_1 = require("../data/models/Route");
const messaging_service_1 = require("../messaging/messaging.service");
const mm = 'CommuterService';
let CommuterService = class CommuterService {
    constructor(configService, messagingService, commuterModel, commuterResponseModel, commuterRequestModel, routeLandmarkModel, routeModel) {
        this.configService = configService;
        this.messagingService = messagingService;
        this.commuterModel = commuterModel;
        this.commuterResponseModel = commuterResponseModel;
        this.commuterRequestModel = commuterRequestModel;
        this.routeLandmarkModel = routeLandmarkModel;
        this.routeModel = routeModel;
    }
    async toRadians(degree) {
        return null;
    }
    async toDegrees(radian) {
        return null;
    }
    async generateRouteCommuterRequests(routeId) {
        return null;
    }
    async getAssociationCommuterRequests(associationId, startDate) {
        return [];
    }
    async lambda$0(arg0, arg1, arg2, arg3) {
        return null;
    }
    async getRouteCommuterRequests(routeId, startDate) {
        return [];
    }
    async createCommuter(commuter) {
        return null;
    }
    async createCommuterQRCode(commuter) {
        return null;
    }
    async addCommuter(commuter) {
        return this.commuterModel.create(commuter);
    }
    async addCommuterRequest(commuterRequest) {
        const req = await this.commuterRequestModel.create(commuterRequest);
        await this.messagingService.sendCommuterRequestMessage(req);
        return req;
    }
    async getCommuterRequests(associationId, startDate) {
        return this.commuterRequestModel.find({
            associationId: associationId,
            dateRequested: { $gte: startDate },
        });
    }
    async addCommuterResponse(commuterResponse) {
        const resp = await this.commuterResponseModel.create(commuterResponse);
        await this.messagingService.sendCommuterResponseMessage(resp);
        return resp;
    }
    async generateCommuters(count) {
        return [];
    }
    async makeBusyLandmark(route, commuters, minutesAgo, mark) {
        return null;
    }
    async writeCommuterRequest(route, minutesAgo, commuter, mark, passengers) {
        return null;
    }
    async getRandomPosition(pos) {
        return null;
    }
    async getCoordinateWithOffset(coordinate, offsetInMeters) {
        return null;
    }
};
exports.CommuterService = CommuterService;
exports.CommuterService = CommuterService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(Commuter_1.Commuter.name)),
    __param(3, (0, mongoose_1.InjectModel)(CommuterResponse_1.CommuterResponse.name)),
    __param(4, (0, mongoose_1.InjectModel)(CommuterRequest_1.CommuterRequest.name)),
    __param(5, (0, mongoose_1.InjectModel)(RouteLandmark_1.RouteLandmark.name)),
    __param(6, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        messaging_service_1.MessagingService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], CommuterService);
//# sourceMappingURL=CommuterService.js.map