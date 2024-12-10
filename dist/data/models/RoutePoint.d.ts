import { Position } from "./position";
export declare class RoutePoint {
    _partitionKey: string;
    _id: string;
    routePointId: string;
    latitude: number;
    longitude: number;
    heading: number;
    index: number;
    created: string;
    routeId: string;
    associationId: string;
    routeName: string;
    position: Position;
}
export declare const RoutePointSchema: import("mongoose").Schema<RoutePoint, import("mongoose").Model<RoutePoint, any, any, any, import("mongoose").Document<unknown, any, RoutePoint> & RoutePoint & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RoutePoint, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RoutePoint>> & import("mongoose").FlatRecord<RoutePoint> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
