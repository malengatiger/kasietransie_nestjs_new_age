/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AssociationCounts } from 'src/data/helpers/AssociationCounts';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { FileArchiverService } from 'src/my-utils/zipper';
import { MessagingService } from '../fcm/fcm.service';

const mm = 'DispatchService';

@Injectable()
export class DispatchService {
  constructor(
    private messagingService: MessagingService,
    private zipService: FileArchiverService,

  ) {}
  async addDispatchRecord(dispatchRecord: DispatchRecord): Promise<DispatchRecord> {
    return null;
  }
  async addVehicleDeparture(departure: VehicleDeparture): Promise<VehicleDeparture> {
    return null;
  }
  async addVehicleArrival(arrival: VehicleArrival): Promise<VehicleArrival> {
    return null;
  }
  
  async getAssociationCounts( associationId: string, startDate: string ): Promise<AssociationCounts> {
    return null;
  }
  async getVehicleCountsByDate( vehicleId: string, startDate: string ): Promise<CounterBag[]> {
    return null;
  }
async getVehicleCounts( vehicleId: string ): Promise<CounterBag[]> {
    return null;
  }
  
async getOwnersBag( userId: string, startDate: string ): Promise<BigBag> {
    return null;
  }

}