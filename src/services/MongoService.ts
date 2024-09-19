/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { CountryBag } from 'src/data/models/CountryBag';
import { StateProvince } from 'src/data/models/StateProvince';

const mm = 'MongoService';

@Injectable()
export class MongoService {
  constructor(
    private configService: ConfigService,
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}

  public async getSouthAfricanCitiesFromFile(): Promise<City[]> {
    return [];
  }
  public async addCountriesStatesCitiesToDB(): Promise<string> {
    return null;
  }
  public async findState(states: StateProvince[], city: City): Promise<StateProvince> {
    return null;
  }
  public async getCities(): Promise<City[]> {
    return [];
  }
  public async setDatabase(): Promise<void> {
    return null;
  }
  public async processCities(cities: City[], batchSize: number): Promise<void> {
    return null;
  }
  public async getCountriesFromFile(): Promise<CountryBag> {
    return null;
  }
  public async countriesBulkInsert(countries: Country[]): Promise<void> {
    return null;
  }
  public async statesBulkInsert(states: StateProvince[]): Promise<void> {
    return null;
  }
  public async citiesBulkInsert(cities: City[]): Promise<void> {
    return null;
  }
  public async addSouthAfricanCitiesToDB(): Promise<number> {
    return null;
  }
  public async initializeIndexes(): Promise<void> {
    return null;
  }
  public async checkDatabaseTotals(): Promise<string> {
    return null;
  }
}
