import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'User',
})
export class User {
  _partitionKey: string;

  _id: string;
  @Prop()
  userType: string;
  @Prop()
  userId: string;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  gender: string;
  @Prop()
  countryId: string;
  @Prop()
  associationId: string;
  @Prop()
  associationName: string;
  @Prop()
  fcmToken: string;
  @Prop()
  email: string;
  @Prop()
  cellphone: string;
  @Prop()
  password: string;
  @Prop()
  countryName: string;
  @Prop()
  dateRegistered: string;
  @Prop()
  qrCodeUrl: string;
  @Prop()
  profileUrl: string;
  @Prop()
  profileThumbnail: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
