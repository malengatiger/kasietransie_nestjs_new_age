export declare class CommuterResponse {
    commuterResponseId: string;
    commuterRequestId: string;
    responseDate: string;
    message: string;
    routeId: string;
    routeName: string;
    numberOfVehiclesOnRoute: number;
    routeLandmarkId: string;
    routeLandmarkName: string;
    associationId: string;
    vehicleDispatched: boolean;
}
export declare const CommuterResponseSchema: import("mongoose").Schema<CommuterResponse, import("mongoose").Model<CommuterResponse, any, any, any, import("mongoose").Document<unknown, any, CommuterResponse> & CommuterResponse & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CommuterResponse, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CommuterResponse>> & import("mongoose").FlatRecord<CommuterResponse> & {
    _id: import("mongoose").Types.ObjectId;
}>;
