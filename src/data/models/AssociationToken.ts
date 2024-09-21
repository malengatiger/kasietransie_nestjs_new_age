import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "AssociationToken",
})
export class AssociationToken {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  token: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
}

export const AssociationTokenSchema =
  SchemaFactory.createForClass(AssociationToken);
