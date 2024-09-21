import { Position } from "./position";
export declare class RouteCity {
    _partitionKey: string;
    _id: string;
    routeId: string;
    routeName: string;
    cityId: string;
    cityName: string;
    created: string;
    associationId: string;
    routeLandmarkId: string;
    routeLandmarkName: string;
    position: Position;
}
export declare const RouteCitySchema: import("mongoose").Schema<RouteCity, import("mongoose").Model<RouteCity, any, any, any, import("mongoose").Document<unknown, any, RouteCity> & RouteCity & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RouteCity, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RouteCity>> & import("mongoose").FlatRecord<RouteCity> & Required<{
    _id: string;
}>>;
