import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'CommuterRequest',
})
export class CommuterRequest {
  _partitionKey: string;

  _id: string;
  @Prop()
  commuterRequestId: string;
  @Prop()
  commuterId: string;
  @Prop()
  dateRequested: string;
  @Prop()
  dateNeeded: string;
  @Prop()
  currentPosition: Position;
  @Prop()
  routeId: string;
  @Prop()
  routeName: string;
  @Prop()
  routeLandmarkId: string;
  @Prop()
  routeLandmarkName: string;
  @Prop()
  routePointIndex: number;
  @Prop()
  numberOfPassengers: number;
  @Prop()
  distanceToRouteLandmarkInMetres: number;
  @Prop()
  distanceToRoutePointInMetres: number;
  @Prop()
  associationId: string;
  @Prop()
  scanned: boolean;
  @Prop()
  destinationCityId: string;
  @Prop()
  destinationCityName: string;
  @Prop()
  originCityId: string;
  @Prop()
  originCityName: string;
}

export const CommuterRequestSchema =
  SchemaFactory.createForClass(CommuterRequest);
