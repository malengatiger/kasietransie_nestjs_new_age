import { Controller } from '@nestjs/common';
import { TimeSeriesService } from './time_series.service';

@Controller('time-series')
export class TimeSeriesController {
  constructor(private readonly timeSeriesService: TimeSeriesService) {}
}
