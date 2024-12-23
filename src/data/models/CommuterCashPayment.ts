import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
  collection: "CommuterCashPayment",
})
export class CommuterCashPayment {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterCashPaymentId: string;
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
  tripId: string;
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
  mDate: Date;
}

export const CommuterCashPaymentSchema =
  SchemaFactory.createForClass(CommuterCashPayment);


