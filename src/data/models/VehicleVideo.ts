import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'VehicleVideo',
})
export class VehicleVideo {
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
  vehicleVideoId: string;
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

export const VehicleVideoSchema = SchemaFactory.createForClass(VehicleVideo);
