import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RouteUpdateRequest",
})
export class RouteUpdateRequest {
  _partitionKey: string;
  _id: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  @ApiProperty()
  userName: string;
}

export const RouteUpdateRequestSchema =
  SchemaFactory.createForClass(RouteUpdateRequest);
