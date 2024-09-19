export declare class Commuter {
    _partitionKey: string;
    _id: string;
    commuterId: string;
    cellphone: string;
    email: string;
    name: string;
    dateRegistered: string;
    qrCodeUrl: string;
    profileUrl: string;
    profileThumbnail: string;
    countryId: string;
    password: string;
    gender: string;
}
export declare const CommuterSchema: import("mongoose").Schema<Commuter, import("mongoose").Model<Commuter, any, any, any, import("mongoose").Document<unknown, any, Commuter> & Commuter & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Commuter, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Commuter>> & import("mongoose").FlatRecord<Commuter> & Required<{
    _id: string;
}>>;
