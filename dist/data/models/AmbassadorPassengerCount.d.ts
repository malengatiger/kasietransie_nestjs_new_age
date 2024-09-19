import { Position } from './position';
export declare class AmbassadorPassengerCount {
    _partitionKey: string;
    _id: string;
    associationId: string;
    vehicleId: string;
    vehicleReg: string;
    created: string;
    userId: string;
    userName: string;
    routeId: string;
    routeName: string;
    routeLandmarkId: string;
    routeLandmarkName: string;
    ownerId: string;
    ownerName: string;
    passengerCountId: string;
    passengersIn: number;
    passengersOut: number;
    currentPassengers: number;
    position: Position;
}
export declare const AmbassadorPassengerCountSchema: import("mongoose").Schema<AmbassadorPassengerCount, import("mongoose").Model<AmbassadorPassengerCount, any, any, any, import("mongoose").Document<unknown, any, AmbassadorPassengerCount> & AmbassadorPassengerCount & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AmbassadorPassengerCount, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AmbassadorPassengerCount>> & import("mongoose").FlatRecord<AmbassadorPassengerCount> & Required<{
    _id: string;
}>>;
