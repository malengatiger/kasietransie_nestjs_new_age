/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { City } from 'src/data/models/City';
import { Country } from 'src/data/models/Country';
import { CityService } from '../city/city.service';
import {FileArchiverService} from 'src/my-utils/zipper'
const mm = '🥦🥦🥦 CountryService 🥦';

@Injectable()
export class CountryService {
  constructor(
    private readonly zipper: FileArchiverService,
    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,
    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,
  ) {}

  public async getCountryCities(countryId: string): Promise<City[]> {
    const res = await this.cityModel
      .find({ countryId: countryId })
      .sort({ name: 1 });
      Logger.log(
        `${mm} ... getCountryCities starting, id: ${countryId} found: 🔷🔷 ${res.length} cities`
      );
      return res;
  }

  public async getCountries(): Promise<Country[]> {
    const countries = await this.countryModel.find({}).sort({ name: 1 });
    console.log(`${mm} ... getCountries ... ${countries.length} found on MongoDB Atlas`);
    return countries;

  }

  public async getCountryCitiesZippedFile(countryId: string): Promise<string> {
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile starting, id: ${countryId} ...`
    );
    const list = await this.getCountryCities(countryId);
    const json = JSON.stringify(list);

    const file = await this.zipper.zip([{ contentString: json }]);
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile found:  🔷🔷 ${list.length} cities 🔷🔷`
    );
    return file;
  }

}
