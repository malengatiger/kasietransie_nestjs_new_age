export class CountryBag {
  @ApiProperty()
  countries: [];
  @ApiProperty()
  states: [];
  @ApiProperty()
  cities: [];
}
import { ApiProperty } from "@nestjs/swagger";
