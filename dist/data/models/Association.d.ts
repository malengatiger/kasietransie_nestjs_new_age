import { Position } from "./position";
import { User } from "./User";
export declare class Association {
    _partitionKey: string;
    _id: string;
    associationId: string;
    cityId: string;
    countryId: string;
    associationName: string;
    active: number;
    countryName: string;
    cityName: string;
    dateRegistered: string;
    position: Position;
    carUser: User;
    adminUser: User;
}
export declare const AssociationSchema: import("mongoose").Schema<Association, import("mongoose").Model<Association, any, any, any, import("mongoose").Document<unknown, any, Association> & Association & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Association, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Association>> & import("mongoose").FlatRecord<Association> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
