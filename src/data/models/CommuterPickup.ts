import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "CommuterPickup",
})

export class CommuterPickup {
  _partitionKey: string;
  _id: string;

  @Prop()
  @ApiProperty()
  commuterPickupId: string;

  @Prop()
  @ApiProperty()
  commuterId: string;
  
  @Prop()
  @ApiProperty()
  commuterRequestId: string;

  @Prop()
  @ApiProperty()
  commuterEmail: string;

  @Prop()
  @ApiProperty()
  associationId: string;

  @Prop()
  @ApiProperty()
  associationName: string;

  @Prop()
  @ApiProperty()
  vehicleId: string;
  @Prop()
  @ApiProperty()
  vehicleReg: string;
 
  @Prop()
  @ApiProperty()
  created: string;
}

export const CommuterPickupSchema = SchemaFactory.createForClass(CommuterPickup);
