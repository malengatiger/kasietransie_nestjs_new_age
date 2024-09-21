import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RoutePoint",
})
export class RoutePoint {
  _partitionKey: string;
  _id: string;
  @Prop()
  @ApiProperty()
  routePointId: string;
  @Prop()
  @ApiProperty()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
  @Prop()
  @ApiProperty()
  heading: number;
  @Prop()
  @ApiProperty()
  index: number;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  position: Position;
}

export const RoutePointSchema = SchemaFactory.createForClass(RoutePoint);
