import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "User",
})
export class User {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  userType: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  firstName: string;
  @Prop()
  @ApiProperty()
  lastName: string;
  @Prop()
  @ApiProperty()
  gender: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  fcmToken: string;
  @Prop()
  @ApiProperty()
  email: string;
  @Prop()
  @ApiProperty()
  cellphone: string;
  @Prop()
  @ApiProperty()
  password: string;
  @Prop()
  @ApiProperty()
  countryName: string;
  @Prop()
  @ApiProperty()
  dateRegistered: string;
  @Prop()
  @ApiProperty()
  qrCodeUrl: string;
  @Prop()
  @ApiProperty()
  profileUrl: string;
  @Prop()
  @ApiProperty()
  profileThumbnail: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
