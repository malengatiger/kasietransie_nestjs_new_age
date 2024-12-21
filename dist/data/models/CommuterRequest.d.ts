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
    numberOfPassengers: number;
    associationId: string;
    scanned: boolean;
    fcmToken: string;
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
