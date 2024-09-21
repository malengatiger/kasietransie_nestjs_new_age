import { Position } from './position';
import { ApiProperty } from '@nestjs/swagger';

export class RouteStartEnd {
  @ApiProperty()
  startCityPosition: Position;
  @ApiProperty()
  endCityPosition: Position;
  @ApiProperty()
  startCityId: string;
  @ApiProperty()
  startCityName: string;
  @ApiProperty()
  endCityId: string;
  @ApiProperty()
  endCityName: string;
}
