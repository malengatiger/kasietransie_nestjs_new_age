import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'Country',
})
export class Country {
  _partitionKey: string;
  _id: string;
  @Prop()
  countryId: string;
  @Prop()
  name: string;
  @Prop()
  iso3: string;
  @Prop()
  iso2: string;
  @Prop()
  phoneCode: string;
  @Prop()
  capital: string;
  @Prop()
  currency: string;
  @Prop()
  currencyName: string;
  @Prop()
  currencySymbol: string;
  @Prop()
  tld: string;
  @Prop()
  region: string;
  @Prop()
  subregion: string;
  @Prop()
  timezones: [];
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
  @Prop()
  emoji: string;
  @Prop()
  emojiU: string;
  @Prop()
  position: Position;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
