import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "VehicleDeparture",
})
export class VehicleDeparture {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  vehicleDepartureId: string;
  @Prop()
  @ApiProperty()
  landmarkId: string;
  @Prop()
  @ApiProperty()
  landmarkName: string;
  @Prop()
  @ApiProperty()
  routeId: string;
  @Prop()
  @ApiProperty()
  routeName: string;
  @Prop()
  @ApiProperty()
  ownerId: string;
  @Prop()
  @ApiProperty()
  ownerName: string;
  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  associationName: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
  @Prop()
  @ApiProperty()
  created: string;
  @Prop()
  @ApiProperty()
  make: string;
  @Prop()
  @ApiProperty()
  model: string;
  @Prop()
  @ApiProperty()
  position: Position;

  @Prop()
  @ApiProperty()
  mDate: Date;
}

export const VehicleDepartureSchema =
  SchemaFactory.createForClass(VehicleDeparture);
