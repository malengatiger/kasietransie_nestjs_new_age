import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Position } from "./position";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "City",
})
export class City {
  _partitionKey: string;

  _id: string;
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  @ApiProperty()
  cityId: string;
  @Prop()
  @ApiProperty()
  country: string;
  @Prop()
  @ApiProperty()
  countryId: string;
  @Prop()
  @ApiProperty()
  stateId: string;
  @Prop()
  @ApiProperty()
  stateName: string;
  @Prop()
  @ApiProperty()
  countryName: string;
  @Prop()
  @ApiProperty()
  province: string;
  @Prop()
  @ApiProperty()
  position: Position;
  @Prop()
  @ApiProperty()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
}

export const CitySchema = SchemaFactory.createForClass(City);
