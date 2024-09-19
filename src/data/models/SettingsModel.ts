import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({
  timestamps: true,
  collection: 'SettingsModel',
})
export class SettingsModel {
  _partitionKey: string;
  _id: string;
  //
  @Prop()
  associationId: string;
  @Prop()
  locale: string;
  @Prop()
  refreshRateInSeconds: number;
  @Prop()
  themeIndex: number;
  @Prop()
  geofenceRadius: number;
  @Prop()
  commuterGeofenceRadius: number;
  @Prop()
  vehicleSearchMinutes: number;
  @Prop()
  heartbeatIntervalSeconds: number;
  @Prop()
  loiteringDelay: number;
  @Prop()
  commuterSearchMinutes: number;
  @Prop()
  commuterGeoQueryRadius: number;
  @Prop()
  vehicleGeoQueryRadius: number;
  @Prop()
  numberOfLandmarksToScan: number;
  @Prop()
  distanceFilter: number;
  @Prop()
  created: string;
}

export const SettingsModelSchema = SchemaFactory.createForClass(SettingsModel);
