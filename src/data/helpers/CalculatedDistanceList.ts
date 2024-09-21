import { CalculatedDistance } from 'src/data/models/CalculatedDistance';
import { ApiProperty } from '@nestjs/swagger';

export class CalculatedDistanceList {
  @ApiProperty()
  calculatedDistances: CalculatedDistance[];
}
