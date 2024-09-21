import { Module } from '@nestjs/common';
import { AmbassadorService } from './ambassador.service';
import { AmbassadorController } from './ambassador.controller';
import { MessagingService } from '../fcm/fcm.service';
import { TimeSeriesService } from '../time_series/time_series.service';
import { NewMongoService } from 'src/data/new_mongo_service';
import { AmbassadorPassengerCountSchema } from 'src/data/models/AmbassadorPassengerCount';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { DispatchRecordSchema } from 'src/data/models/DispatchRecord';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { FileArchiverService } from 'src/my-utils/zipper';
import { VehicleHeartbeatTimeSeriesSchema } from 'src/data/models/VehicleHeartbeatTimeSeries';
import { PassengerTimeSeriesSchema } from 'src/data/models/PassengerTimeSeries';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      // { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      // { name: "Commuter", schema: CommuterSchema },
      // { name: "CommuterResponse", schema: CommuterResponseSchema },
      // { name: "CommuterRequest", schema: CommuterRequestSchema },
      // { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },

      // { name: "RouteUpdateRequest", schema: RouteUpdateRequestSchema },
      // { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },
      // { name: "RouteLandmark", schema: RouteLandmarkSchema },
      // { name: "Route", schema: RouteSchema },
      // { name: "RoutePoint", schema: RoutePointSchema },
      // { name: "RouteCity", schema: RouteCitySchema },
      // { name: "City", schema: CitySchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      // // { name: "CalculatedDistance", schema: CalculatedDistanceSchema },
      // { name: "Country", schema: CountrySchema },
      // { name: "Association", schema: AssociationSchema },
      // { name: "SettingsModel", schema: SettingsModelSchema },
      // { name: "LocationRequest", schema: LocationRequestSchema },
      // { name: "DispatchRecord", schema: DispatchRecordSchema },

      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
    ]),
  ],  controllers: [AmbassadorController],
  providers: [AmbassadorService, MessagingService, TimeSeriesService, NewMongoService, FileArchiverService],
})
export class AmbassadorModule {}
