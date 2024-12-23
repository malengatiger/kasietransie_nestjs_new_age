import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
import { ApiProperty } from '@nestjs/swagger';
@Schema({
  timestamps: true,
  collection: 'VehicleTelemetry',
})
export class VehicleTelemetry {
  _id: string;
  _partitionKey: string;
  @Prop()
  @ApiProperty()
  vehicleTelemetryId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  make: string;
  @Prop()
  @ApiProperty()
  model: string;
  @Prop()
  @ApiProperty()
  year: string;
  @Prop()
  @ApiProperty()
  position: Position;
  @Prop()
  @ApiProperty()
  nearestRouteName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  nearestRouteLandmarkName: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  ownerName: string;
  @Prop()
  @ApiProperty()
  accuracy: number;
  @Prop()
  @ApiProperty()
  heading: number;
  @Prop()
  @ApiProperty()
  altitude: number;
  @Prop()
  @ApiProperty()
  altitudeAccuracy: number;
  @Prop()
  @ApiProperty()
  speed: number;
  @Prop()
  @ApiProperty()
  speedAccuracy: number;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const VehicleTelemetrySchema =
  SchemaFactory.createForClass(VehicleTelemetry);

