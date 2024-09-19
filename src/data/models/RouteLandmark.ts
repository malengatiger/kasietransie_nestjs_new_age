import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'RouteLandmark',
})
export class RouteLandmark {
  _partitionKey: string;

  _id: string;
  @Prop()
  routeId: string;
  @Prop()
  routePointId: string;
  @Prop()
  index: number;
  @Prop()
  routePointIndex: number;
  @Prop()
  routeName: string;
  @Prop()
  landmarkId: string;
  @Prop()
  landmarkName: string;
  @Prop()
  created: string;
  @Prop()
  associationId: string;
  @Prop()
  position: Position;
}

export const RouteLandmarkSchema = SchemaFactory.createForClass(RouteLandmark);
