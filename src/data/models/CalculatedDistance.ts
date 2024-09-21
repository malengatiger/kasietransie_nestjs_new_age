import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "CalculatedDistance",
})
export class CalculatedDistance {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  fromLandmark: string;
  @Prop()
  @ApiProperty()
  toLandmark: string;
  @Prop()
  @ApiProperty()
  fromLandmarkId: string;
  @Prop()
  @ApiProperty()
  toLandmarkId: string;
  @Prop()
  @ApiProperty()
  index: number;
  @Prop()
  @ApiProperty()
  distanceInMetres: number;
  @Prop()
  @ApiProperty()
  distanceFromStart: number;
  @Prop()
  @ApiProperty()
  fromRoutePointIndex: number;
  @Prop()
  @ApiProperty()
  toRoutePointIndex: number;
}

export const CalculatedDistanceSchema =
  SchemaFactory.createForClass(CalculatedDistance);
