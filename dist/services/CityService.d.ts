import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { StateProvince } from 'src/data/models/StateProvince';
export declare class CityService {
    private cityService;
    private cityModel;
    constructor(cityService: ConfigService, cityModel: mongoose.Model<City>);
    addCity(city: City): Promise<City>;
    getCountryCities(countryId: string): Promise<City[]>;
    getCountries(): Promise<Country[]>;
    findCitiesByLocation(latitude: number, longitude: number, radiusInKM: number, limit: number): Promise<City[]>;
    getCitiesNear(latitude: number, longitude: number, maxDistanceInMetres: number): Promise<City[]>;
    getCountryStates(countryId: string): Promise<StateProvince[]>;
}
