import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './data/data.module';
import { MyUtils } from './my-utils/my-utils';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import { FileArchiverService } from './my-utils/zipper';
import { DispatchModule } from './features/dispatch/dispatch.module';
import { AmbassadorModule } from './features/ambassador/ambassador.module';
import { AssociationModule } from './features/association/association.module';
import { LocationRequestModule } from './features/location_request/location_request.module';
import { HeartbeatModule } from './features/heartbeat/heartbeat.module';
import { VehicleModule } from './features/vehicle/vehicle.module';
import { RouteModule } from './features/route/route.module';
import { CountryModule } from './features/country/country.module';
import { LandmarkModule } from './features/landmark/landmark.module';
import { UserModule } from './features/user/user.module';
import { DispatchService } from './features/dispatch/dispatch.service';
import { FcmModule } from './features/fcm/fcm.module';
import { MessagingService } from './features/fcm/fcm.service';
import { CityModule } from './features/city/city.module';
import { CommuterModule } from './features/commuter/commuter.module';
import { TimeSeriesModule } from './features/time_series/time_series.module';
import { TextTranslationModule } from './features/text_translation/text_translation.module';
import { UserGeofenceModule } from './features/user_geofence/user_geofence.module';
import { ErrorModule } from './features/error/error.module';
import { MongoDataModule } from './mongo_data/mongo_data.module';
import { AppErrorSchema } from './data/models/AppError';
import { KasieErrorSchema } from './data/models/kasie.error';
import { MyFirebaseService } from './services/FirebaseService';
import { AmbassadorService } from './features/ambassador/ambassador.service';
import { AssociationService } from './features/association/association.service';
import { LocationRequestService } from './features/location_request/location_request.service';
import { TimeSeriesService } from './features/time_series/time_series.service';
import { NewMongoService } from './data/new_mongo_service';
import { VehicleHeartbeatTimeSeriesSchema } from './data/models/VehicleHeartbeatTimeSeries';
import { PassengerTimeSeriesSchema } from './data/models/PassengerTimeSeries';
import { AmbassadorPassengerCountSchema } from './data/models/AmbassadorPassengerCount';
import { CityService } from './features/city/city.service';
import { UserService } from './features/user/user.service';
import { UserSchema } from './data/models/User';
import { UserGeofenceEventSchema } from './data/models/UserGeofenceEvent';
import { AssociationSchema } from './data/models/Association';
import { CitySchema } from './data/models/City';
import { CommuterSchema } from './data/models/Commuter';
import { ExampleFileSchema } from './data/models/ExampleFile';
import { VehicleSchema } from './data/models/Vehicle';
import { AssociationTokenSchema } from './data/models/AssociationToken';
import { CountrySchema } from './data/models/Country';
import { SettingsModelSchema } from './data/models/SettingsModel';
import { LocationRequestSchema } from './data/models/LocationRequest';
import { LocationResponseSchema } from './data/models/LocationResponse';
import { DispatchController } from './features/dispatch/dispatch.controller';
import { VehicleHeartbeatSchema } from './data/models/VehicleHeartbeat';
import { VehicleArrivalSchema } from './data/models/VehicleArrival';
import { VehicleDepartureSchema } from './data/models/VehicleDeparture';

import { DispatchRecordSchema } from './data/models/DispatchRecord';
import { CommuterRequestSchema } from './data/models/CommuterRequest';
import { StorageModule } from './storage/storage.module';
import { CloudStorageUploaderService } from './storage/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: MyUtils.getDatabaseUrl(),
      }),
    }),
    MongooseModule.forFeature([
      
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },
      { name: "User", schema: UserSchema },
      { name: "DispatchRecord", schema: DispatchRecordSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "Association", schema: AssociationSchema },
      { name: "City", schema: CitySchema },
      { name: "Commuter", schema: CommuterSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "Vehicle", schema: VehicleSchema },
      { name: "Country", schema: CountrySchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "SettingsModel", schema: SettingsModelSchema },
      { name: "Country", schema: CountrySchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "LocationRequest", schema: LocationRequestSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },

      { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },


    ]),
    // MongoDataModule,
    DispatchModule,
    AmbassadorModule,
    AssociationModule,
    LocationRequestModule,
    HeartbeatModule,
    VehicleModule,
    RouteModule,
    CountryModule,
    LandmarkModule,
    UserModule,
    FcmModule,
    CityModule,
    CommuterModule,
    TimeSeriesModule,
    TextTranslationModule,
    UserGeofenceModule,
    ErrorModule,
    MongoDataModule,
    StorageModule,
  ],
  controllers: [AppController, DispatchController],
  providers: [AppService, DispatchService, MessagingService, TimeSeriesService,
    NewMongoService, UserService, CityService, CloudStorageUploaderService,
    AmbassadorService, AssociationService, LocationRequestService, 
    MyFirebaseService, FileArchiverService],
})
export class AppModule {}
