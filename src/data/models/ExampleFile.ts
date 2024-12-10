import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "ExampleFile",
})
export class ExampleFile {
  @Prop()
  @ApiProperty()
  type: string;
  @Prop()
  @ApiProperty()
  fileName: string;
  @Prop()
  @ApiProperty()
  downloadUrl: string;
  
  @Prop({required: true})
  @ApiProperty()
  bucketFileName: string;
}

export const ExampleFileSchema = SchemaFactory.createForClass(ExampleFile);
