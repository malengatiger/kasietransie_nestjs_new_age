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
  validFromDate: string;
  @Prop()
  @ApiProperty()
  validToDate: string;

  @Prop()
  @ApiProperty()
  value: string;

  @Prop()
  @ApiProperty()
  ticketType: number;
  
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
  
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
