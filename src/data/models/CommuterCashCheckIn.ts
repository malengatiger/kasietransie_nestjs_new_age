import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  collection: "CommuterCashCheckIn",
})
export class CommuterCashCheckIn {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterCashCheckInId: string;
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

export const CommuterCashCheckInSchema =
  SchemaFactory.createForClass(CommuterCashCheckIn);


