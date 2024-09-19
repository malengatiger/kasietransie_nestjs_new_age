import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { AmbassadorService } from 'src/services/AmbassadorService';
import { DispatchService } from 'src/services/DispatchService';
import { MyFirebaseService } from 'src/services/FirebaseService';
import { AssociationCounts } from '../data/helpers/AssociationCounts';
import { VehicleDeparture } from '../data/models/VehicleDeparture';

@Controller('api/v1')
export class DispatchController {
  constructor(
    private readonly dispatchService: DispatchService,
    private readonly fbService: MyFirebaseService,
    private readonly ambassadorService: AmbassadorService,
  ) {}

  @Post('addDispatchRecord')
  async addDispatchRecord(
    @Body() dispatchRecord: DispatchRecord,
  ): Promise<DispatchRecord> {
    return await this.dispatchService.addDispatchRecord(dispatchRecord);
  }
  @Post('addVehicleDeparture')
  async addVehicleDeparture(
    @Body() departure: VehicleDeparture,
  ): Promise<VehicleDeparture> {
    return await this.dispatchService.addVehicleDeparture(departure);
  }
  //getVehicleAmbassadorPassengerCounts
  @Get('getVehicleAmbassadorPassengerCounts')
  async getVehicleAmbassadorPassengerCounts(
    @Query() query: { vehicleId: string; startDate: string },
  ): Promise<AmbassadorPassengerCount[]> {
    return await this.ambassadorService.getVehicleAmbassadorPassengerCounts(
      query.vehicleId,
      query.startDate,
    );
  }
  @Get('getAssociationCounts')
  async getAssociationCounts(
    @Query() query: { associationId: string; startDate: string },
  ): Promise<AssociationCounts> {
    return await this.dispatchService.getAssociationCounts(
      query.associationId,
      query.startDate,
    );
  }
  @Get('getVehicleCountsByDate')
  async getVehicleCountsByDate(
    @Query() query: { vehicleId: string; startDate: string },
  ): Promise<CounterBag[]> {
    return await this.dispatchService.getVehicleCountsByDate(
      query.vehicleId,
      query.startDate,
    );
  }

  @Get('getVehicleDispatchRecords')
  async getVehicleDispatchRecords(
    @Query() query: { vehicleId: string; startDate: string },
  ): Promise<DispatchRecord[]> {
    return await this.dispatchService.getVehicleDispatchRecords(
      query.vehicleId,
      query.startDate,
    );
  }
  @Get('getMarshalDispatchRecords')
  async getMarshalDispatchRecords(
    @Query() query: { marshalId: string; startDate: string },
  ): Promise<DispatchRecord[]> {
    return await this.dispatchService.getMarshalDispatchRecords(
      query.marshalId,
      query.startDate,
    );
  }
  @Get('getVehicleCounts')
  async getVehicleCounts(
    @Query() query: { vehicleId: string },
  ): Promise<CounterBag[]> {
    return await this.dispatchService.getVehicleCounts(query.vehicleId);
  }
  @Get('getOwnersBag')
  async getOwnersBag(
    @Query() query: { userId: string; startDate: string },
  ): Promise<BigBag> {
    return await this.dispatchService.getOwnersBag(
      query.userId,
      query.startDate,
    );
  }
}
