import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RouteCity",
})
export class RouteCity {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  cityId: string;
  @Prop()
  @ApiProperty()
  cityName: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  routeLandmarkName: string;
  @Prop()
  @ApiProperty()
  position: Position;
}

export const RouteCitySchema = SchemaFactory.createForClass(RouteCity);
