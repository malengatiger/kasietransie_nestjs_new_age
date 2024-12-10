import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RankFeeCashPayment",
})
export class RankFeeCashPayment {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  rankFeeCashPaymentId: string;
  @Prop()
  @ApiProperty()
  amount: number;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;

  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  position: Position;

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
  associationName: string;
}

export const RankFeeCashPaymentSchema =
  SchemaFactory.createForClass(RankFeeCashPayment);
