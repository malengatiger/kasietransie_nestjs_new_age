import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "TranslationBag",
})
export class TranslationBag {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  stringToTranslate: string;
  @Prop()
  @ApiProperty()
  translatedString: string;
  @Prop()
  @ApiProperty()
  source: string;
  @Prop()
  @ApiProperty()
  target: string;
  @Prop()
  @ApiProperty()
  format: string;
  @Prop()
  @ApiProperty()
  translatedText: string;
  @Prop()
  @ApiProperty()
  key: string;
  @Prop()
  @ApiProperty()
  created: string;
}

export const TranslationBagSchema =
  SchemaFactory.createForClass(TranslationBag);
