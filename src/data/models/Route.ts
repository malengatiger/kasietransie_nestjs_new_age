import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RouteStartEnd } from "./RouteStartEnd";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "Route",
})
export class Route {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  countryName: string;
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  @ApiProperty()
  routeNumber: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  updated: string;
  @Prop()
  @ApiProperty()
  color: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  active: number;
  @Prop()
  @ApiProperty()
  activationDate: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  qrCodeUrl: string;
  @Prop()
  @ApiProperty()
  routeStartEnd: RouteStartEnd;
  @Prop()
  @ApiProperty()
  calculatedDistances: [];
  @Prop()
  @ApiProperty()
  heading: number;
  @Prop()
  @ApiProperty()
  lengthInMetres: number;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
