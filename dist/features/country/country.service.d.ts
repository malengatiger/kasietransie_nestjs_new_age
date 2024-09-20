import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
export declare class CountryService {
    private countryModel;
    private cityModel;
    constructor(countryModel: mongoose.Model<Country>, cityModel: mongoose.Model<City>);
    getCountryCities(countryId: string): Promise<City[]>;
    getCountries(): Promise<Country[]>;
}
