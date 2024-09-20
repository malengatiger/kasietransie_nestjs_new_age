import { Controller } from '@nestjs/common';
import { AmbassadorService } from './ambassador.service';

@Controller('ambassador')
export class AmbassadorController {
  constructor(private readonly ambassadorService: AmbassadorService) {}
}
