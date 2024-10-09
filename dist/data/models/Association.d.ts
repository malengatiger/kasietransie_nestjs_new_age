import { Position } from "./position";
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
    adminUserFirstName: string;
    adminUserLastName: string;
    userId: string;
    adminCellphone: string;
    adminEmail: string;
    password: string;
}
export declare const AssociationSchema: import("mongoose").Schema<Association, import("mongoose").Model<Association, any, any, any, import("mongoose").Document<unknown, any, Association> & Association & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Association, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Association>> & import("mongoose").FlatRecord<Association> & Required<{
    _id: string;
}>>;
