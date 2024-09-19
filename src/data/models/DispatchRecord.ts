import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'DispatchRecord',
})
export class DispatchRecord {
  _partitionKey: string;

  _id: string;
  @Prop()
  dispatchRecordId: string;
  @Prop()
  routeLandmarkId: string;
  @Prop()
  marshalId: string;
  @Prop()
  passengers: number;
  @Prop()
  ownerId: string;
  @Prop()
  created: string;
  @Prop()
  position: Position;
  @Prop()
  landmarkName: string;
  @Prop()
  marshalName: string;
  @Prop()
  routeName: string;
  @Prop()
  routeId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleArrivalId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
  @Prop()
  dispatched: boolean;
}

export const DispatchRecordSchema =
  SchemaFactory.createForClass(DispatchRecord);
