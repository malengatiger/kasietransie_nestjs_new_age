import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HeartbeatMeta } from './HeartbeatMeta';

@Schema({
  timestamps: true,
  collection: 'PassengerTimeSeries',
  timeseries: {
    timeField: 'timestamp',
    metaField: 'metaData',
    granularity: 'hours',
  },
})
export class PassengerTimeSeries {
  @Prop({ type: Date }) // Use the type option with Date type
  timestamp: Date;

  @Prop()
  metaData: HeartbeatMeta;

  @Prop()
  associationId: string;

  @Prop()
  vehicleId: string;

  @Prop()
  routeId: string;

  @Prop()
  passengers: number;
}

export const PassengerTimeSeriesSchema =
  SchemaFactory.createForClass(PassengerTimeSeries);
