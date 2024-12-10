import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  collection: "RankFeeCashCheckIn",
})
export class RankFeeCashCheckIn {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  rankFeeCashCheckInId: string;
  @Prop()
  @ApiProperty()
  amount: number;
  
  @Prop()
  @ApiProperty()
  receiptBucketFileName: string;

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
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
 
}

export const RankFeeCashCheckInSchema =
  SchemaFactory.createForClass(RankFeeCashCheckIn);


