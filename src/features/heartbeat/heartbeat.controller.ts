import { Controller } from '@nestjs/common';
import { TelemetryService } from './heartbeat.service';

@Controller('heartbeat')
export class HeartbeatController {
  constructor(private readonly telemetryService: TelemetryService) {}
}
