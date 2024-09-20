import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatController } from './heartbeat.controller';
import { HeartbeatService } from './heartbeat.service';

describe('HeartbeatController', () => {
  let controller: HeartbeatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartbeatController],
      providers: [HeartbeatService],
    }).compile();

    controller = module.get<HeartbeatController>(HeartbeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
