import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "RouteAssignment",
})
export class RouteAssignment {
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  active: number;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
}

export const RouteAssignmentSchema =
  SchemaFactory.createForClass(RouteAssignment);
