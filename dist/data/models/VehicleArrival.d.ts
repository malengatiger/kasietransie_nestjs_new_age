import { Position } from "./position";
export declare class VehicleArrival {
    _partitionKey: string;
    _id: string;
    vehicleArrivalId: string;
    landmarkId: string;
    landmarkName: string;
    position: Position;
    created: string;
    vehicleId: string;
    associationId: string;
    associationName: string;
    vehicleReg: string;
    make: string;
    model: string;
    ownerId: string;
    ownerName: string;
    dispatched: boolean;
}
export declare const VehicleArrivalSchema: import("mongoose").Schema<VehicleArrival, import("mongoose").Model<VehicleArrival, any, any, any, import("mongoose").Document<unknown, any, VehicleArrival> & VehicleArrival & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleArrival, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleArrival>> & import("mongoose").FlatRecord<VehicleArrival> & Required<{
    _id: string;
}>>;
