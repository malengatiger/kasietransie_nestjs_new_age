import { Test, TestingModule } from '@nestjs/testing';
import { CommuterService } from './commuter.service';

describe('CommuterService', () => {
  let service: CommuterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommuterService],
    }).compile();

    service = module.get<CommuterService>(CommuterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
