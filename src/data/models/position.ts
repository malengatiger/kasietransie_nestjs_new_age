import { ApiProperty } from "@nestjs/swagger";
import { LocationRequest } from 'src/data/models/LocationRequest';

export class Position {
  @ApiProperty()
  type: string;
  @ApiProperty()
  coordinates: number[];
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  constructor(type: string, coordinates: number[]) {
    this.type = type;
    this.coordinates = coordinates;
    this.latitude = coordinates[1];
    this.longitude = coordinates[0];
  }
}

// export interface Position {
//   type: string;
//   coordinates: number[];
//   latitude: number;
//   longitude: number;
// }
