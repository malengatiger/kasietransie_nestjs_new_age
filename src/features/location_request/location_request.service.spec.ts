import { Test, TestingModule } from '@nestjs/testing';
import { LocationRequestService } from './location_request.service';

describe('LocationRequestService', () => {
  let service: LocationRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationRequestService],
    }).compile();

    service = module.get<LocationRequestService>(LocationRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
