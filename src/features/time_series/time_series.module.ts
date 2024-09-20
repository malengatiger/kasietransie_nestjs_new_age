import { Module } from '@nestjs/common';
import { TimeSeriesService } from './time_series.service';
import { TimeSeriesController } from './time_series.controller';
import { FileArchiverService } from 'src/my-utils/zipper';
import { NewMongoService } from 'src/data/db_ping';
import { VehicleHeartbeatTimeSeriesSchema } from 'src/data/models/VehicleHeartbeatTimeSeries';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerTimeSeriesSchema } from 'src/data/models/PassengerTimeSeries';

@Module({
  imports: [
    MongooseModule.forFeature([
     
      { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },

    ]),
  ],  
  
  controllers: [TimeSeriesController],
  providers: [TimeSeriesService, FileArchiverService, NewMongoService],
})
export class TimeSeriesModule {}
