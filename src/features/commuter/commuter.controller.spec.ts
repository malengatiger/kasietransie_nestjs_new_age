import { Test, TestingModule } from '@nestjs/testing';
import { CommuterController } from './commuter.controller';
import { CommuterService } from './commuter.service';

describe('CommuterController', () => {
  let controller: CommuterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommuterController],
      providers: [CommuterService],
    }).compile();

    controller = module.get<CommuterController>(CommuterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
