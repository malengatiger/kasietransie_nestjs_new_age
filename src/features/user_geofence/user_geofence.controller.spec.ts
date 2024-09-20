import { Test, TestingModule } from '@nestjs/testing';
import { UserGeofenceController } from './user_geofence.controller';
import { UserGeofenceService } from './user_geofence.service';

describe('UserGeofenceController', () => {
  let controller: UserGeofenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGeofenceController],
      providers: [UserGeofenceService],
    }).compile();

    controller = module.get<UserGeofenceController>(UserGeofenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
