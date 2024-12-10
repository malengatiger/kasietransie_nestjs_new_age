export declare class RouteUpdateRequest {
    _partitionKey: string;
    _id: string;
    associationId: string;
    routeId: string;
    routeName: string;
    created: string;
    userId: string;
    userName: string;
}
export declare const RouteUpdateRequestSchema: import("mongoose").Schema<RouteUpdateRequest, import("mongoose").Model<RouteUpdateRequest, any, any, any, import("mongoose").Document<unknown, any, RouteUpdateRequest> & RouteUpdateRequest & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RouteUpdateRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RouteUpdateRequest>> & import("mongoose").FlatRecord<RouteUpdateRequest> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
