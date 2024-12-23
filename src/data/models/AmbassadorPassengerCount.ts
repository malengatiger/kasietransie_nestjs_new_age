import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "AmbassadorPassengerCount",
})
export class AmbassadorPassengerCount {
 
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  tripId: string;
  @Prop()
  @ApiProperty()
  userName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  routeLandmarkId: string;
  @Prop()
  @ApiProperty()
  routeLandmarkName: string;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  ownerName: string;
  @Prop()
  @ApiProperty()
  passengerCountId: string;
  @Prop()
  @ApiProperty()
  passengersIn: number;
  @Prop()
  @ApiProperty()
  passengersOut: number;
  @Prop()
  @ApiProperty()
  currentPassengers: number;
  @Prop()
  @ApiProperty()
  position: Position;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const AmbassadorPassengerCountSchema = SchemaFactory.createForClass(
  AmbassadorPassengerCount
);
