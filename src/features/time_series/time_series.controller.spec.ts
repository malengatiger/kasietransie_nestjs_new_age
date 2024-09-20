import { Test, TestingModule } from '@nestjs/testing';
import { TimeSeriesController } from './time_series.controller';
import { TimeSeriesService } from './time_series.service';

describe('TimeSeriesController', () => {
  let controller: TimeSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSeriesController],
      providers: [TimeSeriesService],
    }).compile();

    controller = module.get<TimeSeriesController>(TimeSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
