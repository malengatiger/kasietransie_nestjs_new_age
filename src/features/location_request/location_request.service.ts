/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { LocationRequest } from "src/data/models/LocationRequest";
import { LocationResponse } from "src/data/models/LocationResponse";
import { MessagingService } from "../fcm/fcm.service";
import { LocationResponseError } from "src/data/models/LocationResponseError";

const mm = "LocationRequestService";

@Injectable()
export class LocationRequestService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,

    @InjectModel(LocationRequest.name)
    private locationRequestModel: mongoose.Model<LocationRequest>,

    @InjectModel(LocationResponse.name)
    private locationResponseModel: mongoose.Model<LocationResponse>,

    @InjectModel(LocationResponseError.name)
    private locationResponseErrorModel: mongoose.Model<LocationResponseError>
  ) {}

  public async addLocationRequest(
    locationRequest: LocationRequest
  ): Promise<LocationRequest> {
    const mDate = new Date();
    locationRequest.mDate = mDate;

    const req = this.locationRequestModel.create(locationRequest);
    // await this.messagingService.sendLocationRequestMessage(locationRequest);
    await this.messagingService.sendLocationRequestMessageToDevice(
      locationRequest
    );

    return req;
  }

  public async addLocationResponse(
    locationResponse: LocationResponse
  ): Promise<LocationResponse> {
    const mDate = new Date(locationResponse.created);
    locationResponse.mDate = mDate;
    const res = this.locationResponseModel.create(locationResponse);
    // await this.messagingService.sendLocationResponseMessage(locationResponse);
    await this.messagingService.sendLocationResponseMessageToDevice(locationResponse);
    Logger.debug(` addLocationResponse: ${JSON.stringify(locationResponse, null, 2)}`)

    return res;
  }

  public async addLocationResponseError(
    locationResponseError: LocationResponseError
  ): Promise<LocationResponseError> {
    const mDate = new Date(locationResponseError.created);
    locationResponseError.mDate = mDate;
    const res = this.locationResponseModel.create(locationResponseError);
    // await this.messagingService.sendLocationResponseErrorMessage(locationResponseError);
    await this.messagingService.sendLocationResponseErrorMessageToDevice(locationResponseError);
    Logger.debug(` addLocationResponseError: ${JSON.stringify(locationResponseError, null, 2)}`)
    return res;
  }
}
