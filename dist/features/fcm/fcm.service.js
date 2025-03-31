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
const firebase_util_1 = require("../../services/firebase_util");
const mm = "🎽 🎽 🎽 FCM MessagingService 🎽 🎽 🎽";
let MessagingService = class MessagingService {
    constructor(firebaseAdmin, associationTokenModel, kasieModel) {
        this.firebaseAdmin = firebaseAdmin;
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
        await this.sendToTopic(`${constants_1.Constants.kasieError}`, `Kasie Server Error`, `${kasieError.message} at: ${fmtDate}`, constants_1.Constants.kasieError, JSON.stringify(kasieError, null, 2), "");
    }
    async sendLocationRequestMessage(locationRequest) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationRequest.created, null);
        await this.sendToTopic(`${constants_1.Constants.locationRequest}${locationRequest.associationId}`, `Vehicle Location Request`, `Requested at ${fmtDate}`, constants_1.Constants.locationRequest, JSON.stringify(locationRequest, null, 2), locationRequest.associationId);
    }
    async sendLocationRequestMessageToDevice(locationRequest) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationRequest.created, null);
        await this.sendToDevice(locationRequest.vehicleFcmToken, `Vehicle Location Request`, `Requested at ${fmtDate}`, constants_1.Constants.locationRequest, JSON.stringify(locationRequest, null, 2));
        common_1.Logger.debug(`${mm} sendLocationRequestMessageToDevice: message sent to token: ${locationRequest.vehicleFcmToken} `);
    }
    async sendLocationResponseMessage(locationResponse) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationResponse.created, null);
        await this.sendToTopic(`${constants_1.Constants.locationResponse}${locationResponse.associationId}`, `Vehicle Location Response`, `Responded at ${fmtDate}`, constants_1.Constants.locationResponse, JSON.stringify(locationResponse, null, 2), locationResponse.associationId);
    }
    async sendLocationResponseErrorMessage(locationResponse) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationResponse.created, null);
        await this.sendToTopic(`${constants_1.Constants.locationResponseError}${locationResponse.associationId}`, `Vehicle Location Response Error`, `Responded at ${fmtDate}`, constants_1.Constants.locationResponseError, JSON.stringify(locationResponse, null, 2), locationResponse.associationId);
    }
    async sendLocationResponseErrorMessageToDevice(locationResponseError) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(locationResponseError.created, null);
        await this.sendToDevice(locationResponseError.fcmToken, `Vehicle Location Response Error`, `Responded at ${fmtDate}`, constants_1.Constants.locationResponseError, JSON.stringify(locationResponseError, null, 2));
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
        common_1.Logger.debug(`\n\n${mm} DispatchRecord sent to association topic: ${constants_1.Constants.dispatchRecord}${dispatch.associationId}`);
    }
    async sendRouteDispatchMessage(dispatch) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(dispatch.created, null);
        await this.sendToTopic(`${constants_1.Constants.routeDispatchRecord}${dispatch.routeId}`, `${dispatch.vehicleReg},`, `Dispatched at ${fmtDate}`, constants_1.Constants.routeDispatchRecord, JSON.stringify(dispatch), dispatch.associationId);
        common_1.Logger.log(`\n\n${mm} DispatchRecord sent to route topic: ${constants_1.Constants.routeDispatchRecord}${dispatch.routeId}`);
    }
    async sendCommuterCashMessage(payment) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(payment.created, null);
        await this.sendToTopic(`${constants_1.Constants.commuterCashPayment}${payment.associationId}`, `passengers: ${payment.numberOfPassengers} amount: ${payment.amount},`, `Processed at ${fmtDate}`, constants_1.Constants.commuterCashPayment, JSON.stringify(payment), payment.associationId);
    }
    async sendCommuterCashCheckInMessage(checkIn) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(checkIn.created, null);
        await this.sendToTopic(`${constants_1.Constants.commuterCashCheckIn}${checkIn.associationId}`, `amount: ${checkIn.amount},`, `Processed at ${fmtDate}`, constants_1.Constants.commuterCashCheckIn, JSON.stringify(checkIn), checkIn.associationId);
    }
    async sendCommuterPickupMessage(pickup) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(pickup.created, null);
        await this.sendToTopic(`${constants_1.Constants.commuterPickUp}${pickup.associationId}`, `vehicle: ${pickup.vehicleReg},`, `Picked up at ${fmtDate}`, constants_1.Constants.commuterCashCheckIn, JSON.stringify(pickup), pickup.associationId);
    }
    async sendRankFeeCashMessage(payment) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(payment.created, null);
        await this.sendToTopic(`${constants_1.Constants.rankFeeCashPayment}${payment.associationId}`, ` amount: ${payment.amount},`, `Processed at ${fmtDate}`, constants_1.Constants.rankFeeCashPayment, JSON.stringify(payment), payment.associationId);
    }
    async sendRankFeeCashCheckInMessage(checkIn) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(checkIn.created, null);
        await this.sendToTopic(`${constants_1.Constants.rankFeeCashCheckIn}${checkIn.associationId}`, `amount: ${checkIn.amount},`, `Processed at ${fmtDate}`, constants_1.Constants.rankFeeCashCheckIn, JSON.stringify(checkIn), checkIn.associationId);
    }
    async sendHeartbeatMessage(heartbeat) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(heartbeat.created, null);
        await this.sendToTopic(`${constants_1.Constants.heartbeat}${heartbeat.associationId}`, `${heartbeat.vehicleReg},`, `Heartbeat at ${fmtDate}`, constants_1.Constants.heartbeat, JSON.stringify(heartbeat, null, 2), heartbeat.associationId);
    }
    async sendTelemetryMessage(telemetry) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(telemetry.created, null);
        await this.sendToTopic(`${constants_1.Constants.telemetry}${telemetry.associationId}`, `${telemetry.vehicleReg},`, `Telemetry at ${fmtDate}`, constants_1.Constants.telemetry, JSON.stringify(telemetry, null, 2), telemetry.associationId);
    }
    async sendTripMessage(trip) {
        const fmtDate = my_utils_1.MyUtils.formatISOStringDate(trip.created, null);
        await this.sendToTopic(`${constants_1.Constants.trips}${trip.associationId}`, `${trip.vehicleReg},`, `Taxi Trip at ${fmtDate}`, constants_1.Constants.trips, JSON.stringify(trip, null, 2), trip.associationId);
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
        common_1.Logger.log(`\n\n${mm} CommuterRequest sent to association topic: ${constants_1.Constants.dispatchRecord}${req.associationId}`);
        await this.sendToTopic(`${constants_1.Constants.commuterRequest}${req.routeId}`, `${req.routeName},`, `Commuter Request on ${Date.now().toString()}`, constants_1.Constants.commuterRequest, JSON.stringify(req, null, 2), req.associationId);
        common_1.Logger.log(`\n\n${mm} CommuterRequest sent to route topic: ${constants_1.Constants.dispatchRecord}${req.routeId}`);
    }
    async sendInitialCommuterRequestResponseMessage(response) {
        await this.sendToDevice(`${response.fcmToken}`, `Acknowledgement of your Taxi Request,`, `Commuter Request on route: ${response.routeName}`, constants_1.Constants.commuterResponse, JSON.stringify(response, null, 2));
    }
    async sendLocationResponseMessageToDevice(response) {
        await this.sendToDevice(`${response.fcmToken}`, `Acknowledgement of your Location Request,`, `Current Location of: ${response.vehicleReg}`, constants_1.Constants.locationResponse, JSON.stringify(response, null, 2));
    }
    async sendCommuterResponseMessageToTopic(response) {
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
            common_1.Logger.debug(`${mm} ${type} FCM message sent to topic: ${topic}`);
        }
        catch (error) {
            common_1.Logger.error("Error sending message:", error);
            const err = new kasie_error_1.KasieError(`${type} Message Send Failed: ${error}`, common_1.HttpStatus.BAD_REQUEST);
            await this.kasieModel.create(err);
        }
    }
    async sendToDevice(fcmToken, title, body, type, data) {
        if (!fcmToken) {
            common_1.Logger.error("FCM token is required but was not provided.");
            throw new kasie_error_1.KasieError("FCM token is required.", common_1.HttpStatus.BAD_REQUEST);
        }
        const message = {
            data: {
                type: type,
                data: data,
            },
            token: fcmToken,
            notification: {
                title: title,
                body: body,
            },
        };
        try {
            const response = await admin.messaging().send(message);
            common_1.Logger.debug(`${mm} 🥬🥬🥬🥬 sendToDevice: Firebase fcmToken: 🥬 ${fcmToken} - response: ${response}`);
        }
        catch (error) {
            common_1.Logger.error("👿👿👿👿👿 Error sending message:", error);
            const err = new kasie_error_1.KasieError(`${type} 👿 Message Send Failed: ${error}`, common_1.HttpStatus.BAD_REQUEST);
            await this.kasieModel.create(err);
            throw err;
        }
    }
    async sendToPossibleAssociationDevices(associationId, title, body, type, data) {
        const associationTokens = await this.associationTokenModel
            .find({ associationId: associationId })
            .sort({ created: -1 });
        for (const tok of associationTokens) {
            if (await this.checkIfValid(tok.token)) {
                common_1.Logger.debug(`${mm} Firebase token is valid!`);
                this.sendToDevice(tok.token, title, body, type, data);
            }
        }
    }
    async checkIfValid(token) {
        try {
            const auth = this.firebaseAdmin.getFirebaseApp().auth();
            const m = await auth.verifyIdToken(token);
            common_1.Logger.debug(`Is auth verified?? ${m}`);
            const currentTime = Math.floor(Date.now() / 1000);
            if (m.exp < currentTime) {
                common_1.Logger.debug("Token has expired");
                return false;
            }
            else {
                common_1.Logger.debug("Token is still valid");
                return true;
            }
        }
        catch (error) {
            common_1.Logger.error("Error verifying token:", error);
        }
    }
    async subscribeToEveryThing() {
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(AssociationToken_1.AssociationToken.name)),
    __param(2, (0, mongoose_2.InjectModel)(kasie_error_1.KasieError.name)),
    __metadata("design:paramtypes", [firebase_util_1.FirebaseAdmin, mongoose_1.default.Model, mongoose_1.default.Model])
], MessagingService);
//# sourceMappingURL=fcm.service.js.map