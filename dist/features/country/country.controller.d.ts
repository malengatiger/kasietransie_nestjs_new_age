import { CountryService } from "./country.service";
import { Country } from "src/data/models/Country";
import { Response } from "express";
import { City } from "src/data/models/City";
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    private readonly logger;
    getCountries(): Promise<Country[]>;
    getCountryCities(countryId: string): Promise<City[]>;
    getCountryCitiesZippedFile(countryId: string, res: Response): Promise<void>;
    private sendFile;
}
