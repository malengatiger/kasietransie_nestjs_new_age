import { Body, Controller, Post } from '@nestjs/common';
import { LocationRequestService } from './location_request.service';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { LocationResponseError } from 'src/data/models/LocationResponseError';

@Controller('locationRequest')
export class LocationRequestController {
  constructor(private readonly locationRequestService: LocationRequestService) {}

  @Post('addLocationRequest')
  public async addLocationRequest(
    @Body() locationRequest: LocationRequest
  ): Promise<any> {

    return this.locationRequestService.addLocationRequest(locationRequest);
  }
  @Post('addLocationResponse')
  public async addLocationResponse(
    @Body() locationResponse: LocationResponse
  ): Promise<any> {

    return this.locationRequestService.addLocationResponse(locationResponse);
  }

  @Post('addLocationResponseError')
  public async addLocationResponseError(
    @Body() locationResponseError: LocationResponseError
  ): Promise<any> {

    return this.locationRequestService.addLocationResponseError(locationResponseError);
  }
}
