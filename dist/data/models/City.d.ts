import { Position } from "./position";
export declare class City {
    _partitionKey: string;
    _id: string;
    name: string;
    cityId: string;
    country: string;
    countryId: string;
    stateId: string;
    stateName: string;
    countryName: string;
    province: string;
    position: Position;
    latitude: number;
    longitude: number;
    created: string;
}
export declare const CitySchema: import("mongoose").Schema<City, import("mongoose").Model<City, any, any, any, import("mongoose").Document<unknown, any, City> & City & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, City, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<City>> & import("mongoose").FlatRecord<City> & Required<{
    _id: string;
}>>;
