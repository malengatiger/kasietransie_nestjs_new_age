import { HeartbeatMeta } from "./HeartbeatMeta";
export declare class PassengerTimeSeries {
    timestamp: Date;
    metaData: HeartbeatMeta;
    associationId: string;
    vehicleId: string;
    routeId: string;
    passengers: number;
}
export declare const PassengerTimeSeriesSchema: import("mongoose").Schema<PassengerTimeSeries, import("mongoose").Model<PassengerTimeSeries, any, any, any, import("mongoose").Document<unknown, any, PassengerTimeSeries> & PassengerTimeSeries & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PassengerTimeSeries, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PassengerTimeSeries>> & import("mongoose").FlatRecord<PassengerTimeSeries> & {
    _id: import("mongoose").Types.ObjectId;
}>;
