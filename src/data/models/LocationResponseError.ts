import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "LocationResponseError",
})
export class LocationResponseError {
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
  mDate: Date;

  @Prop({required: true})
  @ApiProperty()
  fcmToken: string;

  @Prop({required: true})
  @ApiProperty()
  vehicleFcmToken: string;
}

export const LocationResponseErrorSchema =
  SchemaFactory.createForClass(LocationResponseError);
