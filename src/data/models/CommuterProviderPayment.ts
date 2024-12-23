import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from "./PaymentProvider";

@Schema({
  timestamps: true,
  collection: "CommuterProviderPayment",
})
export class CommuterProviderPayment {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterProviderPaymentId: string;
  @Prop()
  @ApiProperty()
  amount: number;
  @Prop()
  @ApiProperty()
  numberOfPassengers: number;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  
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

  @Prop()
  @ApiProperty()
  mDate: Date;
 
 
}

export const CommuterProviderPaymentSchema =
  SchemaFactory.createForClass(CommuterProviderPayment);


