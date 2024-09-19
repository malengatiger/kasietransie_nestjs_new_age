import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'VehicleHeartbeat',
})
export class VehicleHeartbeat {
  _partitionKey: string;

  _id: string;
  @Prop()
  vehicleHeartbeatId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  associationId: string;
  @Prop()
  ownerId: string;
  @Prop()
  ownerName: string;
  @Prop()
  position: Position;
  @Prop()
  created: string;
  @Prop()
  longDate: number;
  @Prop()
  make: string;
  @Prop()
  model: string;
  @Prop()
  appToBackground: boolean;
}

export const VehicleHeartbeatSchema =
  SchemaFactory.createForClass(VehicleHeartbeat);
