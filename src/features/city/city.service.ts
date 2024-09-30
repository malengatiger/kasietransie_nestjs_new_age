/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { StateProvince } from 'src/data/models/StateProvince';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = 'CityService';

@Injectable()
export class CityService {
  constructor(
    private cityService: ConfigService,
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}

  public async addCity(city: City): Promise<City> {
    return this.cityModel.create(city);
  }
  public async findCitiesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
    limit: number,
  ): Promise<City[]> {
    return await this.getCitiesNear(latitude,longitude,radiusInKM * 1000);
  }
  public async getCitiesNear(
    latitude: number,
    longitude: number,
    maxDistanceInMetres: number,
  ): Promise<City[]> {
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
    const cities = await this.cityModel.find(query);
    return cities;
  }
  public async getCountryStates(countryId: string): Promise<StateProvince[]> {
    return [];
  }
}
