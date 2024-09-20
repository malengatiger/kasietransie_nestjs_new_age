import { Test, TestingModule } from '@nestjs/testing';
import { LandmarkController } from './landmark.controller';
import { LandmarkService } from './landmark.service';

describe('LandmarkController', () => {
  let controller: LandmarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandmarkController],
      providers: [LandmarkService],
    }).compile();

    controller = module.get<LandmarkController>(LandmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
