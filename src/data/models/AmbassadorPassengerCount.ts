import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Position } from './position';
@Schema({
  timestamps: true,
  collection: 'AmbassadorPassengerCount',
})
export class AmbassadorPassengerCount {
  @Prop()
  _partitionKey: string;
  @Prop()
  _id: string;
  @Prop()
  associationId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  vehicleReg: string;
  @Prop()
  created: string;
  @Prop()
  userId: string;
  @Prop()
  userName: string;
  @Prop()
  routeId: string;
  @Prop()
  routeName: string;
  @Prop()
  routeLandmarkId: string;
  @Prop()
  routeLandmarkName: string;
  @Prop()
  ownerId: string;
  @Prop()
  ownerName: string;
  @Prop()
  passengerCountId: string;
  @Prop()
  passengersIn: number;
  @Prop()
  passengersOut: number;
  @Prop()
  currentPassengers: number;
  @Prop()
  position: Position;
}

export const AmbassadorPassengerCountSchema = SchemaFactory.createForClass(
  AmbassadorPassengerCount,
);
