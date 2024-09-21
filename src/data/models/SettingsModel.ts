import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "SettingsModel",
})
export class SettingsModel {
  _partitionKey: string;
  _id: string;
  //
  @Prop()
  @ApiProperty()
  associationId: string;
  @Prop()
  @ApiProperty()
  locale: string;
  @Prop()
  @ApiProperty()
  refreshRateInSeconds: number;
  @Prop()
  @ApiProperty()
  themeIndex: number;
  @Prop()
  @ApiProperty()
  geofenceRadius: number;
  @Prop()
  @ApiProperty()
  commuterGeofenceRadius: number;
  @Prop()
  @ApiProperty()
  vehicleSearchMinutes: number;
  @Prop()
  @ApiProperty()
  heartbeatIntervalSeconds: number;
  @Prop()
  @ApiProperty()
  loiteringDelay: number;
  @Prop()
  @ApiProperty()
  commuterSearchMinutes: number;
  @Prop()
  @ApiProperty()
  commuterGeoQueryRadius: number;
  @Prop()
  @ApiProperty()
  vehicleGeoQueryRadius: number;
  @Prop()
  @ApiProperty()
  numberOfLandmarksToScan: number;
  @Prop()
  @ApiProperty()
  distanceFilter: number;
  @Prop()
  @ApiProperty()
  created: string;
}

export const SettingsModelSchema = SchemaFactory.createForClass(SettingsModel);
