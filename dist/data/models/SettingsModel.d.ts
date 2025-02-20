export declare class SettingsModel {
    _partitionKey: string;
    _id: string;
    associationId: string;
    locale: string;
    refreshRateInSeconds: number;
    themeIndex: number;
    geofenceRadius: number;
    commuterGeofenceRadius: number;
    vehicleSearchMinutes: number;
    heartbeatIntervalSeconds: number;
    loiteringDelay: number;
    commuterSearchMinutes: number;
    commuterGeoQueryRadius: number;
    vehicleGeoQueryRadius: number;
    numberOfLandmarksToScan: number;
    distanceFilter: number;
    created: string;
    mDate: Date;
    geofenceRefreshMinutes: number;
}
export declare const SettingsModelSchema: import("mongoose").Schema<SettingsModel, import("mongoose").Model<SettingsModel, any, any, any, import("mongoose").Document<unknown, any, SettingsModel> & SettingsModel & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SettingsModel, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SettingsModel>> & import("mongoose").FlatRecord<SettingsModel> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
