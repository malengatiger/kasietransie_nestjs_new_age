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
const Commuter_1 = require("../../data/models/Commuter");
const CommuterResponse_1 = require("../../data/models/CommuterResponse");
const CommuterRequest_1 = require("../../data/models/CommuterRequest");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const Route_1 = require("../../data/models/Route");
const fcm_service_1 = require("../fcm/fcm.service");
const crypto_1 = require("crypto");
const storage_service_1 = require("../../storage/storage.service");
const CommuterPickup_1 = require("../../data/models/CommuterPickup");
const mm = "CommuterService";
let CommuterService = class CommuterService {
    constructor(configService, messagingService, storage, commuterModel, commuterPickUpModel, commuterResponseModel, commuterRequestModel, routeLandmarkModel, routeModel) {
        this.configService = configService;
        this.messagingService = messagingService;
        this.storage = storage;
        this.commuterModel = commuterModel;
        this.commuterPickUpModel = commuterPickUpModel;
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
        const requests = await this.commuterRequestModel.find({
            associationId: associationId,
            dateRequested: { $gte: startDate }
        });
        common_1.Logger.debug(`${mm} commuter requests since ${startDate} : ${requests.length} for association: ${associationId}`);
        return requests;
    }
    async lambda$0(arg0, arg1, arg2, arg3) {
        return null;
    }
    async getRouteCommuterRequests(routeId, startDate) {
        const requests = await this.commuterRequestModel.find({
            routeId: routeId,
            dateRequested: { $gte: startDate }
        });
        common_1.Logger.debug(`${mm} commuter requests since ${startDate} : ${requests.length} for route: ${routeId}`);
        return requests;
    }
    async createCommuter(commuter) {
        return null;
    }
    async createCommuterQRCode(commuter) {
        return null;
    }
    async addCommuter(commuter) {
        commuter.created = new Date().toISOString();
        const url = await this.storage.createQRCode({
            data: JSON.stringify(commuter),
            prefix: 'commuter',
            size: 1,
            associationId: null,
        });
        commuter.qrCodeUrl = url;
        const res = this.commuterModel.create(commuter);
        common_1.Logger.debug(`CommuterService: added commuter to Atlas: ${JSON.stringify(res, null, 2)}`);
        return res;
    }
    async updateCommuter(commuter) {
        commuter.created = new Date().toISOString();
        const url = await this.storage.createQRCode({
            data: JSON.stringify(commuter),
            prefix: 'commuter',
            size: 2,
            associationId: null,
        });
        commuter.qrCodeUrl = url;
        const res = this.commuterModel.updateOne({ commuterId: commuter.cellphone }, commuter);
        common_1.Logger.debug(`CommuterService: updated commuter to Atlas: ${JSON.stringify(res, null, 2)}`);
        return res;
    }
    async addCommuterRequest(commuterRequest) {
        const mDateNeeded = new Date(commuterRequest.dateNeeded);
        commuterRequest.mDateNeeded = mDateNeeded;
        commuterRequest.dateRequested = new Date().toISOString();
        const mDateRequested = new Date(commuterRequest.dateRequested);
        commuterRequest.mDateRequested = mDateRequested;
        const req = await this.commuterRequestModel.create(commuterRequest);
        await this.messagingService.sendCommuterRequestMessage(req);
        const resp = new CommuterResponse_1.CommuterResponse();
        resp.associationId = req.associationId;
        resp.commuterRequestId = req.commuterRequestId;
        resp.fcmToken = req.fcmToken;
        resp.message = "We have received your Taxi Request. Thank you!";
        resp.routeId = req.routeId;
        resp.routeName = req.routeName;
        resp.commuterId = req.commuterId;
        resp.commuterResponseId = (0, crypto_1.randomUUID)();
        resp.responseDate = new Date().toISOString();
        await this.messagingService.sendInitialCommuterRequestResponseMessage(resp);
        common_1.Logger.debug(`${mm} commuter request added and fcm messages sent`);
        return req;
    }
    async addCommuterPickUp(commuterPickup) {
        const created = new Date().toISOString();
        commuterPickup.created = created;
        const req = await this.commuterPickUpModel.create(commuterPickup);
        await this.messagingService.sendCommuterPickupMessage(req);
        common_1.Logger.debug(`${mm} commuter pickup added and fcm messages sent`);
        return req;
    }
    async getCommuterRequests(commuterId, startDate) {
        if (!startDate) {
            return this.commuterRequestModel.find({
                commuterId: commuterId,
            });
        }
        return this.commuterRequestModel.find({
            commuterId: commuterId,
            dateRequested: { $gte: startDate },
        });
    }
    async addCommuterResponse(commuterResponse) {
        const mDate = new Date(commuterResponse.created);
        commuterResponse.mDate = mDate;
        const resp = await this.commuterResponseModel.create(commuterResponse);
        await this.messagingService.sendCommuterResponseMessageToTopic(resp);
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
    __param(3, (0, mongoose_1.InjectModel)(Commuter_1.Commuter.name)),
    __param(4, (0, mongoose_1.InjectModel)(CommuterPickup_1.CommuterPickup.name)),
    __param(5, (0, mongoose_1.InjectModel)(CommuterResponse_1.CommuterResponse.name)),
    __param(6, (0, mongoose_1.InjectModel)(CommuterRequest_1.CommuterRequest.name)),
    __param(7, (0, mongoose_1.InjectModel)(RouteLandmark_1.RouteLandmark.name)),
    __param(8, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        fcm_service_1.MessagingService,
        storage_service_1.CloudStorageUploaderService, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model, mongoose_2.default.Model])
], CommuterService);
//# sourceMappingURL=commuter.service.js.map