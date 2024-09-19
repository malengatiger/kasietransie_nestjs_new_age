import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'LocationRequest',
})
export class LocationRequest {
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
}

export const LocationRequestSchema =
  SchemaFactory.createForClass(LocationRequest);
