import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'AppError',
})
export class AppError {
  @Prop()
  appErrorId: string;
  @Prop()
  associationId: string;
  @Prop()
  errorMessage: string;
  @Prop()
  manufacturer: string;
  @Prop()
  model: string;
  @Prop()
  created: string;
  @Prop()
  brand: string;
  @Prop()
  userId: string;

  @Prop()
  userName: string;
  @Prop()
  errorPosition: Position;
  @Prop()
  iosName: string;
  @Prop()
  versionCodeName: string;
  @Prop()
  baseOS: string;
  @Prop()
  deviceType: string;
  @Prop()
  iosSystemName: string;
  @Prop()
  userUrl: string;
  @Prop()
  uploadedDate: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
}

export const AppErrorSchema = SchemaFactory.createForClass(AppError);
