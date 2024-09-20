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
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const my_utils_1 = require("../../my-utils/my-utils");
const constants_1 = require("../../my-utils/constants");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const kasie_error_1 = require("../../data/models/kasie.error");
const mm = '🎽 🎽 🎽 MessagingService';
let MessagingService = class MessagingService {
    constructor(kasieModel) {
        this.kasieModel = kasieModel;
    }
    async sendAppErrorMessages(appErrors) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(new Date().toISOString(), null);
        appErrors.appErrorList.forEach((e) => {
            try {
                this.sendAppErrorMessage(e);
            }
            catch (e) {
                common_1.Logger.debug(`${e}`);
            }
        });
        return null;
    }
    async sendAppErrorMessage(appError) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(appError.created, null);
        await this.send(`${constants_1.Constants.appError}`, `Kasie Mobile App Error`, `${appError.errorMessage} at ${fmtDate}`, constants_1.Constants.appError, JSON.stringify(appError, null, 2), appError.associationId);
        return null;
    }
    async sendKasieErrorMessage(kasieError) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(kasieError.date, null);
        await this.send(`${constants_1.Constants.kasieError}`, `Kasie Server Error`, `${kasieError.message} at: ${fmtDate}`, constants_1.Constants.kasieError, JSON.stringify(kasieError, null, 2), '');
        return null;
    }
    async sendLocationRequestMessage(locationRequest) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationRequest.created, null);
        await this.send(`${constants_1.Constants.locationRequest}${locationRequest.associationId}`, `Vehicle Location Request`, `Requested at ${fmtDate}`, constants_1.Constants.locationRequest, JSON.stringify(locationRequest, null, 2), locationRequest.associationId);
        return null;
    }
    async sendLocationResponseMessage(locationResponse) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationResponse.created, null);
        await this.send(`${constants_1.Constants.locationResponse}${locationResponse.associationId}`, `Vehicle Location Response`, `Responded at ${fmtDate}`, constants_1.Constants.locationResponse, JSON.stringify(locationResponse, null, 2), locationResponse.associationId);
        return null;
    }
    async sendVehicleArrivalMessage(arrival) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(arrival.created, null);
        await this.send(`${constants_1.Constants.vehicleArrival}${arrival.associationId}`, `${arrival.vehicleReg},`, `Arrived at ${fmtDate}`, constants_1.Constants.vehicleArrival, JSON.stringify(arrival, null, 2), arrival.associationId);
        return null;
    }
    async sendVehicleDepartureMessage(departure) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(departure.created, null);
        await this.send(`${constants_1.Constants.vehicleDeparture}${departure.associationId}`, `${departure.vehicleReg},`, `Departed at ${fmtDate}`, constants_1.Constants.vehicleDeparture, JSON.stringify(departure, null, 2), departure.associationId);
        return null;
    }
    async sendDispatchMessage(dispatch) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(dispatch.created, null);
        await this.send(`${constants_1.Constants.dispatchRecord}${dispatch.associationId}`, `${dispatch.vehicleReg},`, `Dispatched at ${fmtDate}`, constants_1.Constants.dispatchRecord, JSON.stringify(dispatch), dispatch.associationId);
        return null;
    }
    async sendHeartbeatMessage(heartbeat) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(heartbeat.created, null);
        await this.send(`${constants_1.Constants.heartbeat}${heartbeat.associationId}`, `${heartbeat.vehicleReg},`, `Heartbeat at ${fmtDate}`, constants_1.Constants.heartbeat, JSON.stringify(heartbeat, null, 2), heartbeat.associationId);
        return null;
    }
    async sendPassengerCountMessage(count) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(count.created, null);
        await this.send(`${constants_1.Constants.passengerCount}${count.associationId}`, `${count.vehicleReg},`, `PassengerCount on ${fmtDate}`, constants_1.Constants.passengerCount, JSON.stringify(count, null, 2), count.associationId);
        return null;
    }
    async sendRouteUpdateMessage(req) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.send(`${constants_1.Constants.routeUpdateRequest}${req.associationId}`, `${req.routeName},`, `Route Updated on ${Date.now().toString()}`, constants_1.Constants.routeUpdateRequest, JSON.stringify(req, null, 2), req.associationId);
        return null;
    }
    async sendCommuterRequestMessage(req) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.send(`${constants_1.Constants.commuterRequest}${req.associationId}`, `${req.routeName},`, `Commuter Request on ${Date.now().toString()}`, constants_1.Constants.commuterRequest, JSON.stringify(req, null, 2), req.associationId);
        return null;
    }
    async sendCommuterResponseMessage(response) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.send(`${constants_1.Constants.commuterResponse}${response.associationId}`, `${response.routeName},`, `Commuter Response on ${Date.now().toString()}`, constants_1.Constants.commuterResponse, JSON.stringify(response, null, 2), response.associationId);
        return null;
    }
    async send(topic, title, body, type, data, associationId) {
        const message = {
            topic: topic,
            data: {
                type: type,
                data: data,
            },
            notification: {
                title: title,
                body: body,
            },
        };
        try {
            await admin.messaging().send(message);
            common_1.Logger.debug(`${mm} 🅿️🅿️🅿️ Successfully sent FCM message to topic and associations 🚺 🚺 🚺 topic: ${topic} message type: ${type} 🚺 title: ${title}`);
        }
        catch (error) {
            common_1.Logger.error('Error sending message:', error);
            const err = new kasie_error_1.KasieError(`${type} Message Send Failed: ${error}`, common_1.HttpStatus.BAD_REQUEST);
            await this.kasieModel.create(err);
        }
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(kasie_error_1.KasieError.name)),
    __metadata("design:paramtypes", [mongoose_1.default.Model])
], MessagingService);
//# sourceMappingURL=fcm.service.js.map