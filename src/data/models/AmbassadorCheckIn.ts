import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type AmbassadorCheckInDocument = HydratedDocument<AmbassadorCheckIn>;
@Schema({
  timestamps: true,
  collection: "AmbassadorCheckIn",
})
export class AmbassadorCheckIn {
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
}

export const AmbassadorCheckInSchema =
  SchemaFactory.createForClass(AmbassadorCheckIn);
