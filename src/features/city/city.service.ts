/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { StateProvince } from 'src/data/models/StateProvince';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = '🌼🌼🌼 CityService 🌼';

@Injectable()
export class CityService {
  constructor(
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}
  public async fixCreated(countryId: string) {
    Logger.log (`\n\n${mm} fix city created date ...`);

    const cars: City[] = await this.cityModel.find({countryId: countryId});
    let counter = 0;
    for (const city of cars) {
      city.created = new Date().toISOString();
      await this.cityModel.updateOne({ _id: city._id }, city); 
      counter++;
      if (counter % 100 === 0) {
        Logger.log(`${mm} Processed 🍎 ${counter} cities 🍎`);
      }
      await this.delay(10);
    }
    return `${mm} work done; cities fixed: 🔵🔵 ${cars.length} 🔵🔵\n\n`;
  }
 async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  public async addCity(city: City): Promise<City> {
    Logger.log(`${mm} addCity: ${JSON.stringify(city)}`)
    const res = await this.cityModel.create(city);
    return res;
  }
  public async findCitiesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
    limit: number,
  ): Promise<City[]> {
    return await this.getCitiesNear(latitude,longitude,radiusInKM * 1000, limit);
  }
  private async getCitiesNear(
    latitude: number,
    longitude: number,
    maxDistanceInMetres: number,
    limit: number,
  ): Promise<City[]> {
    Logger.debug(`${mm} latitude: ${latitude} longitude: ${longitude} max: ${maxDistanceInMetres} limit: ${limit}`);
    const query = {
      position: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: maxDistanceInMetres,
        },
      },
    };
    // Find documents based on our query
    const cities = await this.cityModel.find(query).limit(limit);
    Logger.log(`${mm} cities found by location: ${cities.length}`);
    return cities;
  }
  public async getCountryStates(countryId: string): Promise<StateProvince[]> {
    return [];
  }
}
