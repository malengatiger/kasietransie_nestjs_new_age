import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "UserPhoto",
})
export class UserPhoto {
  _partitionKey: string;
  _id: string;
  
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  userPhotoId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  url: string;
  @Prop()
  @ApiProperty()
  thumbNailUrl: string;
  
}

export const UserPhotoSchema = SchemaFactory.createForClass(UserPhoto);
