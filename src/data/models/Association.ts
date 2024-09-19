import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'Association',
})
export class Association {
  _partitionKey: string;
  _id: string;

  @Prop()
  associationId: string;
  @Prop()
  cityId: string;
  @Prop()
  countryId: string;
  @Prop()
  associationName: string;
  @Prop()
  active: number;
  @Prop()
  countryName: string;
  @Prop()
  cityName: string;
  @Prop()
  dateRegistered: string;
  @Prop()
  position: Position;
  @Prop()
  adminUserFirstName: string;
  @Prop()
  adminUserLastName: string;
  @Prop()
  userId: string;
  @Prop()
  adminCellphone: string;
  @Prop()
  adminEmail: string;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
