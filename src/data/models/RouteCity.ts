import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'RouteCity',
})
export class RouteCity {
  _partitionKey: string;

  _id: string;
  @Prop()
  routeId: string;
  @Prop()
  routeName: string;
  @Prop()
  cityId: string;
  @Prop()
  cityName: string;
  @Prop()
  created: string;
  @Prop()
  associationId: string;
  @Prop()
  routeLandmarkId: string;
  @Prop()
  routeLandmarkName: string;
  @Prop()
  position: Position;
}

export const RouteCitySchema = SchemaFactory.createForClass(RouteCity);
