import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';

@Schema({
  timestamps: true,
  collection: 'RoutePoint',
})
export class RoutePoint {
  _partitionKey: string;
  _id: string;
  @Prop()
  routePointId: string;
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
  @Prop()
  heading: number;
  @Prop()
  index: number;
  @Prop()
  created: string;
  @Prop()
  routeId: string;
  @Prop()
  associationId: string;
  @Prop()
  routeName: string;
  @Prop()
  position: Position;
}

export const RoutePointSchema = SchemaFactory.createForClass(RoutePoint);
