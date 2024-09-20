import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { DispatchService } from "./dispatch.service";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { BigBag } from "src/data/helpers/BigBag";
import { CounterBag } from "src/data/helpers/CounterBag";
import { AssociationCounts } from "src/data/helpers/AssociationCounts";

@Controller("dispatch")
export class DispatchController {
  constructor(private readonly dispatchService: DispatchService) {}

  @Post("addDispatchRecord")
  async addDispatchRecord(
    @Body() dispatchRecord: DispatchRecord
  ): Promise<DispatchRecord> {
    return this.dispatchService.addDispatchRecord(dispatchRecord);
  }
  @Post("addVehicleDeparture")
  async addVehicleDeparture(
    @Body() departure: VehicleDeparture
  ): Promise<VehicleDeparture> {
    return this.dispatchService.addVehicleDeparture(departure);
  }
  @Post("addVehicleArrival")
  async addVehicleArrival(
    @Body() departure: VehicleArrival
  ): Promise<VehicleArrival> {
    return this.dispatchService.addVehicleArrival(departure);
  }
  @Post("addVehicleHeartbeat")
  async addVehicleHeartbeat(
    @Body() heartbeat: VehicleHeartbeat
  ): Promise<VehicleHeartbeat> {
    return this.dispatchService.addVehicleHeartbeat(heartbeat);
  }
  @Get("getVehicleCountsByDate")
  async getVehicleCountsByDate(
    @Query() vehicleId: string,
    @Query() startDate: string,
    @Query() endDate: string,
  ): Promise<CounterBag[]> {
    return this.dispatchService.getVehicleCountsByDate(
      vehicleId,
      startDate,
      endDate
    );
  }
  @Get("getOwnersBag")
  async getOwnersBag(
    @Query() userId: string,
    @Query() startDate: string,
    @Query() endDate: string,
  ): Promise<BigBag> {
    return this.dispatchService.getOwnersBag(userId, startDate, endDate);
  }
  @Get("getAmbassadorPassengerCount")
  async getAmbassadorPassengerCount(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    return this.dispatchService.getAmbassadorPassengerCounts(
      userId,
      startDate,
      endDate
    );
  }
  @Get("getAssociationBagZippedFile")
  async getAssociationBagZippedFile(
    @Query()
    associationId: string,
    @Query() startDate: string,
    @Query() endDate: string
  ): Promise<any> {
    return this.dispatchService.getAssociationBagZippedFile(
      associationId,
      startDate,
      endDate
    );
  }
  @Get("getAssociationVehicleDepartures")
  public async getAssociationVehicleDepartures(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return this.dispatchService.getAssociationVehicleDepartures(
      associationId,
      startDate,
      endDate
    );
  }
  @Get("getAssociationDispatchRecords")
  public async getAssociationDispatchRecords(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    return this.dispatchService.getAssociationDispatchRecords(
      associationId,
      startDate,
      endDate
    );
  }
  @Get("getAssociationVehicleArrivals")
  public async getAssociationVehicleArrivals(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    return this.dispatchService.getAssociationVehicleArrivals(
      associationId,
      startDate,
      endDate
    );
  }
  @Get("getAssociationCounts")
  public async getAssociationCounts(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AssociationCounts> {
    return this.dispatchService.getAssociationCounts(
      associationId,
      startDate,
      endDate
    );
  }
}
