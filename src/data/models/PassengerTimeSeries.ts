import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HeartbeatMeta } from "./HeartbeatMeta";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "PassengerTimeSeries",
  timeseries: {
    timeField: "timestamp",
    metaField: "metaData",
    granularity: "hours",
  },
})
export class PassengerTimeSeries {
  @Prop({ type: Date }) // Use the type option with Date type
  timestamp: Date;

  @Prop()
  @ApiProperty()
  metaData: HeartbeatMeta;

  @Prop()
  @ApiProperty()
  associationId: string;

  @Prop()
  @ApiProperty()
  vehicleId: string;

  @Prop()
  @ApiProperty()
  routeId: string;

  @Prop()
  @ApiProperty()
  passengers: number;
}

export const PassengerTimeSeriesSchema =
  SchemaFactory.createForClass(PassengerTimeSeries);
