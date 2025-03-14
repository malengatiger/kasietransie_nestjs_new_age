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
  @Prop({required: true})
  @ApiProperty()
  bucketFileName: string;
  @Prop()
  @ApiProperty()
  validToDateFrom: string;
  @Prop({required: true})
  @ApiProperty()
  qrCodeBytes: string;
  @Prop()
  @ApiProperty()
  validToDateTo: string;
  @Prop()
  @ApiProperty()
  value: number;
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

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const CommuterTicketSchema = SchemaFactory.createForClass(CommuterTicket);
