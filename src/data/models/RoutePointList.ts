import { ApiProperty } from '@nestjs/swagger';
import { RoutePoint } from './RoutePoint';

export class RoutePointList {
  @ApiProperty()
  routePoints: RoutePoint[];
}
