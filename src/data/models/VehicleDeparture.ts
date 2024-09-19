import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'VehicleDeparture',
})
export class VehicleDeparture {
  _partitionKey: string;

  _id: string;
  @Prop()
  vehicleDepartureId: string;
  @Prop()
  landmarkId: string;
  @Prop()
  landmarkName: string;
  @Prop()
  ownerId: string;
  @Prop()
  ownerName: string;
  @Prop()
  vehicleId: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  created: string;
  @Prop()
  make: string;
  @Prop()
  model: string;
  @Prop()
  position: Position;
}

export const VehicleDepartureSchema =
  SchemaFactory.createForClass(VehicleDeparture);
