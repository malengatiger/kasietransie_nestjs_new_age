import { Position } from './position';
export declare class RouteLandmark {
    _partitionKey: string;
    _id: string;
    routeId: string;
    routePointId: string;
    index: number;
    routePointIndex: number;
    routeName: string;
    landmarkId: string;
    landmarkName: string;
    created: string;
    associationId: string;
    position: Position;
}
export declare const RouteLandmarkSchema: import("mongoose").Schema<RouteLandmark, import("mongoose").Model<RouteLandmark, any, any, any, import("mongoose").Document<unknown, any, RouteLandmark> & RouteLandmark & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RouteLandmark, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RouteLandmark>> & import("mongoose").FlatRecord<RouteLandmark> & Required<{
    _id: string;
}>>;
