/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { Route } from 'src/data/models/Route';
import { AssociationBag } from 'src/data/helpers/AssociationBag';
import { AssociationCounts } from 'src/data/helpers/AssociationCounts';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { DispatchRecordList } from 'src/data/helpers/DispatchRecordList';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { MessagingService } from 'src/messaging/messaging.service';
import { FileArchiverService } from '../my-utils/zipper';

const mm = 'DispatchService';

@Injectable()
export class DispatchService {
  constructor(
    private configService: ConfigService,
    private messagingService: MessagingService,
    private zipService: FileArchiverService,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,

    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(VehicleDeparture.name)
    private vehicleDepartureModel: mongoose.Model<VehicleDeparture>,
    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async getAmbassadorPassengerCount(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
    user: User,
    passengers: number,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async countVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleHeartbeatsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehiclePassengerCounts(vehicleId: string): Promise<number> {
    return null;
  }
  public async getAssociationVehicleDepartures(
    associationId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationDispatchRecords(
    associationId: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getAssociationDispatchRecordsByDate(
    associationId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getAssociationVehicleArrivals(
    associationId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationVehicleArrivalsByDate(
    associationId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
  ): Promise<CommuterRequest[]> {
    return [];
  }
  public async generateAmbassadorPassengerCount(
    vehicle: Vehicle,
    routeLandmarks: RouteLandmark[],
    users: User[],
    minutesAgo: number,
    previousAPC: AmbassadorPassengerCount,
    mark: RouteLandmark,
  ): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateHeartbeatBetweenLandmarks(
    vehicle: Vehicle,
    mark: RouteLandmark,
    next: RouteLandmark,
    minutesAgo: number,
  ): Promise<void> {
    return null;
  }
  public async countMarshalDispatchRecords(userId: string): Promise<number> {
    return null;
  }
  public async findVehicleArrivalsByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
    minutes: number,
    limit: number,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async findVehicleDeparturesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
    minutes: number,
    limit: number,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getLandmarkVehicleDepartures(
    landmarkId: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationBagZippedFile(
    associationId: string,
    startDate: string,
  ): Promise<string> {
    const heartbeats = await this.vehicleHeartbeatModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    const arrivals = await this.vehicleArrivalModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    const departures = await this.vehicleDepartureModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    const dispatches = await this.dispatchRecordModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    const commuterRequests = await this.commuterRequestModel
      .find({
        associationId: associationId,
        dateRequested: { $gte: startDate },
      })
      .sort({ created: -1 });
    const passengerCounts = await this.ambassadorPassengerCountModel
      .find({
        associationId: associationId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });

    const bag: AssociationBag = new AssociationBag();
    bag.heartbeats = heartbeats;
    bag.arrivals = arrivals;
    bag.departures = departures;
    bag.dispatchRecords = dispatches;
    bag.commuterRequests = commuterRequests;
    bag.passengerCounts = passengerCounts;
    const mString = JSON.stringify(bag);
    return await this.zipService.zip([{ content: mString }]);
  }
  public async generateRouteDispatchRecords(
    route: Route,
    vehicle: Vehicle,
    routeLandmarks: RouteLandmark[],
    users: User[],
    intervalInSeconds: number,
  ): Promise<void> {
    return null;
  }
  public async addDispatchRecord(
    dispatchRecord: DispatchRecord,
  ): Promise<DispatchRecord> {
    const res = await this.dispatchRecordModel.create(dispatchRecord);
    await this.messagingService.sendDispatchMessage(dispatchRecord);
    Logger.debug(`${mm} ... add DispatchRecord completed: 🛎🛎`);
    return res;
  }
  public async getVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleArrivals(
    vehicleId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleHeartbeats(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getVehicleDispatchRecords(
    vehicleId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    Logger.log(
      `${mm} getVehicleDispatchRecords: vehicleId: ${vehicleId} startDate: ${startDate}`,
    );
    const res = await this.dispatchRecordModel
      .find({
        vehicleId: vehicleId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    Logger.log(
      `${mm} ... getVehicleDispatchRecords found: 🛎 ${res.length} 🛎`,
    );
    return res;
  }
  public async getVehiclePassengerCounts(
    vehicleId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getVehicleDepartures(
    vehicleId: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async countDispatchesByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countPassengerCountsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<number> {
    return null;
  }
  public async countVehicleDepartures(vehicleId: string): Promise<number> {
    return null;
  }
  public async countVehicleDispatches(vehicleId: string): Promise<number> {
    return null;
  }
  public async countVehicleArrivals(vehicleId: string): Promise<number> {
    return null;
  }
  public async getOwnerDispatchRecords(
    userId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getOwnerVehicleArrivals(
    userId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getOwnerVehicleDepartures(
    userId: string,
    startDate: string,
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getOwnerVehicleHeartbeats(
    userId: string,
    startDate: string,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getOwnerPassengerCounts(
    userId: string,
    startDate: string,
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAssociationBag(
    associationId: string,
    startDate: string,
  ): Promise<AssociationBag> {
    return null;
  }
  public async handleArrivalAndDispatch(
    users: User[],
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async handleDateAndSleep(
    minutesAgo: number,
    intervalInSeconds: number,
  ): Promise<number> {
    return null;
  }
  public async generateDeparture(
    vehicle: Vehicle,
    mark: RouteLandmark,
    minutesAgo: number,
  ): Promise<void> {
    return null;
  }
  public async writeHeartbeatBetween(
    vehicle: Vehicle,
    minutesAgo: number,
    rp: RoutePoint,
  ): Promise<void> {
    return null;
  }
  public async addVehicleDeparture(
    vehicleDeparture: VehicleDeparture,
  ): Promise<VehicleDeparture> {
    const dep = await this.vehicleDepartureModel.create(vehicleDeparture);
    await this.messagingService.sendVehicleDepartureMessage(dep);
    return dep;
  }
  public async handleArrival(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async writeHeartbeat(
    vehicle: Vehicle,
    minutesAgo: number,
    mark: RouteLandmark,
  ): Promise<void> {
    return null;
  }
  public async addVehicleArrival(
    vehicleArrival: VehicleArrival,
  ): Promise<VehicleArrival> {
    const m = await this.vehicleArrivalModel.create(vehicleArrival);
    await this.messagingService.sendVehicleArrivalMessage(vehicleArrival);
    return m;
  }
  public async getRouteDispatchRecords(
    routeId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getRouteVehicleArrivals(
    routeId: string,
    startDate: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async addDispatchRecords(
    dispatchRecordList: DispatchRecordList,
  ): Promise<DispatchRecord[]> {
    return await this.dispatchRecordModel.insertMany(
      dispatchRecordList.dispatchRecords,
    );
  }
  public async getLandmarkDispatchRecords(
    landmarkId: string,
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getMarshalDispatchRecords(
    marshalId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    return this.dispatchRecordModel.find({
      marshalId: marshalId,
      created: { $gte: startDate },
    });
  }
  public async getLandmarkVehicleArrivals(
    landmarkId: string,
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleCountsByDate(
    vehicleId: string,
    startDate: string,
  ): Promise<CounterBag[]> {
    const departures = await this.vehicleDepartureModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const dispatches = await this.dispatchRecordModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const arrivals = await this.vehicleArrivalModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const bags: CounterBag[] = [];
    const bag1 = new CounterBag();
    bag1.count = departures;
    bag1.description = 'VehicleDeparture';
    bags.push(bag1);
    //
    const bag2 = new CounterBag();
    bag2.count = dispatches;
    bag2.description = 'DispatchRecord';
    bags.push(bag2);
    //
    const bag3 = new CounterBag();
    bag3.count = arrivals;
    bag3.description = 'VehicleArrival';
    bags.push(bag3);
    //
    const bag4 = new CounterBag();
    bag4.count = heartbeats;
    bag4.description = 'VehicleHeartbeat';
    bags.push(bag4);
    //
    const bag5 = new CounterBag();
    bag5.count = passCounts;
    bag5.description = 'AmbassadorPassengerCount';
    bags.push(bag5);
    return bags;
  }
  public async getVehicleCounts(vehicleId: string): Promise<CounterBag[]> {
    const departures = await this.vehicleDepartureModel.countDocuments({
      vehicleId: vehicleId,
    });
    const dispatches = await this.dispatchRecordModel.countDocuments({
      vehicleId: vehicleId,
    });
    const arrivals = await this.vehicleArrivalModel.countDocuments({
      vehicleId: vehicleId,
    });
    const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
      vehicleId: vehicleId,
    });
    const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
      vehicleId: vehicleId,
    });
    const bags = [];
    const bag1 = new CounterBag();
    bag1.count = departures;
    bag1.description = 'VehicleDeparture';
    bags.push(bag1);
    const bag2 = new CounterBag();
    bag2.count = dispatches;
    bag2.description = 'DispatchRecord';
    bags.push(bag2);
    const bag3 = new CounterBag();
    bag3.count = arrivals;
    bag3.description = 'VehicleArrival';
    bags.push(bag3);
    const bag4 = new CounterBag();
    bag4.count = heartbeats;
    bag4.description = 'VehicleHeartbeat';
    bags.push(bag4);
    const bag5 = new CounterBag();
    bag5.count = passCounts;
    bag5.description = 'AmbassadorPassengerCount';
    bags.push(bag5);

    return bags;
  }
  public async getOwnersBag(
    userId: string,
    startDate: string,
  ): Promise<BigBag> {
    const counts = await this.ambassadorPassengerCountModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });
    const heartbeats = await this.vehicleHeartbeatModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });
    const arrivals = await this.vehicleArrivalModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });
    const deps = await this.vehicleDepartureModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });
    const disps = await this.dispatchRecordModel.find({
      ownerId: userId,
      created: { $gte: startDate },
    });
    const bag = new BigBag();
    bag.passengerCounts = counts;
    bag.vehicleHeartbeats = heartbeats;
    bag.vehicleDepartures = deps;
    bag.dispatchRecords = disps;
    bag.vehicleArrivals = arrivals;
    bag.created = new Date().toISOString();
    Logger.log(
      `${mm} dispatches: ${disps.length} arrivals: ${arrivals.length}`,
    );
    return bag;
  }
  public async getAssociationCounts(
    associationId: string,
    startDate: string,
  ): Promise<AssociationCounts> {
    const departures: number = await this.vehicleDepartureModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate },
    });
    const arrivals: number = await this.vehicleArrivalModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate },
    });
    const dispatches: number = await this.dispatchRecordModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate },
    });
    const heartbeats: number = await this.vehicleHeartbeatModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate },
    });
    const passengerCounts: number =
      await this.ambassadorPassengerCountModel.countDocuments({
        associationId: associationId,
        created: { $gte: startDate },
      });
    const commuters: number = await this.commuterRequestModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate },
    });
    const bag: AssociationCounts = new AssociationCounts();
    bag.departures = departures;
    bag.arrivals = arrivals;
    bag.dispatchRecords = dispatches;
    bag.heartbeats = heartbeats;
    bag.commuterRequests = commuters;
    bag.passengerCounts = passengerCounts;
    return bag;
  }
  public async fixOwnerToPassengerCounts(
    userId: string,
    ownerId: string,
    ownerName: string,
  ): Promise<string> {
    return null;
  }
}
