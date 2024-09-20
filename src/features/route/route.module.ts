import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { MessagingService } from '../fcm/fcm.service';
import { FileArchiverService } from 'src/my-utils/zipper';
import { DataModule } from 'src/data/data.module';
import { CityService } from '../city/city.service';
import { Route, RouteSchema } from 'src/data/models/Route';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { RouteUpdateRequestSchema } from 'src/data/models/RouteUpdateRequest';
import { VehicleMediaRequestSchema } from 'src/data/models/VehicleMediaRequest';
import { RouteLandmarkSchema } from 'src/data/models/RouteLandmark';
import { RoutePointSchema } from 'src/data/models/RoutePoint';
import { RouteCitySchema } from 'src/data/models/RouteCity';
import { CitySchema } from 'src/data/models/City';
import { CalculatedDistanceSchema } from 'src/data/models/CalculatedDistance';
import { CountrySchema } from 'src/data/models/Country';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: "Vehicle", schema: VehicleSchema },
      // { name: "DispatchRecord", schema: DispatchRecordSchema },
      // { name: "VehicleArrival", schema: VehicleArrivalSchema },
      // { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      // { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      // { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      // { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },

      { name: "RouteUpdateRequest", schema: RouteUpdateRequestSchema },
      { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },
      { name: "RouteLandmark", schema: RouteLandmarkSchema },
      { name: "Route", schema: RouteSchema },
      { name: "RoutePoint", schema: RoutePointSchema },
      { name: "RouteCity", schema: RouteCitySchema },
      { name: "City", schema: CitySchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "CalculatedDistance", schema: CalculatedDistanceSchema },
      { name: "Country", schema: CountrySchema },
      // { name: "AssociationToken", schema: AssociationTokenSchema },
      // { name: "SettingsModel", schema: SettingsModelSchema },
      // { name: "LocationRequest", schema: LocationRequestSchema },
      // { name: "LocationResponse", schema: LocationResponseSchema },

      // { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],
  controllers: [RouteController],
  providers: [RouteService, FileArchiverService, MessagingService, CityService],
})
export class RouteModule {}
