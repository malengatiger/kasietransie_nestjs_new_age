import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  timestamps: true,
  collection: 'VehicleHeartbeat',
})
export class VehicleHeartbeat {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  vehicleHeartbeatId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  ownerName: string;
  @Prop()
  @ApiProperty()
  position: Position;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  longDate: number;
  @Prop()
  @ApiProperty()
  make: string;
  @Prop()
  @ApiProperty()
  model: string;
  @Prop()
  @ApiProperty()
  appToBackground: boolean;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const VehicleHeartbeatSchema =
  SchemaFactory.createForClass(VehicleHeartbeat);
