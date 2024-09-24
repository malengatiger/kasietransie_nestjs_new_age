import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

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
  @Prop()
  @ApiProperty()
  adminUserFirstName: string;
  @Prop()
  @ApiProperty()
  adminUserLastName: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  adminCellphone: string;
  @Prop()
  @ApiProperty()
  adminEmail: string;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);
