/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';

const mm = 'CountryService';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}

  public async getCountryCities(countryId: string): Promise<City[]> {
    return await this.cityModel
      .find({ countryId: countryId })
      .sort({ name: 1 });
  }

  public async getCountries(): Promise<Country[]> {
    console.log(`${mm} getCountries ...`);
    return await this.countryModel.find({}).sort({ name: 1 });
  }
}
