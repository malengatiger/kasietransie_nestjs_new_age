import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'VehiclePhoto',
})
export class VehiclePhoto {
  _partitionKey: string;

  _id: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  associationId: string;
  @Prop()
  userName: string;
  @Prop()
  created: string;
  @Prop()
  vehiclePhotoId: string;
  @Prop()
  landmarkName: string;
  @Prop()
  userId: string;
  @Prop()
  url: string;
  @Prop()
  thumbNailUrl: string;
  @Prop()
  landmarkId: string;
  @Prop()
  position: Position;
}

export const VehiclePhotoSchema = SchemaFactory.createForClass(VehiclePhoto);
