import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "CommuterPoints",
})

export class CommuterPoints {
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  commuterPointsId: string;

  @Prop()
  @ApiProperty()
  commuterId: string;
  
  @Prop()
  @ApiProperty()
  commuterEmail: string;

  @Prop()
  @ApiProperty()
  associationPointsId: string;

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

export const CommuterPointsSchema = SchemaFactory.createForClass(CommuterPoints);
