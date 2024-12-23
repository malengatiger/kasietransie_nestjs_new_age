import { Position } from "./position";
export declare class VehicleVideo {
    _partitionKey: string;
    _id: string;
    vehicleId: string;
    vehicleReg: string;
    associationId: string;
    userName: string;
    created: string;
    vehicleVideoId: string;
    landmarkName: string;
    userId: string;
    url: string;
    thumbNailUrl: string;
    landmarkId: string;
    position: Position;
    mDate: Date;
}
export declare const VehicleVideoSchema: import("mongoose").Schema<VehicleVideo, import("mongoose").Model<VehicleVideo, any, any, any, import("mongoose").Document<unknown, any, VehicleVideo> & VehicleVideo & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleVideo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleVideo>> & import("mongoose").FlatRecord<VehicleVideo> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
