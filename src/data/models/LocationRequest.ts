import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "LocationRequest",
})
export class LocationRequest {
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

  @Prop({required: true})
  @ApiProperty()
  fcmToken: string;

  @Prop({required: true})
  @ApiProperty()
  vehicleFcmToken: string;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const LocationRequestSchema =
  SchemaFactory.createForClass(LocationRequest);
