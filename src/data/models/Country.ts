import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "Country",
})
export class Country {
  _partitionKey: string;
  _id: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  @ApiProperty()
  iso3: string;
  @Prop()
  @ApiProperty()
  iso2: string;
  @Prop()
  @ApiProperty()
  phoneCode: string;
  @Prop()
  @ApiProperty()
  capital: string;
  @Prop()
  @ApiProperty()
  currency: string;
  @Prop()
  @ApiProperty()
  currencyName: string;
  @Prop()
  @ApiProperty()
  currencySymbol: string;
  @Prop()
  @ApiProperty()
  tld: string;
  @Prop()
  @ApiProperty()
  region: string;
  @Prop()
  @ApiProperty()
  subregion: string;
  @Prop()
  @ApiProperty()
  timezones: [];
  @Prop()
  @ApiProperty()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
  @Prop()
  @ApiProperty()
  emoji: string;
  @Prop()
  @ApiProperty()
  emojiU: string;
  @Prop()
  @ApiProperty()
  position: Position;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
