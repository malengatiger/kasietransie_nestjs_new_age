/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import paginate from 'mongoose-paginate-v2';

@Schema({
  timestamps: true,
  collection: 'Vehicle',
})
export class Vehicle {
  _partitionKey: string;

  _id: string;
  @Prop()
  ownerId: string;
  @Prop()
  cellphone: string;
  @Prop()
  vehicleId: string;
  @Prop()
  associationId: string;
  @Prop()
  countryId: string;
  @Prop()
  ownerName: string;
  @Prop()
  associationName: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  model: string;
  @Prop()
  make: string;
  @Prop()
  year: string;
  @Prop()
  passengerCapacity: number;
  @Prop()
  active: number;
  @Prop()
  created: string;
  @Prop()
  updated: string;
  @Prop()
  dateInstalled: string;
  @Prop()
  qrCodeUrl: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
