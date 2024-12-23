import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "KasieError",
})
/**
 * Error that occurs in the backend code
 */
export class KasieError extends HttpException {
  _partitionKey: string;
  _id: string;
  @Prop()
  @ApiProperty()
  statusCode: number;
  @Prop()
  @ApiProperty()
  message: string;
  @Prop()
  @ApiProperty()
  date: string;
  @Prop()
  @ApiProperty()
  request: string;

  @Prop()
  @ApiProperty()
  mDate: Date;

  // constructor(statusCode: number, message: string, request: string) {
  //   super(`${message} - ${request}`, statusCode);
  //   this.statusCode = statusCode;
  //   this.message = message;
  //   this.date = new Date().toISOString();
  //   this.request = request;
  // }
}
export const KasieErrorSchema = SchemaFactory.createForClass(KasieError);
