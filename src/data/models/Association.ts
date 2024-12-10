import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./User";

@Schema({
  timestamps: true,
  collection: "Association",
})
export class Association {
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  cityId: string;
  @Prop()
  @ApiProperty()
  countryId: string;

  @Prop({required: true, index: {unique: true}})
  @ApiProperty()
  associationName: string;
  
  @Prop()
  @ApiProperty()
  active: number;
  @Prop()
  @ApiProperty()
  countryName: string;
  @Prop()
  @ApiProperty()
  cityName: string;
  @Prop()
  @ApiProperty()
  dateRegistered: string;
  @Prop()
  @ApiProperty()
  position: Position;
 
  @Prop({required: true})
  @ApiProperty()
  carUser: User;

  @Prop({required: true})
  @ApiProperty()
  adminUser: User;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
