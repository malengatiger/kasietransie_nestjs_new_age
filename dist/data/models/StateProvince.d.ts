export declare class StateProvince {
    _partitionKey: string;
    _id: string;
    stateId: string;
    countryId: string;
    name: string;
    countryName: string;
    stateCode: string;
    latitude: number;
    longitude: number;
}
export declare const StateProvinceSchema: import("mongoose").Schema<StateProvince, import("mongoose").Model<StateProvince, any, any, any, import("mongoose").Document<unknown, any, StateProvince> & StateProvince & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StateProvince, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StateProvince>> & import("mongoose").FlatRecord<StateProvince> & Required<{
    _id: string;
}>>;
