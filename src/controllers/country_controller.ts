import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { Country } from 'src/data/models/Country';
import { CountryService } from 'src/features/country/country.service';

@Controller('api/v1')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('getCountries')
  async getCountries(): Promise<Country[]> {
    return await this.countryService.getCountries(
    );
  }
  
}
