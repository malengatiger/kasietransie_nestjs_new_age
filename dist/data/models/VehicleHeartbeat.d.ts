import { Position } from './position';
export declare class VehicleHeartbeat {
    _partitionKey: string;
    _id: string;
    vehicleHeartbeatId: string;
    vehicleId: string;
    vehicleReg: string;
    associationId: string;
    ownerId: string;
    ownerName: string;
    position: Position;
    created: string;
    longDate: number;
    make: string;
    model: string;
    appToBackground: boolean;
    mDate: Date;
}
export declare const VehicleHeartbeatSchema: import("mongoose").Schema<VehicleHeartbeat, import("mongoose").Model<VehicleHeartbeat, any, any, any, import("mongoose").Document<unknown, any, VehicleHeartbeat> & VehicleHeartbeat & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleHeartbeat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleHeartbeat>> & import("mongoose").FlatRecord<VehicleHeartbeat> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
