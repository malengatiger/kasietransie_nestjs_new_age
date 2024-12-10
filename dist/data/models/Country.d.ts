import { Position } from "./position";
export declare class Country {
    _partitionKey: string;
    _id: string;
    countryId: string;
    name: string;
    iso3: string;
    iso2: string;
    phoneCode: string;
    capital: string;
    currency: string;
    currencyName: string;
    currencySymbol: string;
    tld: string;
    region: string;
    subregion: string;
    timezones: [];
    latitude: number;
    longitude: number;
    emoji: string;
    emojiU: string;
    position: Position;
}
export declare const CountrySchema: import("mongoose").Schema<Country, import("mongoose").Model<Country, any, any, any, import("mongoose").Document<unknown, any, Country> & Country & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Country, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Country>> & import("mongoose").FlatRecord<Country> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
