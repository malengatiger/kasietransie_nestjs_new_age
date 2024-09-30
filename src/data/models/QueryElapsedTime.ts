import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "QueryElapsedTime",
})
export class QueryElapsedTime {
  @Prop()
  @ApiProperty()
  queryId: string;
  @Prop()
  @ApiProperty()
  queryParameters: string;
  @Prop()
  @ApiProperty()
  url: string;
  @Prop()
  @ApiProperty()
  elapsedSeconds: number;
  @Prop()
  @ApiProperty()
  created: string;

  @Prop()
  @ApiProperty()
  statusCode: number;
  
}

export const QueryElapsedTimeSchema = SchemaFactory.createForClass(QueryElapsedTime);
