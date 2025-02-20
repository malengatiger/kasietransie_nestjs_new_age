import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "LocationResponse",
})
export class LocationResponse {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  position: Position;

  @Prop()
  @ApiProperty()
  mDate: Date;

  @Prop({required: true})
  @ApiProperty()
  fcmToken: string;

  @Prop({required: true})
  @ApiProperty()
  vehicleFcmToken: string;
}

export const LocationResponseSchema =
  SchemaFactory.createForClass(LocationResponse);
