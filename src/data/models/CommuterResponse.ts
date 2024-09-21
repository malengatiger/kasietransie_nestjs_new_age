import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "CommuterResponse",
})
export class CommuterResponse {
  @Prop()
  @ApiProperty()
  commuterResponseId: string;
  @Prop()
  @ApiProperty()
  commuterRequestId: string;
  @Prop()
  @ApiProperty()
  responseDate: string;
  @Prop()
  @ApiProperty()
  message: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  numberOfVehiclesOnRoute: number;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  routeLandmarkName: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  vehicleDispatched: boolean;
}

export const CommuterResponseSchema =
  SchemaFactory.createForClass(CommuterResponse);
