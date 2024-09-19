import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { CountryBag } from 'src/data/models/CountryBag';
import { StateProvince } from 'src/data/models/StateProvince';
export declare class MongoService {
    private configService;
    private cityModel;
    constructor(configService: ConfigService, cityModel: mongoose.Model<City>);
    getSouthAfricanCitiesFromFile(): Promise<City[]>;
    addCountriesStatesCitiesToDB(): Promise<string>;
    findState(states: StateProvince[], city: City): Promise<StateProvince>;
    getCities(): Promise<City[]>;
    setDatabase(): Promise<void>;
    processCities(cities: City[], batchSize: number): Promise<void>;
    getCountriesFromFile(): Promise<CountryBag>;
    countriesBulkInsert(countries: Country[]): Promise<void>;
    statesBulkInsert(states: StateProvince[]): Promise<void>;
    citiesBulkInsert(cities: City[]): Promise<void>;
    addSouthAfricanCitiesToDB(): Promise<number>;
    initializeIndexes(): Promise<void>;
    checkDatabaseTotals(): Promise<string>;
}
