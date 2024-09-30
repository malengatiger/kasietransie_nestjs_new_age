import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { FileArchiverService } from 'src/my-utils/zipper';
export declare class CountryService {
    private readonly zipper;
    private countryModel;
    private cityModel;
    constructor(zipper: FileArchiverService, countryModel: mongoose.Model<Country>, cityModel: mongoose.Model<City>);
    getCountryCities(countryId: string): Promise<City[]>;
    getCountries(): Promise<Country[]>;
    getCountryCitiesZippedFile(countryId: string): Promise<string>;
}
