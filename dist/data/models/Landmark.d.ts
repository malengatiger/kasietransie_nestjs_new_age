import { Position } from "./position";
export declare class Landmark {
    _partitionKey: string;
    _id: string;
    landmarkId: string;
    associationId: string;
    created: string;
    latitude: number;
    longitude: number;
    distance: number;
    landmarkName: string;
    routeDetails: [];
    position: Position;
}
export declare const LandmarkSchema: import("mongoose").Schema<Landmark, import("mongoose").Model<Landmark, any, any, any, import("mongoose").Document<unknown, any, Landmark> & Landmark & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Landmark, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Landmark>> & import("mongoose").FlatRecord<Landmark> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
