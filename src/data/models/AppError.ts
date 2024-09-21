import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "AppError",
})
export class AppError {
  @Prop()
  @ApiProperty()
  appErrorId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  errorMessage: string;
  @Prop()
  @ApiProperty()
  manufacturer: string;
  @Prop()
  @ApiProperty()
  model: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  brand: string;
  @Prop()
  @ApiProperty()
  userId: string;

  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  errorPosition: Position;
  @Prop()
  @ApiProperty()
  iosName: string;
  @Prop()
  @ApiProperty()
  versionCodeName: string;
  @Prop()
  @ApiProperty()
  baseOS: string;
  @Prop()
  @ApiProperty()
  deviceType: string;
  @Prop()
  @ApiProperty()
  iosSystemName: string;
  @Prop()
  @ApiProperty()
  userUrl: string;
  @Prop()
  @ApiProperty()
  uploadedDate: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
}

export const AppErrorSchema = SchemaFactory.createForClass(AppError);
