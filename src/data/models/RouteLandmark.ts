import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RouteLandmark",
})
export class RouteLandmark {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routePointId: string;
  @Prop()
  @ApiProperty()
  index: number;
  @Prop()
  @ApiProperty()
  routePointIndex: number;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  position: Position;
}

export const RouteLandmarkSchema = SchemaFactory.createForClass(RouteLandmark);
