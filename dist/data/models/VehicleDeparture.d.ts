import { Position } from "./position";
export declare class VehicleDeparture {
    _partitionKey: string;
    _id: string;
    vehicleDepartureId: string;
    landmarkId: string;
    landmarkName: string;
    ownerId: string;
    ownerName: string;
    vehicleId: string;
    associationId: string;
    associationName: string;
    vehicleReg: string;
    created: string;
    make: string;
    model: string;
    position: Position;
}
export declare const VehicleDepartureSchema: import("mongoose").Schema<VehicleDeparture, import("mongoose").Model<VehicleDeparture, any, any, any, import("mongoose").Document<unknown, any, VehicleDeparture> & VehicleDeparture & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleDeparture, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleDeparture>> & import("mongoose").FlatRecord<VehicleDeparture> & Required<{
    _id: string;
}>>;
