import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";


export class TicketRoute {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  startCityName: string;
  @Prop()
  @ApiProperty()
  endCityName: string;
  
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  
  
}

