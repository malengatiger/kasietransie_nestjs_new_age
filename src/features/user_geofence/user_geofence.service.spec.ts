import { Test, TestingModule } from '@nestjs/testing';
import { UserGeofenceService } from './user_geofence.service';

describe('UserGeofenceService', () => {
  let service: UserGeofenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGeofenceService],
    }).compile();

    service = module.get<UserGeofenceService>(UserGeofenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
