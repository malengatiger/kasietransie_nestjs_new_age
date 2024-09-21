import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "VehiclePhoto",
})
export class VehiclePhoto {
  _partitionKey: string;

  _id: string;
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
  userName: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  vehiclePhotoId: string;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  url: string;
  @Prop()
  @ApiProperty()
  thumbNailUrl: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  position: Position;
}

export const VehiclePhotoSchema = SchemaFactory.createForClass(VehiclePhoto);
