import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'Timezone',
})
export class Timezone {
  @Prop()
  zoneName: string;
  @Prop()
  gmtOffset: number;
  @Prop()
  gmtOffsetName: string;
  @Prop()
  abbreviation: string;
  @Prop()
  tzName: string;
  @Prop()
  countryName: string;
  @Prop()
  countryId: string;
}

export const TimezoneSchema = SchemaFactory.createForClass(Timezone);
