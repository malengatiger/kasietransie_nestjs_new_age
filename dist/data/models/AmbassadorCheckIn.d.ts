import { Position } from "./position";
import { HydratedDocument } from "mongoose";
export type AmbassadorCheckInDocument = HydratedDocument<AmbassadorCheckIn>;
export declare class AmbassadorCheckIn {
    _partitionKey: string;
    _id: string;
    associationId: string;
    vehicleId: string;
    vehicleReg: string;
    created: string;
    userId: string;
    userName: string;
    position: Position;
    mDate: Date;
}
export declare const AmbassadorCheckInSchema: import("mongoose").Schema<AmbassadorCheckIn, import("mongoose").Model<AmbassadorCheckIn, any, any, any, import("mongoose").Document<unknown, any, AmbassadorCheckIn> & AmbassadorCheckIn & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AmbassadorCheckIn, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AmbassadorCheckIn>> & import("mongoose").FlatRecord<AmbassadorCheckIn> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
