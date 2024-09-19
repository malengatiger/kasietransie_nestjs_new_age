import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'ExampleFile',
})
export class ExampleFile {
  @Prop()
  type: string;
  @Prop()
  fileName: string;
  @Prop()
  downloadUrl: string;
}

export const ExampleFileSchema = SchemaFactory.createForClass(ExampleFile);
