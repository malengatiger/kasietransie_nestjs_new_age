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
const AssociationToken_1 = require("../../data/models/AssociationToken");
const mm = '🎽 🎽 🎽 MessagingService';
let MessagingService = class MessagingService {
    constructor(associationTokenModel, kasieModel) {
        this.associationTokenModel = associationTokenModel;
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
    }
    async sendAppErrorMessage(appError) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(appError.created, null);
        await this.sendToTopic(`${constants_1.Constants.appError}`, `Kasie Mobile App Error`, `${appError.errorMessage} at ${fmtDate}`, constants_1.Constants.appError, JSON.stringify(appError, null, 2), appError.associationId);
    }
    async sendKasieErrorMessage(kasieError) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(kasieError.date, null);
        await this.sendToTopic(`${constants_1.Constants.kasieError}`, `Kasie Server Error`, `${kasieError.message} at: ${fmtDate}`, constants_1.Constants.kasieError, JSON.stringify(kasieError, null, 2), '');
    }
    async sendLocationRequestMessage(locationRequest) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationRequest.created, null);
        await this.sendToTopic(`${constants_1.Constants.locationRequest}${locationRequest.associationId}`, `Vehicle Location Request`, `Requested at ${fmtDate}`, constants_1.Constants.locationRequest, JSON.stringify(locationRequest, null, 2), locationRequest.associationId);
    }
    async sendLocationResponseMessage(locationResponse) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationResponse.created, null);
        await this.sendToTopic(`${constants_1.Constants.locationResponse}${locationResponse.associationId}`, `Vehicle Location Response`, `Responded at ${fmtDate}`, constants_1.Constants.locationResponse, JSON.stringify(locationResponse, null, 2), locationResponse.associationId);
    }
    async sendVehicleArrivalMessage(arrival) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(arrival.created, null);
        await this.sendToTopic(`${constants_1.Constants.vehicleArrival}${arrival.associationId}`, `${arrival.vehicleReg},`, `Arrived at ${fmtDate}`, constants_1.Constants.vehicleArrival, JSON.stringify(arrival, null, 2), arrival.associationId);
    }
    async sendVehicleDepartureMessage(departure) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(departure.created, null);
        await this.sendToTopic(`${constants_1.Constants.vehicleDeparture}${departure.associationId}`, `${departure.vehicleReg},`, `Departed at ${fmtDate}`, constants_1.Constants.vehicleDeparture, JSON.stringify(departure, null, 2), departure.associationId);
    }
    async sendDispatchMessage(dispatch) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(dispatch.created, null);
        await this.sendToTopic(`${constants_1.Constants.dispatchRecord}${dispatch.associationId}`, `${dispatch.vehicleReg},`, `Dispatched at ${fmtDate}`, constants_1.Constants.dispatchRecord, JSON.stringify(dispatch), dispatch.associationId);
    }
    async sendHeartbeatMessage(heartbeat) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(heartbeat.created, null);
        await this.sendToTopic(`${constants_1.Constants.heartbeat}${heartbeat.associationId}`, `${heartbeat.vehicleReg},`, `Heartbeat at ${fmtDate}`, constants_1.Constants.heartbeat, JSON.stringify(heartbeat, null, 2), heartbeat.associationId);
    }
    async sendTelemetryMessage(telemetry) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(telemetry.created, null);
        await this.sendToTopic(`${constants_1.Constants.heartbeat}${telemetry.associationId}`, `${telemetry.vehicleReg},`, `Telemetry at ${fmtDate}`, constants_1.Constants.heartbeat, JSON.stringify(telemetry, null, 2), telemetry.associationId);
    }
    async sendPassengerCountMessage(count) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(count.created, null);
        await this.sendToTopic(`${constants_1.Constants.passengerCount}${count.associationId}`, `${count.vehicleReg},`, `PassengerCount on ${fmtDate}`, constants_1.Constants.passengerCount, JSON.stringify(count, null, 2), count.associationId);
    }
    async sendRouteUpdateMessage(req) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.sendToTopic(`${constants_1.Constants.routeUpdateRequest}${req.associationId}`, `${req.routeName},`, `Route Updated on ${Date.now().toString()}`, constants_1.Constants.routeUpdateRequest, JSON.stringify(req, null, 2), req.associationId);
    }
    async sendCommuterRequestMessage(req) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.sendToTopic(`${constants_1.Constants.commuterRequest}${req.associationId}`, `${req.routeName},`, `Commuter Request on ${Date.now().toString()}`, constants_1.Constants.commuterRequest, JSON.stringify(req, null, 2), req.associationId);
    }
    async sendInitialCommuterRequestResponseMessage(response) {
        await this.sendToDevice(`${response.fcmToken}`, `Acknowledgement of your Taxi Request,`, `Commuter Request on route: ${response.routeName}`, constants_1.Constants.commuterResponse, JSON.stringify(response, null, 2));
    }
    async sendCommuterResponseMessage(response) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.sendToTopic(`${constants_1.Constants.commuterResponse}${response.associationId}`, `${response.routeName},`, `Commuter Response on ${Date.now().toString()}`, constants_1.Constants.commuterResponse, JSON.stringify(response, null, 2), response.associationId);
    }
    async sendAssociationRegisteredMessage(assoc) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(Date.now().toString(), null);
        await this.sendToTopic(`${constants_1.Constants.association}${assoc.associationId}`, `${assoc.associationName},`, ` Registered on ${fmtDate}`, constants_1.Constants.association, JSON.stringify(assoc, null, 2), assoc.associationId);
    }
    async sendToTopic(topic, title, body, type, data, associationId) {
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
            const associationToken = await this.associationTokenModel.findOne({
                associationId: associationId,
            });
            if (associationToken) {
                const messageDirect = {
                    token: associationToken.token,
                    data: {
                        type: type,
                        data: data,
                    },
                    notification: {
                        title: title,
                        body: body,
                    },
                };
                if (type === constants_1.Constants.admin ||
                    type === constants_1.Constants.appError ||
                    type === constants_1.Constants.kasieError) {
                    return;
                }
                await admin.messaging().send(messageDirect);
            }
            common_1.Logger.debug(`${mm} 🅿️🅿️🅿️ Successfully sent FCM message to topic and association (if appropriate) `
                + `\n🚺 🚺 🚺 topic: ${topic} message type: ${type} 🚺 title: ${JSON.stringify(title)}`);
        }
        catch (error) {
            common_1.Logger.error('Error sending message:', error);
            const err = new kasie_error_1.KasieError(`${type} Message Send Failed: ${error}`, common_1.HttpStatus.BAD_REQUEST);
            await this.kasieModel.create(err);
        }
    }
    async sendToDevice(fcmToken, title, body, type, data) {
        const message = {
            token: fcmToken,
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
            common_1.Logger.debug(`${mm} 🅿️ 🅿️ 🅿️ Successfully sent FCM message to single device `
                + `🚺 🚺 🚺 message type: ${type} 🚺 title: ${JSON.stringify(title)} \n ${fcmToken}`);
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
    __param(0, (0, mongoose_2.InjectModel)(AssociationToken_1.AssociationToken.name)),
    __param(1, (0, mongoose_2.InjectModel)(kasie_error_1.KasieError.name)),
    __metadata("design:paramtypes", [mongoose_1.default.Model, mongoose_1.default.Model])
], MessagingService);
//# sourceMappingURL=fcm.service.js.map