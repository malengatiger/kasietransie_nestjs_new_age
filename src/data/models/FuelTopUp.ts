import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "FuelTopUp",
})
export class FuelTopUp {
  _partitionKey: string;
  _id: string;
  
  @Prop()
  @ApiProperty()
  fuelTopUpId: string;

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
  created: string;

  @Prop()
  @ApiProperty()
  fuelBrandId: string;
  @Prop()
  @ApiProperty()
  brandName: string;

  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  userName: string;

  @Prop()
  @ApiProperty()
  amount: number;
  @Prop()
  @ApiProperty()
  numberOfLitres: number;
  
  @Prop()
  @ApiProperty()
  position: Position;

}

export const FuelTopUpSchema = SchemaFactory.createForClass(FuelTopUp);
