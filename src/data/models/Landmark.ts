import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "Landmark",
})
export class Landmark {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
  @Prop()
  @ApiProperty()
  distance: number;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  routeDetails: [];
  @Prop()
  @ApiProperty()
  position: Position;
}

export const LandmarkSchema = SchemaFactory.createForClass(Landmark);
