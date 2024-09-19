import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RouteStartEnd } from './RouteStartEnd';
@Schema({
  timestamps: true,
  collection: 'Route',
})
export class Route {
  _partitionKey: string;

  _id: string;
  @Prop()
  routeId: string;
  @Prop()
  countryId: string;
  @Prop()
  countryName: string;
  @Prop()
  name: string;
  @Prop()
  routeNumber: string;
  @Prop()
  created: string;
  @Prop()
  updated: string;
  @Prop()
  color: string;
  @Prop()
  userId: string;
  @Prop()
  userName: string;
  @Prop()
  active: number;
  @Prop()
  activationDate: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
  @Prop()
  qrCodeUrl: string;
  @Prop()
  routeStartEnd: RouteStartEnd;
  @Prop()
  calculatedDistances: [];
  @Prop()
  heading: number;
  @Prop()
  lengthInMetres: number;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
