import { AssociationCounts } from 'src/data/helpers/AssociationCounts';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { FileArchiverService } from 'src/my-utils/zipper';
import { MessagingService } from '../fcm/fcm.service';
export declare class DispatchService {
    private messagingService;
    private zipService;
    constructor(messagingService: MessagingService, zipService: FileArchiverService);
    addDispatchRecord(dispatchRecord: DispatchRecord): Promise<DispatchRecord>;
    addVehicleDeparture(departure: VehicleDeparture): Promise<VehicleDeparture>;
    addVehicleArrival(arrival: VehicleArrival): Promise<VehicleArrival>;
    getAssociationCounts(associationId: string, startDate: string): Promise<AssociationCounts>;
    getVehicleCountsByDate(vehicleId: string, startDate: string): Promise<CounterBag[]>;
    getVehicleCounts(vehicleId: string): Promise<CounterBag[]>;
    getOwnersBag(userId: string, startDate: string): Promise<BigBag>;
}
