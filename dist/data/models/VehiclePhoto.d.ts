import { Position } from "./position";
export declare class VehiclePhoto {
    _partitionKey: string;
    _id: string;
    vehicleId: string;
    vehicleReg: string;
    associationId: string;
    userName: string;
    created: string;
    vehiclePhotoId: string;
    landmarkName: string;
    userId: string;
    url: string;
    thumbNailUrl: string;
    landmarkId: string;
    position: Position;
    mDate: Date;
}
export declare const VehiclePhotoSchema: import("mongoose").Schema<VehiclePhoto, import("mongoose").Model<VehiclePhoto, any, any, any, import("mongoose").Document<unknown, any, VehiclePhoto> & VehiclePhoto & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehiclePhoto, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehiclePhoto>> & import("mongoose").FlatRecord<VehiclePhoto> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
