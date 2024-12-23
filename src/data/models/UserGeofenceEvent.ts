import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "UserGeofenceEvent",
})
export class UserGeofenceEvent {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  userGeofenceId: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  activityType: string;
  @Prop()
  @ApiProperty()
  action: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  longDate: number;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  confidence: number;
  @Prop()
  @ApiProperty()
  odometer: number;
  @Prop()
  @ApiProperty()
  moving: boolean;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  position: Position;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const UserGeofenceEventSchema =
  SchemaFactory.createForClass(UserGeofenceEvent);
