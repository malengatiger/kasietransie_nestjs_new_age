import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "AssociationPoints",
})
export class AssociationPoints {
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  associationPointsId: string;
  
  @Prop()
  @ApiProperty()
  activityType: string;

  @Prop()
  @ApiProperty()
  associationId: string;

  @Prop()
  @ApiProperty()
  associationName: string;
  
  @Prop()
  @ApiProperty()
  points: number;
 
}

export const AssociationPointsSchema = SchemaFactory.createForClass(AssociationPoints);
