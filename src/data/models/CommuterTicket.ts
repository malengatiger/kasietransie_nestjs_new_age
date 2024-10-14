import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { TicketRoute } from "./TicketRoute";

@Schema({
  timestamps: true,
  collection: "CommuterTicket",
})
export class CommuterTicket {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  commuterTicketId: string;
  @ApiProperty()
  ticketId: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  commuterId: string;
  @Prop()
  @ApiProperty()
  commuterEmail: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  commuterCellphone: string;
 
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
  
  @Prop()
  @ApiProperty()
  numberOfTrips: number;
}

export const CommuterTicketSchema = SchemaFactory.createForClass(CommuterTicket);
