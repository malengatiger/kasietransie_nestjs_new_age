import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { City } from 'src/data/models/City';
const mm = '🌼🌼🌼 CityController  🌼';
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post('addCity')
  async addCity(@Body() city: City): Promise<any>{
    return this.cityService.addCity(city);
  }

  @Get('findCitiesByLocation')
  public async findCitiesByLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('maxDistanceInMetres') maxDistanceInMetres: number,
    @Query('limit') limit: number
  ): Promise<City[]> {
    Logger.debug(`${mm} latitude: ${latitude} longitude: ${longitude} max: ${maxDistanceInMetres} limit: ${limit}`);
    return this.cityService.findCitiesByLocation(latitude,longitude, maxDistanceInMetres, limit);
  }

  @Get('fix')
  public async fix(@Query('countryId') countryId: string) {
    return await this.cityService.fixCreated(countryId);
  }
}
