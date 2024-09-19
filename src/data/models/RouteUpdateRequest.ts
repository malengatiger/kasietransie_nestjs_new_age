import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'RouteUpdateRequest',
})
export class RouteUpdateRequest {
  _partitionKey: string;
  _id: string;
  @Prop()
  associationId: string;
  @Prop()
  routeId: string;
  @Prop()
  routeName: string;
  @Prop()
  created: string;
  @Prop()
  userId: string;
  @Prop()
  userName: string;
}

export const RouteUpdateRequestSchema =
  SchemaFactory.createForClass(RouteUpdateRequest);
