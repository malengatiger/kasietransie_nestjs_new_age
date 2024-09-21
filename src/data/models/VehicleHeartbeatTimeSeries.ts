import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HeartbeatMeta } from "./HeartbeatMeta";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
  timestamps: true,
  collection: "VehicleHeartbeatTimeSeries",
  timeseries: {
    timeField: "timestamp",
    metaField: "metaData",
    granularity: "hours",
  },
})
export class VehicleHeartbeatTimeSeries {
  @Prop()
  @ApiProperty()
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
  count: number;
}

export const VehicleHeartbeatTimeSeriesSchema = SchemaFactory.createForClass(
  VehicleHeartbeatTimeSeries
);
