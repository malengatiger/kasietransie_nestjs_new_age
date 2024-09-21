import { Position } from "./position";
export declare class UserGeofenceEvent {
    _partitionKey: string;
    _id: string;
    userGeofenceId: string;
    landmarkId: string;
    activityType: string;
    action: string;
    userId: string;
    longDate: number;
    created: string;
    landmarkName: string;
    confidence: number;
    odometer: number;
    moving: boolean;
    associationId: string;
    position: Position;
}
export declare const UserGeofenceEventSchema: import("mongoose").Schema<UserGeofenceEvent, import("mongoose").Model<UserGeofenceEvent, any, any, any, import("mongoose").Document<unknown, any, UserGeofenceEvent> & UserGeofenceEvent & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserGeofenceEvent, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<UserGeofenceEvent>> & import("mongoose").FlatRecord<UserGeofenceEvent> & Required<{
    _id: string;
}>>;
