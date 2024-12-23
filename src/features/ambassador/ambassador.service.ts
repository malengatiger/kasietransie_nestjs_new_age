/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { AmbassadorCheckIn } from "src/data/models/AmbassadorCheckIn";
import { Vehicle } from "src/data/models/Vehicle";
import { MessagingService } from "../fcm/fcm.service";
import { TimeSeriesService } from "../time_series/time_series.service";
import { KasieError } from "src/data/models/kasie.error";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";

@Injectable()
export class AmbassadorService {
  constructor(
    private readonly messagingService: MessagingService,
    private readonly timeSeriesService: TimeSeriesService,
    private readonly errorHandler: KasieErrorHandler,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,
    @InjectModel(AmbassadorCheckIn.name)
    private ambassadorCheckInModel: mongoose.Model<AmbassadorCheckIn>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>
  ) {}

  public async getAssociationAmbassadorCheckIn(
    associationId: string,
    startDate: string
  ): Promise<any[]> {
    return await this.ambassadorCheckInModel.find({
      associationId: associationId,
      startDate: startDate,
    });
  }
  public async getVehicleAmbassadorCheckIn(
    vehicleId: string,
    startDate: string
  ): Promise<AmbassadorCheckIn[]> {
    return await this.ambassadorCheckInModel.find({
      vehicleId: vehicleId,
      startDate: startDate,
    });
  }
  public async getUserAmbassadorPassengerCounts(
    userId: string,
    startDate: string
  ): Promise<any[]> {
    return this.ambassadorPassengerCountModel.find({
      userId: userId,
      created: { $gte: startDate },
    });
  }
  public async getAssociationAmbassadorPassengerCountDates(
    associationId: string,
    startDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    const list = await this.ambassadorPassengerCountModel.find({
      associationId: associationId,
      created: { $gte: startDate },
    });
    Logger.debug(`AmbassadorPassengerCounts found : ${list.length}`);
    return list;
  }
  public async getVehicleAmbassadorPassengerCounts(
    vehicleId: string,
    startDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    const res = await this.ambassadorPassengerCountModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    return res;
  }
  public async addAmbassadorPassengerCount(
    count: AmbassadorPassengerCount
  ): Promise<AmbassadorPassengerCount> {
    Logger.debug(`AmbassadorService adding count: ${JSON.stringify(count)}`);
    try {
      const mDate = new Date(count.created);
      count.mDate = mDate;
      const res = await this.ambassadorPassengerCountModel.create(count);
      await this.timeSeriesService.addPassengerTimeSeries(
        count.associationId,
        count.vehicleId,
        count.vehicleReg,
        count.routeId,
        count.passengersIn
      );
      await this.messagingService.sendPassengerCountMessage(res);
      return res;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        count.associationId,
        count.associationId
      );
      throw new HttpException(
        `Error adding Passenger Counts: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async generateRoutePassengerCounts(): Promise<
    AmbassadorPassengerCount[]
  > {
    return [];
  }
  public async getAmbassadorPassengerCount(): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateAmbassadorPassengerCounts(): Promise<
    AmbassadorPassengerCount[]
  > {
    return [];
  }
  public async getCars(): Promise<Vehicle[]> {
    return [];
  }
  public async getUserAmbassadorCheckIn(): Promise<AmbassadorCheckIn[]> {
    return [];
  }

  public async addAmbassadorCheckIn(): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async getRoutePassengerCounts(
    routeId: string,
    startDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    return await this.ambassadorPassengerCountModel.find({
      routeId: routeId,
      startDate: { $gte: startDate },
    });
  }
  public async getCurrentPassengers(): Promise<number> {
    return null;
  }
}
