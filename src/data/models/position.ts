import { ApiProperty } from '@nestjs/swagger';

export class Position {
  @ApiProperty()
  type: string;
  @ApiProperty()
  coordinates: [];
}
