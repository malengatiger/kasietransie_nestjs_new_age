import { CityService } from './city.service';
import { City } from 'src/data/models/City';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    addCity(city: City): Promise<any>;
    findCitiesByLocation(latitude: number, longitude: number, maxDistanceInMetres: number, limit: number): Promise<City[]>;
    fix(countryId: string): Promise<string>;
}
