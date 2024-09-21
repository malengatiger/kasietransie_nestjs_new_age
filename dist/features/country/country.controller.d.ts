import { CountryService } from "./country.service";
import { Country } from "src/data/models/Country";
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getCountries(): Promise<Country[]>;
}
