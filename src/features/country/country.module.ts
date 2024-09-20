import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DataModule } from 'src/data/data.module';
import { MessagingService } from '../fcm/fcm.service';
import { Country, CountrySchema } from 'src/data/models/Country';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/data/models/City';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';

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

      // { name: "RouteUpdateRequest", schema: RouteUpdateRequestSchema },
      // { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },
      // { name: "RouteLandmark", schema: RouteLandmarkSchema },
      // { name: "Route", schema: RouteSchema },
      // { name: "RoutePoint", schema: RoutePointSchema },
      // { name: "RouteCity", schema: RouteCitySchema },
      { name: "City", schema: CitySchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      // { name: "CalculatedDistance", schema: CalculatedDistanceSchema },
      { name: "Country", schema: CountrySchema },
      // { name: "AssociationToken", schema: AssociationTokenSchema },
      // { name: "SettingsModel", schema: SettingsModelSchema },
      // { name: "LocationRequest", schema: LocationRequestSchema },
      // { name: "LocationResponse", schema: LocationResponseSchema },

      // { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],  
  
  controllers: [CountryController],
  providers: [CountryService, MessagingService],
})
export class CountryModule {}
