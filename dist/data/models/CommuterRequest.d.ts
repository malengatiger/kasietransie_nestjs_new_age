import { Position } from "./position";
export declare class CommuterRequest {
    _partitionKey: string;
    _id: string;
    commuterRequestId: string;
    commuterId: string;
    dateRequested: string;
    dateNeeded: string;
    currentPosition: Position;
    routeId: string;
    routeName: string;
    routeLandmarkId: string;
    routeLandmarkName: string;
    routePointIndex: number;
    numberOfPassengers: number;
    distanceToRouteLandmarkInMetres: number;
    distanceToRoutePointInMetres: number;
    associationId: string;
    scanned: boolean;
    destinationCityId: string;
    destinationCityName: string;
    originCityId: string;
    originCityName: string;
}
export declare const CommuterRequestSchema: import("mongoose").Schema<CommuterRequest, import("mongoose").Model<CommuterRequest, any, any, any, import("mongoose").Document<unknown, any, CommuterRequest> & CommuterRequest & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CommuterRequest, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CommuterRequest>> & import("mongoose").FlatRecord<CommuterRequest> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
