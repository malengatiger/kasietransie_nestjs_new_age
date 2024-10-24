import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";


export class TicketRoute {
  

  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  startCityName: string;
  @Prop()
  @ApiProperty()
  endCityName: string;
  
  
}

