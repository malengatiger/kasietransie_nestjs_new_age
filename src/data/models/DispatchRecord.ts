import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  collection: "DispatchRecord",
})
export class DispatchRecord {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  dispatchRecordId: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  marshalId: string;
  @Prop()
  passengers: number;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  position: Position;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  marshalName: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleArrivalId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  dispatched: boolean;
  
  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const DispatchRecordSchema =
  SchemaFactory.createForClass(DispatchRecord);


