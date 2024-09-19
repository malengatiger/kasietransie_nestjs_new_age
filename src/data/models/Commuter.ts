import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'Commuter',
})
export class Commuter {
  _partitionKey: string;

  _id: string;
  @Prop()
  commuterId: string;
  @Prop()
  cellphone: string;
  @Prop()
  email: string;
  @Prop()
  name: string;
  @Prop()
  dateRegistered: string;
  @Prop()
  qrCodeUrl: string;
  @Prop()
  profileUrl: string;
  @Prop()
  profileThumbnail: string;
  @Prop()
  countryId: string;
  @Prop()
  password: string;
  @Prop()
  gender: string;
}

export const CommuterSchema = SchemaFactory.createForClass(Commuter);
