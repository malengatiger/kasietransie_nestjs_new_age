import { Controller } from '@nestjs/common';
import { LandmarkService } from './landmark.service';

@Controller('landmark')
export class LandmarkController {
  constructor(private readonly landmarkService: LandmarkService) {}
}
