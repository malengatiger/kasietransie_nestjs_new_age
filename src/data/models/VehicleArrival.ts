import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'VehicleArrival',
})
export class VehicleArrival {
  _partitionKey: string;

  _id: string;
  @Prop()
  vehicleArrivalId: string;
  @Prop()
  landmarkId: string;
  @Prop()
  landmarkName: string;
  @Prop()
  position: Position;
  @Prop()
  created: string;
  @Prop()
  vehicleId: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  make: string;
  @Prop()
  model: string;
  @Prop()
  ownerId: string;
  @Prop()
  ownerName: string;
  @Prop()
  dispatched: boolean;
}

export const VehicleArrivalSchema =
  SchemaFactory.createForClass(VehicleArrival);
