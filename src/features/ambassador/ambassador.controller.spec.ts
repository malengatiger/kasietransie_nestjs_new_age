import { Test, TestingModule } from '@nestjs/testing';
import { AmbassadorController } from './ambassador.controller';
import { AmbassadorService } from './ambassador.service';

describe('AmbassadorController', () => {
  let controller: AmbassadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmbassadorController],
      providers: [AmbassadorService],
    }).compile();

    controller = module.get<AmbassadorController>(AmbassadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
