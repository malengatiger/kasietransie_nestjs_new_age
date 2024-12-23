/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
import { AssociationCounts } from "src/data/helpers/AssociationCounts";
import { BigBag } from "src/data/helpers/BigBag";
import { CounterBag } from "src/data/helpers/CounterBag";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { FileArchiverService } from "src/my-utils/zipper";
import { MessagingService } from "../fcm/fcm.service";
import { AssociationBag } from "src/data/helpers/AssociationBag";
import { DispatchRecordList } from "src/data/helpers/DispatchRecordList";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { UpdateResult } from "mongoose";
import { Trip } from "src/data/models/Trip";
import { de } from 'date-fns/locale';

const mm = "DispatchService";

@Injectable()
export class DispatchService {
  constructor(
    private messagingService: MessagingService,
    private zipService: FileArchiverService,
    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,
    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,
    @InjectModel(VehicleDeparture.name)
    private vehicleDepartureModel: mongoose.Model<VehicleDeparture>,
    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,
    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,
    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>
   
  ) {}

  public async addTrip(trip: Trip) : Promise<Trip>{
    const mDate= new Date(trip.created);
    trip.mDate = mDate;

    const res = await this.tripModel.create(trip);
    Logger.debug(`${mm} added Trip to Atlas ${JSON.stringify(res, null, 2)}`);
    return res;
  }
  public async updateTrip(trip: Trip) : Promise<UpdateResult>{
    const res = await this.tripModel.updateOne({tripId: trip.tripId}, trip);
    Logger.debug(`${mm} updateTrip ${JSON.stringify(res, null, 2)}`);
    return res;
  }
  public async getAmbassadorPassengerCounts(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    return null;
  }
  public async countVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehicleHeartbeatsByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehiclePassengerCounts(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async getAssociationVehicleDepartures(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationDispatchRecords(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getRouteDispatchRecords(
    routeId: string,
    startDate: string,
  ): Promise<DispatchRecord[]> {
    Logger.debug(`${mm} getRouteDispatchRecords: ... startDate: ${startDate} routeId: ${routeId}`)
    const aDate = new Date(startDate);
    const res = await this.dispatchRecordModel.find(
      {routeId: routeId, created: {$gte: startDate}});
      Logger.debug(`getRouteDispatchRecords, result: ${JSON.stringify(res, null, 2)}`);
    return res;
  }
  public async getAssociationDispatchRecordsByDate(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getAssociationVehicleArrivals(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationVehicleArrivalsByDate(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<CommuterRequest[]> {
    return [];
  }
  public async generateAmbassadorPassengerCount(): Promise<AmbassadorPassengerCount> {
    return null;
  }
  public async generateHeartbeatBetweenLandmarks(): Promise<void> {
    return null;
  }
  public async countMarshalDispatchRecords(): Promise<number> {
    return null;
  }
  public async findVehicleArrivalsByLocation(): Promise<VehicleArrival[]> {
    return [];
  }
  public async findVehicleDeparturesByLocation(): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getLandmarkVehicleDepartures(): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationBagZippedFile(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    const heartbeats = await this.vehicleHeartbeatModel
      .find({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
      })
      .sort({ created: -1 });
    const arrivals = await this.vehicleArrivalModel
      .find({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
      })
      .sort({ created: -1 });
    const departures = await this.vehicleDepartureModel
      .find({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
      })
      .sort({ created: -1 });
    const dispatches = await this.dispatchRecordModel
      .find({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
      })
      .sort({ created: -1 });
    const commuterRequests = await this.commuterRequestModel
      .find({
        associationId: associationId,
        dateRequested: { $gte: startDate, $lte: endDate },
      })
      .sort({ created: -1 });
    const passengerCounts = await this.ambassadorPassengerCountModel
      .find({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
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
    return await this.zipService.zip([{ contentString: mString }]);
  }
  public async generateRouteDispatchRecords(): Promise<void> {
    return null;
  }
  public async addDispatchRecord(
    dispatchRecord: DispatchRecord
  ): Promise<DispatchRecord> {
    const mDate= new Date(dispatchRecord.created);
    dispatchRecord.mDate = mDate;
    const res = await this.dispatchRecordModel.create(dispatchRecord);
    await this.messagingService.sendDispatchMessage(dispatchRecord);
    Logger.debug(`${mm} ... add DispatchRecord completed: 🛎🛎`);
    return res;
  }
  public async getVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleArrivals(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleHeartbeats(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getVehicleDispatchRecords(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    Logger.log(
      `${mm} getVehicleDispatchRecords: vehicleId: ${vehicleId} startDate: ${startDate}`
    );
    const res = await this.dispatchRecordModel
      .find({
        vehicleId: vehicleId,
        created: { $gte: startDate },
      })
      .sort({ created: -1 });
    Logger.log(
      `${mm} ... getVehicleDispatchRecords found: 🛎 ${res.length} 🛎`
    );
    return res;
  }
  public async getVehiclePassengerCounts(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getVehicleDepartures(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getVehicleDeparturesByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async countDispatchesByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehicleArrivalsByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countPassengerCountsByDate(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehicleDepartures(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehicleDispatches(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async countVehicleArrivals(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<number> {
    return null;
  }
  public async getOwnerDispatchRecords(
    ownerId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    return [];
  }
  public async getOwnerVehicleArrivals(
    ownerId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return [];
  }
  public async getOwnerVehicleDepartures(
    ownerId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getOwnerVehicleHeartbeats(
    ownerId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async getOwnerPassengerCounts(
    ownerId: string,
    startDate: string,
    endDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    return [];
  }
  public async getAssociationBag(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AssociationBag> {
    return null;
  }
  public async handleArrivalAndDispatch(): Promise<void> {
    return null;
  }
  public async handleDateAndSleep(): Promise<number> {
    return null;
  }
  public async generateDeparture(): Promise<void> {
    return null;
  }
  public async writeHeartbeatBetween(): Promise<void> {
    return null;
  }
  public async addVehicleDeparture(
    vehicleDeparture: VehicleDeparture
  ): Promise<VehicleDeparture> {
    const mDate= new Date(vehicleDeparture.created);
    vehicleDeparture.mDate = mDate;
    const dep = await this.vehicleDepartureModel.create(vehicleDeparture);
    await this.messagingService.sendVehicleDepartureMessage(dep);
    return dep;
  }
  public async handleArrival(): Promise<void> {
    return null;
  }
  public async addVehicleHeartbeat(heartbeat: VehicleHeartbeat): Promise<any> {
    const mDate= new Date(heartbeat.created);
    heartbeat.mDate = mDate;
    const m = await this.vehicleHeartbeatModel.create(heartbeat);
    return m;
  }
  public async addVehicleArrival(
    vehicleArrival: VehicleArrival
  ): Promise<VehicleArrival> {
    const m = await this.vehicleArrivalModel.create(vehicleArrival);
    await this.messagingService.sendVehicleArrivalMessage(vehicleArrival);
    return m;
  }
 
  public async getRouteVehicleArrivals(): Promise<VehicleArrival[]> {
    return [];
  }
  public async addDispatchRecords(
    dispatchRecordList: DispatchRecordList
  ): Promise<DispatchRecord[]> {
    return await this.dispatchRecordModel.insertMany(
      dispatchRecordList.dispatchRecords
    );
  }
  public async getLandmarkDispatchRecords(): Promise<DispatchRecord[]> {
    return [];
  }
  public async getMarshalDispatchRecords(
    marshalId: string,
    startDate: string
  ): Promise<DispatchRecord[]> {
    return this.dispatchRecordModel.find({
      marshalId: marshalId,
      created: { $gte: startDate },
    });
  }
  public async getLandmarkVehicleArrivals(): Promise<VehicleArrival[]> {
    return [];
  }
  public async getVehicleCountsByDate(
    vehicleId: string,
    startDate: string,
    endDate: string,
  ): Promise<CounterBag[]> {
    const departures = await this.vehicleDepartureModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const dispatches = await this.dispatchRecordModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const arrivals = await this.vehicleArrivalModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const heartbeats = await this.vehicleHeartbeatModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const passCounts = await this.ambassadorPassengerCountModel.countDocuments({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const bags: CounterBag[] = [];
    const bag1 = new CounterBag();
    bag1.count = departures;
    bag1.description = "VehicleDeparture";
    bags.push(bag1);
    //
    const bag2 = new CounterBag();
    bag2.count = dispatches;
    bag2.description = "DispatchRecord";
    bags.push(bag2);
    //
    const bag3 = new CounterBag();
    bag3.count = arrivals;
    bag3.description = "VehicleArrival";
    bags.push(bag3);
    //
    const bag4 = new CounterBag();
    bag4.count = heartbeats;
    bag4.description = "VehicleHeartbeat";
    bags.push(bag4);
    //
    const bag5 = new CounterBag();
    bag5.count = passCounts;
    bag5.description = "AmbassadorPassengerCount";
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
    bag1.description = "VehicleDeparture";
    bags.push(bag1);
    const bag2 = new CounterBag();
    bag2.count = dispatches;
    bag2.description = "DispatchRecord";
    bags.push(bag2);
    const bag3 = new CounterBag();
    bag3.count = arrivals;
    bag3.description = "VehicleArrival";
    bags.push(bag3);
    const bag4 = new CounterBag();
    bag4.count = heartbeats;
    bag4.description = "VehicleHeartbeat";
    bags.push(bag4);
    const bag5 = new CounterBag();
    bag5.count = passCounts;
    bag5.description = "AmbassadorPassengerCount";
    bags.push(bag5);

    return bags;
  }
  public async getOwnersBag(
    userId: string,
    startDate: string,
    endDate: string,
  ): Promise<BigBag> {
    const counts = await this.ambassadorPassengerCountModel.find({
      ownerId: userId,
      created: { $gte: startDate, $lte: endDate },
    });
    const heartbeats = await this.vehicleHeartbeatModel.find({
      ownerId: userId,
      created: { $gte: startDate, $lte: endDate },
    });
    const arrivals = await this.vehicleArrivalModel.find({
      ownerId: userId,
      created: { $gte: startDate, $lte: endDate },
    });
    const deps = await this.vehicleDepartureModel.find({
      ownerId: userId,
      created: { $gte: startDate, $lte: endDate },
    });
    const disps = await this.dispatchRecordModel.find({
      ownerId: userId,
      created: { $gte: startDate, $lte: endDate },
    });
    const bag = new BigBag();
    bag.passengerCounts = counts;
    bag.vehicleHeartbeats = heartbeats;
    bag.vehicleDepartures = deps;
    bag.dispatchRecords = disps;
    bag.vehicleArrivals = arrivals;
    bag.created = new Date().toISOString();
    Logger.log(
      `${mm} dispatches: ${disps.length} arrivals: ${arrivals.length}`
    );
    return bag;
  }
  public async getAssociationCounts(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AssociationCounts> {
    const departures: number = await this.vehicleDepartureModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    const arrivals: number = await this.vehicleArrivalModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    const dispatches: number = await this.dispatchRecordModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    const heartbeats: number = await this.vehicleHeartbeatModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    const passengerCounts: number =
      await this.ambassadorPassengerCountModel.countDocuments({
        associationId: associationId,
        created: { $gte: startDate, $lte: endDate },
      });
    const commuters: number = await this.commuterRequestModel.countDocuments({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
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
  public async fixOwnerToPassengerCounts(): Promise<string> {
    return null;
  }
}
