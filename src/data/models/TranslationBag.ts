import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'TranslationBag',
})
export class TranslationBag {
  _partitionKey: string;

  _id: string;
  @Prop()
  stringToTranslate: string;
  @Prop()
  translatedString: string;
  @Prop()
  source: string;
  @Prop()
  target: string;
  @Prop()
  format: string;
  @Prop()
  translatedText: string;
  @Prop()
  key: string;
  @Prop()
  created: string;
}

export const TranslationBagSchema =
  SchemaFactory.createForClass(TranslationBag);
