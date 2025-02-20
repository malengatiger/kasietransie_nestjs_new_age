import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TicketRoute } from "./TicketRoute";

@Schema({
  timestamps: true,
  collection: "Ticket",
})
//Used as template for commuter tickets
export class Ticket {
  _partitionKey: string;

  _id: string;

  @Prop()
  @ApiProperty()
  ticketId: string;

  @Prop()
  @ApiProperty()
  userId: string;
  
  @Prop()
  @ApiProperty()
  created: string;

  @Prop()
  @ApiProperty()
  validOnAllRoutes: boolean
  
  @Prop()
  @ApiProperty()
  value: number;

  @Prop()
  @ApiProperty()
  ticketType: string;
  
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
  ticketRoutes: TicketRoute[];

  @Prop()
  @ApiProperty()
  numberOfTrips: number;


  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
