/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { MessagingService } from '../messaging/messaging.service';

const mm = 'LocationRequestService';

@Injectable()
export class LocationRequestService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,

    @InjectModel(LocationRequest.name)
    private locationRequestModel: mongoose.Model<LocationRequest>,

    @InjectModel(LocationResponse.name)
    private locationResponseModel: mongoose.Model<LocationResponse>,
  ) {}

  public async addLocationRequest(
    locationRequest: LocationRequest,
  ): Promise<LocationRequest> {
    const req = this.locationRequestModel.create(locationRequest);
    await this.messagingService.sendLocationRequestMessage(locationRequest);
    return req;
  }
  public async addLocationResponse(
    locationResponse: LocationResponse,
  ): Promise<LocationResponse> {
    const res = this.locationResponseModel.create(locationResponse);
    await this.messagingService.sendLocationResponseMessage(locationResponse);
    return res;
  }
}
