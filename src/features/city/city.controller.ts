import { Body, Controller, Get, Post } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from 'src/data/models/City';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('addCity')
  async addCity(@Body('city') city: City): Promise<any>{
    return this.cityService.addCity(city);
  }
  
  @Get('getCitiesNear')
  public async getCitiesNear(
    latitude: number,
    longitude: number,
    maxDistanceInMetres: number,
  ): Promise<City[]> {
    return this.cityService.getCitiesNear(latitude,longitude, maxDistanceInMetres);
  }
}
