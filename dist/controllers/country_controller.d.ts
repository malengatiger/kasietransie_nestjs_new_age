import { Country } from 'src/data/models/Country';
import { CountryService } from 'src/services/CountryService';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getCountries(): Promise<Country[]>;
}
