import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "VehicleMediaRequest",
})
export class VehicleMediaRequest {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  userId: string;
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
  requesterId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  requesterName: string;
  @Prop()
  @ApiProperty()
  addVideo: boolean;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const VehicleMediaRequestSchema =
  SchemaFactory.createForClass(VehicleMediaRequest);
