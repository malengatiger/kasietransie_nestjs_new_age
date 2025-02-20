import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "Commuter",
})
export class Commuter {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterId: string;
  @Prop()
  @ApiProperty()
  cellphone: string;
  @Prop()
  @ApiProperty()
  email: string;
  @Prop()
  @ApiProperty()
  name: string;
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
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  password: string;
  @Prop()
  @ApiProperty()
  gender: string;
  @Prop()
  @ApiProperty()
  fcmToken: string;
  @Prop()
  @ApiProperty()
  created: string;
}

export const CommuterSchema = SchemaFactory.createForClass(Commuter);
