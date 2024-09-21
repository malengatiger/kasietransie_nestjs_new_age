import { ApiProperty } from '@nestjs/swagger';

export class HeartbeatMeta {
  @ApiProperty()
  vehicleId: string;
  @ApiProperty()
  associationId: string;
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  vehicleReg: string;
  @ApiProperty()
  latitude: number;
  @ApiProperty()
  longitude: number;
}
