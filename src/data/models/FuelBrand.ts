import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "FuelBrand",
})
export class FuelBrand {
  _partitionKey: string;
  _id: string;
  @Prop()
  @ApiProperty()
  fuelBrandId: string;
  @Prop()
  @ApiProperty()
  brandName: string;
  @Prop()
  @ApiProperty()
  logoUrl: string;
  @Prop()
  @ApiProperty()
  created: string;
 
}

export const FuelBrandSchema = SchemaFactory.createForClass(FuelBrand);
