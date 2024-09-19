/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Commuter } from 'src/data/models/Commuter';
import { CommuterResponse } from 'src/data/models/CommuterResponse';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { Route } from 'src/data/models/Route';
import { Position } from 'src/data/models/position';
import { MessagingService } from '../messaging/messaging.service';

const mm = 'CommuterService';

@Injectable()
export class CommuterService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,

    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,

    @InjectModel(CommuterResponse.name)
    private commuterResponseModel: mongoose.Model<CommuterResponse>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async toRadians(degree: number): Promise<number> {
    return null;
  }
  public async toDegrees(radian: number): Promise<number> {
    return null;
  }
  public async generateRouteCommuterRequests(routeId: string): Promise<void> {
    return null;
  }
  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
  ): Promise<CommuterRequest[]> {
    return [];
  }
  public async lambda$0(
    arg0: Route,
    arg1: [],
    arg2: Date,
    arg3: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async getRouteCommuterRequests(
    routeId: string,
    startDate: string,
  ): Promise<CommuterRequest[]> {
    return [];
  }
  public async createCommuter(commuter: Commuter): Promise<Commuter> {
    return null;
  }
  public async createCommuterQRCode(commuter: Commuter): Promise<void> {
    return null;
  }
  public async addCommuter(commuter: Commuter): Promise<Commuter> {
    return this.commuterModel.create(commuter);
  }
  public async addCommuterRequest(
    commuterRequest: CommuterRequest,
  ): Promise<CommuterRequest> {
    const req = await this.commuterRequestModel.create(commuterRequest);
    await this.messagingService.sendCommuterRequestMessage(req);
    return req;
  }
  public async getCommuterRequests(
    associationId: string,
    startDate: string,
  ): Promise<CommuterRequest[]> {
    return this.commuterRequestModel.find({
      associationId: associationId,
      dateRequested: { $gte: startDate },
    });
  }
  public async addCommuterResponse(
    commuterResponse: CommuterResponse,
  ): Promise<CommuterResponse> {
    const resp = await this.commuterResponseModel.create(commuterResponse);
    await this.messagingService.sendCommuterResponseMessage(resp);
    return resp;
  }
  public async generateCommuters(count: number): Promise<Commuter[]> {
    return [];
  }
  public async makeBusyLandmark(
    route: Route,
    commuters: Commuter[],
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async writeCommuterRequest(
    route: Route,
    minutesAgo: number,
    commuter: Commuter,
    mark: RouteLandmark,
    passengers: number,
  ): Promise<void> {
    return null;
  }
  public async getRandomPosition(pos: Position): Promise<Position> {
    return null;
  }
  public async getCoordinateWithOffset(
    coordinate: number,
    offsetInMeters: number,
  ): Promise<number> {
    return null;
  }
}
