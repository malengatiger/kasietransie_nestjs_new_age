import { DispatchService } from "./dispatch.service";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { BigBag } from "src/data/helpers/BigBag";
import { CounterBag } from "src/data/helpers/CounterBag";
import { AssociationCounts } from "src/data/helpers/AssociationCounts";
import { Trip } from "src/data/models/Trip";
import { UpdateResult } from "mongoose";
export declare class DispatchController {
    private readonly dispatchService;
    constructor(dispatchService: DispatchService);
    addTrip(trip: Trip): Promise<Trip>;
    updateTrip(trip: Trip): Promise<UpdateResult>;
    addDispatchRecord(dispatchRecord: DispatchRecord): Promise<DispatchRecord>;
    addVehicleDeparture(departure: VehicleDeparture): Promise<VehicleDeparture>;
    addVehicleArrival(departure: VehicleArrival): Promise<VehicleArrival>;
    addVehicleHeartbeat(heartbeat: VehicleHeartbeat): Promise<VehicleHeartbeat>;
    getVehicleCountsByDate(vehicleId: string, startDate: string, endDate: string): Promise<CounterBag[]>;
    getOwnersBag(userId: string, startDate: string, endDate: string): Promise<BigBag>;
    getAmbassadorPassengerCount(userId: string, startDate: string, endDate: string): Promise<AmbassadorPassengerCount[]>;
    getAssociationBagZippedFile(associationId: string, startDate: string, endDate: string): Promise<any>;
    getAssociationVehicleDepartures(associationId: string, startDate: string, endDate: string): Promise<VehicleDeparture[]>;
    getAssociationDispatchRecords(associationId: string, startDate: string, endDate: string): Promise<DispatchRecord[]>;
    getAssociationVehicleArrivals(associationId: string, startDate: string, endDate: string): Promise<VehicleArrival[]>;
    getAssociationCounts(associationId: string, startDate: string, endDate: string): Promise<AssociationCounts>;
    getRouteDispatchRecords(query: {
        routeId: string;
        startDate: string;
    }): Promise<DispatchRecord[]>;
}
