import { Position } from "./position";
export declare class DispatchRecord {
    _partitionKey: string;
    _id: string;
    dispatchRecordId: string;
    routeLandmarkId: string;
    marshalId: string;
    passengers: number;
    ownerId: string;
    created: string;
    position: Position;
    landmarkName: string;
    marshalName: string;
    routeName: string;
    routeId: string;
    vehicleId: string;
    vehicleArrivalId: string;
    vehicleReg: string;
    associationId: string;
    associationName: string;
    dispatched: boolean;
}
export declare const DispatchRecordSchema: import("mongoose").Schema<DispatchRecord, import("mongoose").Model<DispatchRecord, any, any, any, import("mongoose").Document<unknown, any, DispatchRecord> & DispatchRecord & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DispatchRecord, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DispatchRecord>> & import("mongoose").FlatRecord<DispatchRecord> & Required<{
    _id: string;
}>>;
