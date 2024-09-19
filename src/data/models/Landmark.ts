import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'Landmark',
})
export class Landmark {
  _partitionKey: string;

  _id: string;
  @Prop()
  landmarkId: string;
  @Prop()
  associationId: string;
  @Prop()
  created: string;
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
  @Prop()
  distance: number;
  @Prop()
  landmarkName: string;
  @Prop()
  routeDetails: [];
  @Prop()
  position: Position;
}

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
