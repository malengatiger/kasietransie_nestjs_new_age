import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "PaymentProvider",
})
export class PaymentProvider {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  paymentProviderId: string;
  @Prop()
  @ApiProperty()
  paymentProviderName: string;
  @Prop()
  @ApiProperty()
  created: string;

  @Prop()
  @ApiProperty()
  baseUrl: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  countryName: string;
  
}

export const PaymentProviderSchema =
  SchemaFactory.createForClass(PaymentProvider);
