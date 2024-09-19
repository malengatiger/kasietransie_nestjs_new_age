import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'CommuterResponse',
})
export class CommuterResponse {
  @Prop()
  commuterResponseId: string;
  @Prop()
  commuterRequestId: string;
  @Prop()
  responseDate: string;
  @Prop()
  message: string;
  @Prop()
  routeId: string;
  @Prop()
  routeName: string;
  @Prop()
  numberOfVehiclesOnRoute: number;
  @Prop()
  routeLandmarkId: string;
  @Prop()
  routeLandmarkName: string;
  @Prop()
  associationId: string;
  @Prop()
  vehicleDispatched: boolean;
}

export const CommuterResponseSchema =
  SchemaFactory.createForClass(CommuterResponse);
