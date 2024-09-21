/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "Vehicle",
})
export class Vehicle {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  cellphone: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  ownerName: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  model: string;
  @Prop()
  @ApiProperty()
  make: string;
  @Prop()
  @ApiProperty()
  year: string;
  @Prop()
  @ApiProperty()
  passengerCapacity: number;
  @Prop()
  @ApiProperty()
  active: number;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  updated: string;
  @Prop()
  @ApiProperty()
  dateInstalled: string;
  @Prop()
  @ApiProperty()
  qrCodeUrl: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
