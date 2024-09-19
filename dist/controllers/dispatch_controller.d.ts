import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { AmbassadorService } from 'src/services/AmbassadorService';
import { DispatchService } from 'src/services/DispatchService';
import { MyFirebaseService } from 'src/services/FirebaseService';
import { AssociationCounts } from '../data/helpers/AssociationCounts';
import { VehicleDeparture } from '../data/models/VehicleDeparture';
export declare class DispatchController {
    private readonly dispatchService;
    private readonly fbService;
    private readonly ambassadorService;
    constructor(dispatchService: DispatchService, fbService: MyFirebaseService, ambassadorService: AmbassadorService);
    addDispatchRecord(dispatchRecord: DispatchRecord): Promise<DispatchRecord>;
    addVehicleDeparture(departure: VehicleDeparture): Promise<VehicleDeparture>;
    getVehicleAmbassadorPassengerCounts(query: {
        vehicleId: string;
        startDate: string;
    }): Promise<AmbassadorPassengerCount[]>;
    getAssociationCounts(query: {
        associationId: string;
        startDate: string;
    }): Promise<AssociationCounts>;
    getVehicleCountsByDate(query: {
        vehicleId: string;
        startDate: string;
    }): Promise<CounterBag[]>;
    getVehicleDispatchRecords(query: {
        vehicleId: string;
        startDate: string;
    }): Promise<DispatchRecord[]>;
    getMarshalDispatchRecords(query: {
        marshalId: string;
        startDate: string;
    }): Promise<DispatchRecord[]>;
    getVehicleCounts(query: {
        vehicleId: string;
    }): Promise<CounterBag[]>;
    getOwnersBag(query: {
        userId: string;
        startDate: string;
    }): Promise<BigBag>;
}
