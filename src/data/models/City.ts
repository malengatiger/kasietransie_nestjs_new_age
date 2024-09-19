import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'City',
})
export class City {
  _partitionKey: string;

  _id: string;
  @Prop()
  name: string;
  @Prop()
  cityId: string;
  @Prop()
  country: string;
  @Prop()
  countryId: string;
  @Prop()
  stateId: string;
  @Prop()
  stateName: string;
  @Prop()
  countryName: string;
  @Prop()
  province: string;
  @Prop()
  position: Position;
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
