import { Module } from '@nestjs/common';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatController } from './heartbeat.controller';
import { TimeSeriesService } from '../time_series/time_series.service';
import { MessagingService } from '../fcm/fcm.service';
import { DataModule } from 'src/data/data.module';
import { Vehicle, VehicleSchema } from 'src/data/models/Vehicle';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { VehicleHeartbeatSchema } from 'src/data/models/VehicleHeartbeat';
import { FileArchiverService } from 'src/my-utils/zipper';
import { NewMongoService } from 'src/data/new_mongo_service';
import { VehicleHeartbeatTimeSeriesSchema } from 'src/data/models/VehicleHeartbeatTimeSeries';
import { PassengerTimeSeriesSchema } from 'src/data/models/PassengerTimeSeries';
import { RouteUpdateRequestSchema } from 'src/data/models/RouteUpdateRequest';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Vehicle", schema: VehicleSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },

      { name: "RouteUpdateRequest", schema: RouteUpdateRequestSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
    ]),
  ],
  controllers: [HeartbeatController],
  providers: [HeartbeatService, 
    NewMongoService,
    TimeSeriesService, MessagingService, FileArchiverService],
})
export class HeartbeatModule {}
