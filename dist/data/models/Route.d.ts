import { RouteStartEnd } from "./RouteStartEnd";
export declare class Route {
    _partitionKey: string;
    _id: string;
    routeId: string;
    countryId: string;
    countryName: string;
    name: string;
    routeNumber: string;
    created: string;
    updated: string;
    color: string;
    userId: string;
    userName: string;
    active: number;
    activationDate: string;
    associationId: string;
    associationName: string;
    qrCodeUrl: string;
    routeStartEnd: RouteStartEnd;
    calculatedDistances: [];
    heading: number;
    lengthInMetres: number;
}
export declare const RouteSchema: import("mongoose").Schema<Route, import("mongoose").Model<Route, any, any, any, import("mongoose").Document<unknown, any, Route> & Route & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Route, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Route>> & import("mongoose").FlatRecord<Route> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
