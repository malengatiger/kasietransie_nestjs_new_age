export declare class Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
    countryName: string;
    countryId: string;
}
export declare const TimezoneSchema: import("mongoose").Schema<Timezone, import("mongoose").Model<Timezone, any, any, any, import("mongoose").Document<unknown, any, Timezone> & Timezone & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Timezone, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Timezone>> & import("mongoose").FlatRecord<Timezone> & {
    _id: import("mongoose").Types.ObjectId;
}>;
