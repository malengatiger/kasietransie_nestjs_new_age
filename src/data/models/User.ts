import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "User",
})
export class User {
  _partitionKey: string;

  _id: string;
  @Prop({required: true})
  @ApiProperty()
  userType: string;
  @Prop({required: true})
  @ApiProperty()
  userId: string;
  @Prop({required: true})
  @ApiProperty()
  firstName: string;
  @Prop({required: true})
  @ApiProperty()
  lastName: string;
  @Prop()
  @ApiProperty()
  gender: string;
  @Prop({required: true})
  @ApiProperty()
  countryId: string;
  @Prop({required: true})
  @ApiProperty()
  associationId: string;
  @Prop({required: true})
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
  @Prop({required: true})
  @ApiProperty()
  bucketFileName: string;
  @Prop()
  @ApiProperty()
  profileUrl: string;
  @Prop()
  @ApiProperty()
  profileThumbnail: string;
  @Prop({required: true})
  @ApiProperty()
  qrCodeBytes: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
