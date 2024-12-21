import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "CommuterRequest",
})
export class CommuterRequest {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterRequestId: string;
  @Prop()
  @ApiProperty()
  commuterId: string;
  @Prop()
  @ApiProperty()
  dateRequested: string;
  @Prop()
  @ApiProperty()
  dateNeeded: string;
  @Prop()
  @ApiProperty()
  currentPosition: Position;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  
  @Prop()
  @ApiProperty()
  numberOfPassengers: number;
  
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  scanned: boolean;
 
  @Prop({required: true})
  @ApiProperty()
  fcmToken: string;
}

export const CommuterRequestSchema =
  SchemaFactory.createForClass(CommuterRequest);
