/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { VehiclePhoto } from "./VehiclePhoto";
import { VehicleVideo } from "./VehicleVideo";


@Schema({
  timestamps: true,
  collection: "Vehicle",
  autoIndex: true,
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
  @Prop({required: true})
  @ApiProperty()
  vehicleId: string;
  @Prop({required: true})
  @ApiProperty()
  associationId: string;
  @Prop({required: true})
  @ApiProperty()
  countryId: string;
  @Prop({required: true})
  @ApiProperty()
  ownerName: string;
  @Prop({required: true})
  @ApiProperty()
  associationName: string;
  
  @Prop({required: true, index: { unique: true}})
  @ApiProperty()
  vehicleReg: string;
  @Prop({required: true})
  @ApiProperty()
  model: string;
  @Prop({required: true})
  @ApiProperty()
  make: string;
  @Prop({required: true})
  @ApiProperty()
  year: string;
  @Prop({required: true})
  @ApiProperty()
  passengerCapacity: number;
  @Prop({required: true})
  @ApiProperty()
  active: number;
  @Prop({required: true})
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

  @Prop({required: true})
  @ApiProperty()
  fcmToken: string;

  // photos: VehiclePhoto[];
  // videos: VehicleVideo[];
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
