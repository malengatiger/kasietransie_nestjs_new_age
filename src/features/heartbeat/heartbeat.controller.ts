import { Controller } from '@nestjs/common';
import { HeartbeatService } from './heartbeat.service';

@Controller('heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}
}
