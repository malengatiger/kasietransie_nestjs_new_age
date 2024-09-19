/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { AmbassadorCheckIn } from 'src/data/models/AmbassadorCheckIn';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { User } from 'src/data/models/User';
import { Vehicle } from 'src/data/models/Vehicle';
import { MessagingService } from 'src/messaging/messaging.service';
import { TimeSeriesService } from './TimeSeriesService';
import { NewMongoService } from 'src/data/db_ping';

const mm = 'AmbassadorService';

@Injectable()
export class AmbassadorService {
  constructor(
    private readonly messagingService: MessagingService,
    private readonly timeSeriesService: TimeSeriesService,
    private readonly mongoService: NewMongoService,
    private readonly configService: ConfigService,


    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(AmbassadorCheckIn.name)
    private ambassadorCheckInModel: mongoose.Model<AmbassadorCheckIn>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,
  ) {}

  public async getAssociationAmbassadorCheckIn(
    associationId: string,
    startDate: string,
  ): Promise<any[]> {
    return await this.mongoService.find('AmbassadorCheckIn', {
      associationId: associationId,
      startDate: startDate,
    });
  }
  public async getVehicleAmbassadorCheckIn(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorCheckIn[]> {
     return await this.mongoService.find('AmbassadorCheckIn', {
       vehicleId: vehicleId,
       startDate: startDate,
     });
  }
  public async getUserAmbassadorPassengerCounts(
    userId: string,
    startDate: string,
  ): Promise<any[]> {
    return this.mongoService.find('AmbassadorPassengerCount', {
      userId: userId,
      created: { $gte: startDate },
    });
  }
  public async getAssociationAmbassadorPassengerCounts(
    associationId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    const list = await this.mongoService
      .find('AmbassadorPassengerCount', {
        associationId: associationId,
        created: { $gte: startDate },
      });
    Logger.debug(`AmbassadorPassengerCounts found : ${list.length}`);
    return list;
  }
  public async getVehicleAmbassadorPassengerCounts(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    const res = await this.mongoService.find(
      'AmbassadorPassengerCount',
      {
        vehicleId: vehicleId,
        created: { $gte: startDate },
      },
    );
    return res;
  }
  public async addAmbassadorPassengerCount(
    count: AmbassadorPassengerCount,
  ): Promise<AmbassadorPassengerCount> {
    const res = await this.mongoService.create(
      'AmbassadorPassengerCount',
      count,
    );
    await this.timeSeriesService.addPassengerTimeSeries(
      count.associationId,
      count.vehicleId,
      count.vehicleReg,
      count.routeId,
      count.passengersIn,
    );
    await this.messagingService.sendPassengerCountMessage(res);
    return res;
  }
  public async generateRoutePassengerCounts(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAmbassadorPassengerCount(
    users: User[],
    passengerCounts: AmbassadorPassengerCount[],
    vehicle: Vehicle,
    marks: RouteLandmark[],
    minutesAgo: Date,
    landmarkIndex: number,
    previousAPC: AmbassadorPassengerCount,
    mark: RouteLandmark,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateAmbassadorPassengerCounts(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getCars(
    list: Vehicle[],
    numberOfCars: number,
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getUserAmbassadorCheckIn(
    userId: string,
    startDate: string,
  ): Promise<AmbassadorCheckIn[]> {
    return [];
  }

  public async addAmbassadorCheckIn(
    count: AmbassadorPassengerCount,
    startDate: string,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async getRoutePassengerCounts(
    routeId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return await this.ambassadorPassengerCountModel.find({
      routeId: routeId,
      startDate: { $gte: startDate },
    });
  }
  public async getCurrentPassengers(
    passengersIn: number,
    passengersOut: number,
    currentPassengers: number,
  ): Promise<number> {
    return null;
  }
}
