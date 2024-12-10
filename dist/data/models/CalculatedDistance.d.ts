export declare class CalculatedDistance {
    _partitionKey: string;
    _id: string;
    routeName: string;
    routeId: string;
    fromLandmark: string;
    toLandmark: string;
    fromLandmarkId: string;
    toLandmarkId: string;
    index: number;
    distanceInMetres: number;
    distanceFromStart: number;
    fromRoutePointIndex: number;
    toRoutePointIndex: number;
}
export declare const CalculatedDistanceSchema: import("mongoose").Schema<CalculatedDistance, import("mongoose").Model<CalculatedDistance, any, any, any, import("mongoose").Document<unknown, any, CalculatedDistance> & CalculatedDistance & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CalculatedDistance, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CalculatedDistance>> & import("mongoose").FlatRecord<CalculatedDistance> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
