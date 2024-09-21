import { Position } from "./position";
export declare class LocationResponse {
    _partitionKey: string;
    _id: string;
    associationId: string;
    vehicleId: string;
    vehicleReg: string;
    created: string;
    userId: string;
    userName: string;
    position: Position;
}
export declare const LocationResponseSchema: import("mongoose").Schema<LocationResponse, import("mongoose").Model<LocationResponse, any, any, any, import("mongoose").Document<unknown, any, LocationResponse> & LocationResponse & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocationResponse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LocationResponse>> & import("mongoose").FlatRecord<LocationResponse> & Required<{
    _id: string;
}>>;
