import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
import { HydratedDocument } from 'mongoose';

export type AmbassadorCheckInDocument = HydratedDocument<AmbassadorCheckIn>;
@Schema({
  timestamps: true,
  collection: 'AmbassadorCheckIn',
})
export class AmbassadorCheckIn {
  _partitionKey: string;

  _id: string;
  @Prop()
  associationId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  created: string;
  @Prop()
  userId: string;
  @Prop()
  userName: string;
  @Prop()
  position: Position;
}

export const AmbassadorCheckInSchema =
  SchemaFactory.createForClass(AmbassadorCheckIn);
