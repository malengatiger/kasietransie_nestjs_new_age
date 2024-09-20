import { Controller } from '@nestjs/common';
import { UserGeofenceService } from './user_geofence.service';

@Controller('user-geofence')
export class UserGeofenceController {
  constructor(private readonly userGeofenceService: UserGeofenceService) {}
}
