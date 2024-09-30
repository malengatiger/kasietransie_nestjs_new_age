import { CityService } from './city.service';
import { City } from 'src/data/models/City';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    addCity(city: City): Promise<any>;
    getCitiesNear(latitude: number, longitude: number, maxDistanceInMetres: number): Promise<City[]>;
}
