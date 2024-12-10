export declare class VehicleMediaRequest {
    _partitionKey: string;
    _id: string;
    userId: string;
    vehicleId: string;
    vehicleReg: string;
    created: string;
    requesterId: string;
    associationId: string;
    requesterName: string;
    addVideo: boolean;
}
export declare const VehicleMediaRequestSchema: import("mongoose").Schema<VehicleMediaRequest, import("mongoose").Model<VehicleMediaRequest, any, any, any, import("mongoose").Document<unknown, any, VehicleMediaRequest> & VehicleMediaRequest & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleMediaRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleMediaRequest>> & import("mongoose").FlatRecord<VehicleMediaRequest> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
