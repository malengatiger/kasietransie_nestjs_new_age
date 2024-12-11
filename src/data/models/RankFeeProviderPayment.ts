import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from "./PaymentProvider";

@Schema({
  timestamps: true,
  collection: "RankFeeProviderPayment",
})
export class RankFeeProviderPayment {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  rankFeeProviderPaymentId: string;
  @Prop()
  @ApiProperty()
  amount: number;
  
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

  @Prop()
  @ApiProperty()
  paymentProvider: PaymentProvider;
 
 
}

export const RankFeeProviderPaymentSchema =
  SchemaFactory.createForClass(RankFeeProviderPayment);


