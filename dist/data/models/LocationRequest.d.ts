export declare class LocationRequest {
    _partitionKey: string;
    _id: string;
    associationId: string;
    vehicleId: string;
    vehicleReg: string;
    created: string;
    userId: string;
    userName: string;
}
export declare const LocationRequestSchema: import("mongoose").Schema<LocationRequest, import("mongoose").Model<LocationRequest, any, any, any, import("mongoose").Document<unknown, any, LocationRequest> & LocationRequest & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocationRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LocationRequest>> & import("mongoose").FlatRecord<LocationRequest> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
