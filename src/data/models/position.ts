import { ApiProperty } from '@nestjs/swagger';

export class Position {
  @ApiProperty()
  type: string;
  @ApiProperty()
  coordinates: number[];

  constructor(type: string, coordinates: number[]) {
    this.type = type;
    this.coordinates = coordinates;
  }
}
