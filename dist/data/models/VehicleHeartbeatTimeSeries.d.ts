import { HeartbeatMeta } from './HeartbeatMeta';
export declare class VehicleHeartbeatTimeSeries {
    timestamp: Date;
    metaData: HeartbeatMeta;
    associationId: string;
    vehicleId: string;
    count: number;
}
export declare const VehicleHeartbeatTimeSeriesSchema: import("mongoose").Schema<VehicleHeartbeatTimeSeries, import("mongoose").Model<VehicleHeartbeatTimeSeries, any, any, any, import("mongoose").Document<unknown, any, VehicleHeartbeatTimeSeries> & VehicleHeartbeatTimeSeries & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VehicleHeartbeatTimeSeries, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<VehicleHeartbeatTimeSeries>> & import("mongoose").FlatRecord<VehicleHeartbeatTimeSeries> & {
    _id: import("mongoose").Types.ObjectId;
}>;
