import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TicketRoute } from "./TicketRoute";
import { Position } from "./position";

@Schema({
  timestamps: true,
  collection: "Trip",
})
//Used as template for commuter tickets
export class Trip {
  _partitionKey: string;
  _id: string;
  
  @Prop()
  @ApiProperty()
  tripId: string;

  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  created: string;

  @Prop()
  @ApiProperty()
  dateStarted: string
  
  @Prop()
  @ApiProperty()
  dateEnded: string;

  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop({required: true})
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;

  @Prop()
  @ApiProperty()
  vehicleId: string;

  @Prop()
  @ApiProperty()
  vehicleReg: string;

  @Prop()
  @ApiProperty()
  position: Position;

  
  
}

export const TripSchema = SchemaFactory.createForClass(Trip);
