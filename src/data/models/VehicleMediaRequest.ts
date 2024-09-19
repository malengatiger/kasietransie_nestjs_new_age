import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'VehicleMediaRequest',
})
export class VehicleMediaRequest {
  _partitionKey: string;

  _id: string;
  @Prop()
  userId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  created: string;
  @Prop()
  requesterId: string;
  @Prop()
  associationId: string;
  @Prop()
  requesterName: string;
  @Prop()
  addVideo: boolean;
}

export const VehicleMediaRequestSchema =
  SchemaFactory.createForClass(VehicleMediaRequest);
