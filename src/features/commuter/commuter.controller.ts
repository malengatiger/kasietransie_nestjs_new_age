import { Controller } from '@nestjs/common';
import { CommuterService } from './commuter.service';

@Controller('commuter')
export class CommuterController {
  constructor(private readonly commuterService: CommuterService) {}
}
