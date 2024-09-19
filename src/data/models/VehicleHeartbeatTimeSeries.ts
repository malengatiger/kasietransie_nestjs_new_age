import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HeartbeatMeta } from './HeartbeatMeta';
@Schema({
  timestamps: true,
  collection: 'VehicleHeartbeatTimeSeries',
  timeseries: {
    timeField: 'timestamp',
    metaField: 'metaData',
    granularity: 'hours',
  },
})
export class VehicleHeartbeatTimeSeries {
  @Prop()
  timestamp: Date;
  @Prop()
  metaData: HeartbeatMeta;
  @Prop()
  associationId: string;
  @Prop()
  vehicleId: string;
  @Prop()
  count: number;
}

export const VehicleHeartbeatTimeSeriesSchema = SchemaFactory.createForClass(
  VehicleHeartbeatTimeSeries,
);
