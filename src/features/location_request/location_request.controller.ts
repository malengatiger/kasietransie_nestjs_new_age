import { Controller } from '@nestjs/common';
import { LocationRequestService } from './location_request.service';

@Controller('location-request')
export class LocationRequestController {
  constructor(private readonly locationRequestService: LocationRequestService) {}
}
