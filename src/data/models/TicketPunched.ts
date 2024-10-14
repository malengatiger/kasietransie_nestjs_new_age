import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";


@Schema({
  timestamps: true,
  collection: "CommuterTicketPunched",
})
export class CommuterTicketPunched {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  ticketId: string;
  @Prop()
  @ApiProperty()
  commuterTicketId: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  commuterId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  
  
}

export const CommuterTicketPunchedSchema = SchemaFactory.createForClass(CommuterTicketPunched);
