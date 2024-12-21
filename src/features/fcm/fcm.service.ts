/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import * as admin from 'firebase-admin';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { MyUtils } from 'src/my-utils/my-utils';
import { RouteUpdateRequest } from 'src/data/models/RouteUpdateRequest';
import { Constants } from 'src/my-utils/constants';

import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AppErrors } from 'src/data/helpers/AppErrors';
import { AppError } from 'src/data/models/AppError';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { CommuterResponse } from 'src/data/models/CommuterResponse';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { KasieError } from 'src/data/models/kasie.error';
import { Association } from 'src/data/models/Association';
import { AssociationToken } from 'src/data/models/AssociationToken';
import { VehicleTelemetry } from 'src/data/models/VehicleTelemetry';

const mm = '🎽 🎽 🎽 MessagingService';

@Injectable()
export class MessagingService {
  constructor(
    @InjectModel(AssociationToken.name)
    private associationTokenModel: mongoose.Model<AssociationToken>,
    @InjectModel(KasieError.name)
    private kasieModel: mongoose.Model<KasieError>,
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
      appError.associationId,
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
      '',
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
      locationRequest.associationId,
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
      locationResponse.associationId,
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
      arrival.associationId,
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
      departure.associationId,
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
      dispatch.associationId,
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
      heartbeat.associationId,
    );
    
  }
  async sendTelemetryMessage(telemetry: VehicleTelemetry) {
    const fmtDate = MyUtils.formatISOStringDate(telemetry.created, null);

    await this.sendToTopic(
      `${Constants.heartbeat}${telemetry.associationId}`,
      `${telemetry.vehicleReg},`,
      `Telemetry at ${fmtDate}`,
      Constants.heartbeat,
      JSON.stringify(telemetry, null, 2),
      telemetry.associationId,
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
      count.associationId,
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
      req.associationId,
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
      req.associationId,
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
  async sendCommuterResponseMessage(response: CommuterResponse) {
    const fmtDate = MyUtils.formatISOStringDate(Date.now().toString(), null);
    await this.sendToTopic(
      `${Constants.commuterResponse}${response.associationId}`,
      `${response.routeName},`,
      `Commuter Response on ${Date.now().toString()}`,
      Constants.commuterResponse,
      JSON.stringify(response, null, 2),
      response.associationId,
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
      assoc.associationId,
    );
  }
  private async sendToTopic(
    topic: string,
    title: string,
    body: string,
    type: string,
    data: string,
    associationId: string,
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

      Logger.debug(
        `${mm} 🅿️🅿️🅿️ Successfully sent FCM message to topic and association (if appropriate) `
        + `\n🚺 🚺 🚺 topic: ${topic} message type: ${type} 🚺 title: ${JSON.stringify(title)}`,
      );
    } catch (error) {
      Logger.error('Error sending message:', error);
      const err = new KasieError(
        `${type} Message Send Failed: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
      await this.kasieModel.create(err);
    }
  }
  private async sendToDevice(
    fcmToken: string,
    title: string,
    body: string,
    type: string,
    data: string,
  ) {
    const message: admin.messaging.Message = {
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
      Logger.debug(
        `${mm} 🅿️ 🅿️ 🅿️ Successfully sent FCM message to single device `
        + `🚺 🚺 🚺 message type: ${type} 🚺 title: ${JSON.stringify(title)} \n ${fcmToken}`,
      );
    } catch (error) {
      Logger.error('Error sending message:', error);
      const err = new KasieError(
        `${type} Message Send Failed: ${error}`,
        HttpStatus.BAD_REQUEST,
      );
      await this.kasieModel.create(err);
    }
  }
  
}
