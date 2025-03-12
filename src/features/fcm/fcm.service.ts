/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import * as admin from "firebase-admin";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { MyUtils } from "src/my-utils/my-utils";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import { Constants } from "src/my-utils/constants";

import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { AppErrors } from "src/data/helpers/AppErrors";
import { AppError } from "src/data/models/AppError";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { CommuterResponse } from "src/data/models/CommuterResponse";
import { LocationRequest } from "src/data/models/LocationRequest";
import { LocationResponse } from "src/data/models/LocationResponse";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { KasieError } from "src/data/models/kasie.error";
import { Association } from "src/data/models/Association";
import { AssociationToken } from "src/data/models/AssociationToken";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { Trip } from "src/data/models/Trip";
import { LocationResponseError } from "src/data/models/LocationResponseError";
import { CommuterPickup } from "src/data/models/CommuterPickup";
import { getMessaging } from "firebase-messaging";

const mm = "🎽 🎽 🎽 FCM MessagingService 🎽 🎽 🎽";

@Injectable()
export class MessagingService {
  constructor(
    @InjectModel(AssociationToken.name)
    private associationTokenModel: mongoose.Model<AssociationToken>,
    @InjectModel(KasieError.name)
    private kasieModel: mongoose.Model<KasieError>
  ) {}

  async sendAppErrorMessages(appErrors: AppErrors) {
    const fmtDate = MyUtils.formatISOStringDate(new Date().toISOString(), null);
    appErrors.appErrorList.forEach((e) => {
      try {
        this.sendAppErrorMessage(e);
      } catch (e) {
        Logger.debug(`${e}`);
      }
    });
  }

  async sendAppErrorMessage(appError: AppError) {
    const fmtDate = MyUtils.formatISOStringDate(appError.created, null);
    await this.sendToTopic(
      `${Constants.appError}`,
      `Kasie Mobile App Error`,
      `${appError.errorMessage} at ${fmtDate}`,
      Constants.appError,
      JSON.stringify(appError, null, 2),
      appError.associationId
    );
  }

  async sendKasieErrorMessage(kasieError: KasieError) {
    const fmtDate = MyUtils.formatISOStringDate(kasieError.date, null);
    await this.sendToTopic(
      `${Constants.kasieError}`,
      `Kasie Server Error`,
      `${kasieError.message} at: ${fmtDate}`,
      Constants.kasieError,
      JSON.stringify(kasieError, null, 2),
      ""
    );
  }

  async sendLocationRequestMessage(locationRequest: LocationRequest) {
    const fmtDate = MyUtils.formatISOStringDate(locationRequest.created, null);
    await this.sendToTopic(
      `${Constants.locationRequest}${locationRequest.associationId}`,
      `Vehicle Location Request`,
      `Requested at ${fmtDate}`,
      Constants.locationRequest,
      JSON.stringify(locationRequest, null, 2),
      locationRequest.associationId
    );
  }
  async sendLocationRequestMessageToDevice(locationRequest: LocationRequest) {
    const fmtDate = MyUtils.formatISOStringDate(locationRequest.created, null);
    await this.sendToDevice(
      locationRequest.vehicleFcmToken,
      `Vehicle Location Request`,
      `Requested at ${fmtDate}`,
      Constants.locationRequest,
      JSON.stringify(locationRequest, null, 2)
    );
    Logger.debug(
      `${mm} sendLocationRequestMessageToDevice: message sent to token: ${locationRequest.vehicleFcmToken} `
    );
  }

  //http://192.168.86.242:8080/api/v1/getAssociationCounts?associationId=2f3faebd-6159-4b03-9857-9dad6d9a82ac&startDate=2023-09-14T06:52:32.929Z
  async sendLocationResponseMessage(locationResponse: LocationResponse) {
    const fmtDate = MyUtils.formatISOStringDate(locationResponse.created, null);
    await this.sendToTopic(
      `${Constants.locationResponse}${locationResponse.associationId}`,
      `Vehicle Location Response`,
      `Responded at ${fmtDate}`,
      Constants.locationResponse,
      JSON.stringify(locationResponse, null, 2),
      locationResponse.associationId
    );
  }
  async sendLocationResponseErrorMessage(
    locationResponse: LocationResponseError
  ) {
    const fmtDate = MyUtils.formatISOStringDate(locationResponse.created, null);
    await this.sendToTopic(
      `${Constants.locationResponseError}${locationResponse.associationId}`,
      `Vehicle Location Response Error`,
      `Responded at ${fmtDate}`,
      Constants.locationResponseError,
      JSON.stringify(locationResponse, null, 2),
      locationResponse.associationId
    );
  }
  async sendLocationResponseErrorMessageToDevice(
    locationResponseError: LocationResponseError
  ) {
    const fmtDate = MyUtils.formatISOStringDate(
      locationResponseError.created,
      null
    );
    await this.sendToDevice(
      locationResponseError.fcmToken,
      `Vehicle Location Response Error`,
      `Responded at ${fmtDate}`,
      Constants.locationResponseError,
      JSON.stringify(locationResponseError, null, 2)
    );
  }

  async sendVehicleArrivalMessage(arrival: VehicleArrival) {
    const fmtDate = MyUtils.formatISOStringDate(arrival.created, null);
    await this.sendToTopic(
      `${Constants.vehicleArrival}${arrival.associationId}`,
      `${arrival.vehicleReg},`,
      `Arrived at ${fmtDate}`,
      Constants.vehicleArrival,
      JSON.stringify(arrival, null, 2),
      arrival.associationId
    );
  }
  async sendVehicleDepartureMessage(departure: VehicleDeparture) {
    const fmtDate = MyUtils.formatISOStringDate(departure.created, null);
    await this.sendToTopic(
      `${Constants.vehicleDeparture}${departure.associationId}`,
      `${departure.vehicleReg},`,
      `Departed at ${fmtDate}`,
      Constants.vehicleDeparture,
      JSON.stringify(departure, null, 2),
      departure.associationId
    );
  }

  async sendDispatchMessage(dispatch: DispatchRecord) {
    const fmtDate = MyUtils.formatISOStringDate(dispatch.created, null);

    await this.sendToTopic(
      `${Constants.dispatchRecord}${dispatch.associationId}`,
      `${dispatch.vehicleReg},`,
      `Dispatched at ${fmtDate}`,
      Constants.dispatchRecord,
      JSON.stringify(dispatch),
      dispatch.associationId
    );
    Logger.debug(
      `\n\n${mm} DispatchRecord sent to association topic: ${Constants.dispatchRecord}${dispatch.associationId}`
    );
  }
  async sendRouteDispatchMessage(dispatch: DispatchRecord) {
    const fmtDate = MyUtils.formatISOStringDate(dispatch.created, null);

    //send to route topic
    await this.sendToTopic(
      `${Constants.routeDispatchRecord}${dispatch.routeId}`,
      `${dispatch.vehicleReg},`,
      `Dispatched at ${fmtDate}`,
      Constants.routeDispatchRecord,
      JSON.stringify(dispatch),
      dispatch.associationId
    );
    Logger.log(
      `\n\n${mm} DispatchRecord sent to route topic: ${Constants.routeDispatchRecord}${dispatch.routeId}`
    );
  }

  async sendCommuterCashMessage(payment: CommuterCashPayment) {
    const fmtDate = MyUtils.formatISOStringDate(payment.created, null);

    await this.sendToTopic(
      `${Constants.commuterCashPayment}${payment.associationId}`,
      `passengers: ${payment.numberOfPassengers} amount: ${payment.amount},`,
      `Processed at ${fmtDate}`,
      Constants.commuterCashPayment,
      JSON.stringify(payment),
      payment.associationId
    );
  }
  async sendCommuterCashCheckInMessage(checkIn: CommuterCashCheckIn) {
    const fmtDate = MyUtils.formatISOStringDate(checkIn.created, null);

    await this.sendToTopic(
      `${Constants.commuterCashCheckIn}${checkIn.associationId}`,
      `amount: ${checkIn.amount},`,
      `Processed at ${fmtDate}`,
      Constants.commuterCashCheckIn,
      JSON.stringify(checkIn),
      checkIn.associationId
    );
  }
  async sendCommuterPickupMessage(pickup: CommuterPickup) {
    const fmtDate = MyUtils.formatISOStringDate(pickup.created, null);

    await this.sendToTopic(
      `${Constants.commuterPickUp}${pickup.associationId}`,
      `vehicle: ${pickup.vehicleReg},`,
      `Picked up at ${fmtDate}`,
      Constants.commuterCashCheckIn,
      JSON.stringify(pickup),
      pickup.associationId
    );
  }

  async sendRankFeeCashMessage(payment: RankFeeCashPayment) {
    const fmtDate = MyUtils.formatISOStringDate(payment.created, null);

    await this.sendToTopic(
      `${Constants.rankFeeCashPayment}${payment.associationId}`,
      ` amount: ${payment.amount},`,
      `Processed at ${fmtDate}`,
      Constants.rankFeeCashPayment,
      JSON.stringify(payment),
      payment.associationId
    );
  }
  async sendRankFeeCashCheckInMessage(checkIn: RankFeeCashCheckIn) {
    const fmtDate = MyUtils.formatISOStringDate(checkIn.created, null);

    await this.sendToTopic(
      `${Constants.rankFeeCashCheckIn}${checkIn.associationId}`,
      `amount: ${checkIn.amount},`,
      `Processed at ${fmtDate}`,
      Constants.rankFeeCashCheckIn,
      JSON.stringify(checkIn),
      checkIn.associationId
    );
  }

  async sendHeartbeatMessage(heartbeat: VehicleHeartbeat) {
    const fmtDate = MyUtils.formatISOStringDate(heartbeat.created, null);

    await this.sendToTopic(
      `${Constants.heartbeat}${heartbeat.associationId}`,
      `${heartbeat.vehicleReg},`,
      `Heartbeat at ${fmtDate}`,
      Constants.heartbeat,
      JSON.stringify(heartbeat, null, 2),
      heartbeat.associationId
    );
  }

  async sendTelemetryMessage(telemetry: VehicleTelemetry) {
    const fmtDate = MyUtils.formatISOStringDate(telemetry.created, null);

    await this.sendToTopic(
      `${Constants.telemetry}${telemetry.associationId}`,
      `${telemetry.vehicleReg},`,
      `Telemetry at ${fmtDate}`,
      Constants.telemetry,
      JSON.stringify(telemetry, null, 2),
      telemetry.associationId
    );
  }

  async sendTripMessage(trip: Trip) {
    const fmtDate = MyUtils.formatISOStringDate(trip.created, null);

    await this.sendToTopic(
      `${Constants.trips}${trip.associationId}`,
      `${trip.vehicleReg},`,
      `Taxi Trip at ${fmtDate}`,
      Constants.trips,
      JSON.stringify(trip, null, 2),
      trip.associationId
    );
  }

  async sendPassengerCountMessage(count: AmbassadorPassengerCount) {
    const fmtDate = MyUtils.formatISOStringDate(count.created, null);

    await this.sendToTopic(
      `${Constants.passengerCount}${count.associationId}`,
      `${count.vehicleReg},`,
      `PassengerCount on ${fmtDate}`,
      Constants.passengerCount,
      JSON.stringify(count, null, 2),
      count.associationId
    );
  }

  async sendRouteUpdateMessage(req: RouteUpdateRequest) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.sendToTopic(
      `${Constants.routeUpdateRequest}${req.associationId}`,
      `${req.routeName},`,
      `Route Updated on ${Date.now().toString()}`,
      Constants.routeUpdateRequest,
      JSON.stringify(req, null, 2),
      req.associationId
    );
  }
  async sendCommuterRequestMessage(req: CommuterRequest) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.sendToTopic(
      `${Constants.commuterRequest}${req.associationId}`,
      `${req.routeName},`,
      `Commuter Request on ${Date.now().toString()}`,
      Constants.commuterRequest,
      JSON.stringify(req, null, 2),
      req.associationId
    );
    Logger.log(
      `\n\n${mm} CommuterRequest sent to association topic: ${Constants.dispatchRecord}${req.associationId}`
    );
    //
    await this.sendToTopic(
      `${Constants.commuterRequest}${req.routeId}`,
      `${req.routeName},`,
      `Commuter Request on ${Date.now().toString()}`,
      Constants.commuterRequest,
      JSON.stringify(req, null, 2),
      req.associationId
    );

    Logger.log(
      `\n\n${mm} CommuterRequest sent to route topic: ${Constants.dispatchRecord}${req.routeId}`
    );
  }
  async sendInitialCommuterRequestResponseMessage(response: CommuterResponse) {
    await this.sendToDevice(
      `${response.fcmToken}`,
      `Acknowledgement of your Taxi Request,`,
      `Commuter Request on route: ${response.routeName}`,
      Constants.commuterResponse,
      JSON.stringify(response, null, 2)
    );
  }
  async sendLocationResponseMessageToDevice(response: LocationResponse) {
    await this.sendToDevice(
      `${response.fcmToken}`,
      `Acknowledgement of your Location Request,`,
      `Current Location of: ${response.vehicleReg}`,
      Constants.locationResponse,
      JSON.stringify(response, null, 2)
    );
  }
  async sendCommuterResponseMessageToTopic(response: CommuterResponse) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.sendToTopic(
      `${Constants.commuterResponse}${response.associationId}`,
      `${response.routeName},`,
      `Commuter Response on ${Date.now().toString()}`,
      Constants.commuterResponse,
      JSON.stringify(response, null, 2),
      response.associationId
    );
  }
  async sendAssociationRegisteredMessage(assoc: Association) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.sendToTopic(
      `${Constants.association}${assoc.associationId}`,
      `${assoc.associationName},`,
      ` Registered on ${fmtDate}`,
      Constants.association,
      JSON.stringify(assoc, null, 2),
      assoc.associationId
    );
  }
  public async sendToTopic(
    topic: string,
    title: string,
    body: string,
    type: string,
    data: string,
    associationId: string
  ) {
    const message: admin.messaging.Message = {
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
      Logger.debug(`${mm} ${type} FCM message sent to topic: ${topic}`);
      const associationToken = await this.associationTokenModel.findOne({
        associationId: associationId,
      });
      if (associationToken) {
        const messageDirect: admin.messaging.Message = {
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
        if (
          type === Constants.admin ||
          type === Constants.appError ||
          type === Constants.kasieError
        ) {
          return;
        }
        await admin.messaging().send(messageDirect);
      }

      // Logger.debug(
      //   `${mm} 🅿️🅿️🅿️ Successfully sent FCM message to topic and association (if appropriate) ` +
      //     `\n🚺 🚺 🚺 topic: ${topic} message type: ${type} 🚺 title: ${JSON.stringify(title)}`
      // );
    } catch (error) {
      Logger.error("Error sending message:", error);
      const err = new KasieError(
        `${type} Message Send Failed: ${error}`,
        HttpStatus.BAD_REQUEST
      );
      await this.kasieModel.create(err);
    }
  }
  public async sendToDevice(
    fcmToken: string,
    title: string,
    body: string,
    type: string,
    data: string
  ) {
    // Validate the fcmToken
    if (!fcmToken) {
      Logger.error("FCM token is required but was not provided.");
      throw new KasieError("FCM token is required.", HttpStatus.BAD_REQUEST);
    }
    Logger.debug(`${mm} sendToDevice: fcmToken; ${fcmToken}`);
    // Construct the message object
    const message: admin.messaging.Message = {
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
      // Send the message using Firebase Admin SDK
      const response = await admin.messaging().send(message);
      
      // Log success
      Logger.debug(
        `${mm} 🅿️  🅿️  🅿️  Successfully sent FCM message to single device; ` +
        `🚺 🚺 🚺 type: ${type} 🚺 data: ${JSON.stringify(message)}`
      );
      
      // Optionally, you can log the response from Firebase
      Logger.debug(`🥬🥬🥬🥬 sendToDevice: Firebase fcmToken: 🥬 ${fcmToken}`);

      Logger.debug("🥬🥬🥬🥬 sendToDevice: Firebase response: 🥬 ", response);
  
    } catch (error) {
      // Log the error
      Logger.error("👿👿👿👿👿 Error sending message:", error);
      
      // Create a KasieError and save it to the database
      const err = new KasieError(
        `${type} 👿 Message Send Failed: ${error}`,
        HttpStatus.BAD_REQUEST
      );
      await this.kasieModel.create(err);
      
      // Optionally, rethrow the error if you want to handle it further up the call stack
      throw err;
    }
  }
  //subscribe to everything
  async subscribeToEveryThing(): Promise<any> {
    // getMessaging().
  }
}
