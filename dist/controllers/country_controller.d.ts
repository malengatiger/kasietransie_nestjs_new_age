import { Country } from 'src/data/models/Country';
import { CountryService } from 'src/features/country/country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getCountries(): Promise<Country[]>;
}
