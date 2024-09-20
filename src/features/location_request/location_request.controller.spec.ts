import { Test, TestingModule } from '@nestjs/testing';
import { LocationRequestController } from './location_request.controller';
import { LocationRequestService } from './location_request.service';

describe('LocationRequestController', () => {
  let controller: LocationRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationRequestController],
      providers: [LocationRequestService],
    }).compile();

    controller = module.get<LocationRequestController>(LocationRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
