/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { UpdateResult } from "mongoose";
import { Commuter } from "src/data/models/Commuter";
import { CommuterResponse } from "src/data/models/CommuterResponse";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { Route } from "src/data/models/Route";
import { Position } from "src/data/models/position";
import { MessagingService } from "../fcm/fcm.service";
import { randomUUID } from "crypto";
import { CloudStorageUploaderService } from "src/storage/storage.service";

const mm = "CommuterService";

@Injectable()
export class CommuterService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,
    private storage: CloudStorageUploaderService,

    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,

    @InjectModel(CommuterResponse.name)
    private commuterResponseModel: mongoose.Model<CommuterResponse>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>
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
    startDate: string
  ): Promise<CommuterRequest[]> {
    const requests = await this.commuterRequestModel.find(
      {
        associationId: associationId,
        dateRequested: {$gte: startDate}
      }  
    );
    Logger.debug(`${mm} commuter requests since ${startDate} : ${requests.length} for association: ${associationId}`);
    return requests;
  }
  
  public async lambda$0(
    arg0: Route,
    arg1: [],
    arg2: Date,
    arg3: RouteLandmark
  ): Promise<void> {
    return null;
  }
  public async getRouteCommuterRequests(
    routeId: string,
    startDate: string
  ): Promise<CommuterRequest[]> {
    
    const requests = await this.commuterRequestModel.find(
      {
        routeId: routeId,
        dateRequested: {$gte: startDate}
      }  
    );
    Logger.debug(`${mm} commuter requests since ${startDate} : ${requests.length} for route: ${routeId}`);
    return requests;
  }
  public async createCommuter(commuter: Commuter): Promise<Commuter> {
    return null;
  }
  public async createCommuterQRCode(commuter: Commuter): Promise<void> {
    return null;
  }
  public async addCommuter(commuter: Commuter): Promise<Commuter> {
    commuter.created = new Date().toISOString();
    const url = await this.storage.createQRCode({
      data: JSON.stringify(commuter),
      prefix: 'commuter',
      size: 1,
      associationId: null,
    });
    commuter.qrCodeUrl = url;
    const res = this.commuterModel.create(commuter);
    Logger.debug(
      `CommuterService: added commuter to Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async updateCommuter(commuter: Commuter): Promise<UpdateResult> {
    commuter.created = new Date().toISOString();
    const url = await this.storage.createQRCode({
      data: JSON.stringify(commuter),
      prefix: 'commuter',
      size: 2,
      associationId: null,
    });
    commuter.qrCodeUrl = url;
    const res = this.commuterModel.updateOne(
      { commuterId: commuter.cellphone },
      commuter
    );
    Logger.debug(
      `CommuterService: updated commuter to Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async addCommuterRequest(
    commuterRequest: CommuterRequest
  ): Promise<CommuterRequest> {
    const mDateNeeded = new Date(commuterRequest.dateNeeded);
    commuterRequest.mDateNeeded = mDateNeeded;
    commuterRequest.dateRequested = new Date().toISOString();
    const mDateRequested = new Date(commuterRequest.dateRequested);
    commuterRequest.mDateRequested = mDateRequested;

    const req = await this.commuterRequestModel.create(commuterRequest);
    await this.messagingService.sendCommuterRequestMessage(req);

    const resp = new CommuterResponse();
    resp.associationId = req.associationId;
    resp.commuterRequestId = req.commuterRequestId;
    resp.fcmToken = req.fcmToken;
    resp.message = "We have received your Taxi Request. Thank you!";
    resp.routeId = req.routeId;
    resp.routeName = req.routeName;
    resp.commuterId = req.commuterId;
    resp.commuterResponseId = randomUUID();
    resp.responseDate = new Date().toISOString();

    await this.messagingService.sendInitialCommuterRequestResponseMessage(resp);
    Logger.debug(`${mm} commuter request added and fcm messages sent`);
    return req;
  }
  public async getCommuterRequests(
    commuterId: string,
    startDate: string
  ): Promise<CommuterRequest[]> {
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
  public async addCommuterResponse(
    commuterResponse: CommuterResponse
  ): Promise<CommuterResponse> {
    const mDate = new Date(commuterResponse.created);
    commuterResponse.mDate = mDate;
    const resp = await this.commuterResponseModel.create(commuterResponse);
    await this.messagingService.sendCommuterResponseMessageToTopic(resp);
    return resp;
  }
  public async generateCommuters(count: number): Promise<Commuter[]> {
    return [];
  }
  public async makeBusyLandmark(
    route: Route,
    commuters: Commuter[],
    minutesAgo: number,
    mark: RouteLandmark
  ): Promise<void> {
    return null;
  }
  public async writeCommuterRequest(
    route: Route,
    minutesAgo: number,
    commuter: Commuter,
    mark: RouteLandmark,
    passengers: number
  ): Promise<void> {
    return null;
  }
  public async getRandomPosition(pos: Position): Promise<Position> {
    return null;
  }
  public async getCoordinateWithOffset(
    coordinate: number,
    offsetInMeters: number
  ): Promise<number> {
    return null;
  }
}
