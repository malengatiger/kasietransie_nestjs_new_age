import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MyUtils } from "./my-utils/my-utils";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";
import { FileArchiverService } from "./my-utils/zipper";
import { DispatchModule } from "./features/dispatch/dispatch.module";
import { AmbassadorModule } from "./features/ambassador/ambassador.module";
import { AssociationModule } from "./features/association/association.module";
import { LocationRequestModule } from "./features/location_request/location_request.module";
import { HeartbeatModule } from "./features/heartbeat/heartbeat.module";
import { VehicleModule } from "./features/vehicle/vehicle.module";
import { RouteModule } from "./features/route/route.module";
import { CountryModule } from "./features/country/country.module";
import { LandmarkModule } from "./features/landmark/landmark.module";
import { UserModule } from "./features/user/user.module";
import { DispatchService } from "./features/dispatch/dispatch.service";
import { FcmModule } from "./features/fcm/fcm.module";
import { MessagingService } from "./features/fcm/fcm.service";
import { CityModule } from "./features/city/city.module";
import { CommuterModule } from "./features/commuter/commuter.module";
import { TimeSeriesModule } from "./features/time_series/time_series.module";
import { TextTranslationModule } from "./features/text_translation/text_translation.module";
import { UserGeofenceModule } from "./features/user_geofence/user_geofence.module";
import { ErrorModule } from "./features/error/error.module";
import { MongoDataModule } from "./mongo_data/mongo_data.module";
import { AppErrorSchema } from "./data/models/AppError";
import { KasieErrorSchema } from "./data/models/kasie.error";
import { AmbassadorService } from "./features/ambassador/ambassador.service";
import { AssociationService } from "./features/association/association.service";
import { LocationRequestService } from "./features/location_request/location_request.service";
import { TimeSeriesService } from "./features/time_series/time_series.service";
//import { NewMongoService } from './data/new_mongo_service';
import { VehicleHeartbeatTimeSeriesSchema } from "./data/models/VehicleHeartbeatTimeSeries";
import { PassengerTimeSeriesSchema } from "./data/models/PassengerTimeSeries";
import { AmbassadorPassengerCountSchema } from "./data/models/AmbassadorPassengerCount";
import { UserSchema } from "./data/models/User";
import { UserGeofenceEventSchema } from "./data/models/UserGeofenceEvent";
import { AssociationSchema } from "./data/models/Association";
import { CitySchema } from "./data/models/City";
import { CommuterSchema } from "./data/models/Commuter";
import { ExampleFileSchema } from "./data/models/ExampleFile";
import { VehicleSchema } from "./data/models/Vehicle";
import { AssociationTokenSchema } from "./data/models/AssociationToken";
import { CountrySchema } from "./data/models/Country";
import { SettingsModelSchema } from "./data/models/SettingsModel";
import { LocationRequestSchema } from "./data/models/LocationRequest";
import { LocationResponseSchema } from "./data/models/LocationResponse";
import { DispatchController } from "./features/dispatch/dispatch.controller";
import { VehicleHeartbeatSchema } from "./data/models/VehicleHeartbeat";
import { VehicleArrivalSchema } from "./data/models/VehicleArrival";
import { VehicleDepartureSchema } from "./data/models/VehicleDeparture";

import { DispatchRecordSchema } from "./data/models/DispatchRecord";
import { CommuterRequestSchema } from "./data/models/CommuterRequest";
import { StorageModule } from "./storage/storage.module";
import { FirebaseAdmin } from "./services/firebase_util";
import { AmbassadorCheckInSchema } from "./data/models/AmbassadorCheckIn";
import { CityService } from "./features/city/city.service";
import { UserService } from "./features/user/user.service";
import { CloudStorageUploaderService } from "./storage/storage.service";
import { VehiclePhotoSchema } from "./data/models/VehiclePhoto";
import { VehicleVideoSchema } from "./data/models/VehicleVideo";
import { UserController } from "./features/user/user.controller";
import { ElapsedTimeMiddleware } from "./middleware/elapsed.middleware";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { QueryElapsedTimeSchema } from "./data/models/QueryElapsedTime";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { TicketModule } from "./features/ticket/ticket.module";
import { PayfastModule } from "./features/payfast/payfast.module";
import { UserPhotoSchema } from "./data/models/UserPhoto";
import { InternalModule } from "./internal/internal.module";
import { PaymentModule } from "./features/payment/payment.module";
import { TripSchema } from "./data/models/Trip";
import { CommuterService } from "./features/commuter/commuter.service";
import { CommuterController } from "./features/commuter/commuter.controller";
import { CommuterResponseSchema } from "./data/models/CommuterResponse";
import { RouteLandmarkSchema } from "./data/models/RouteLandmark";
import { RouteSchema } from "./data/models/Route";
import { CommuterCashCheckInSchema } from "./data/models/CommuterCashCheckIn";
import { CommuterCashPaymentSchema } from "./data/models/CommuterCashPayment";
import { RankFeeCashCheckInSchema } from "./data/models/RankFeeCashCheckIn";
import { RankFeeCashPaymentSchema } from "./data/models/RankFeeCashPayment";
import { VehicleTelemetrySchema } from "./data/models/VehicleTelemetry";
import { PointsModule } from './points/points.module';
import { LocationResponseErrorSchema } from "./data/models/LocationResponseError";
import { CommuterPickupSchema } from "./data/models/CommuterPickup";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: MyUtils.getDatabaseUrl(),
      }),
    }),
    MongooseModule.forFeature([
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      {
        name: "VehicleHeartbeatTimeSeries",
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
      {
        name: "VehicleHeartbeatTimeSeries",
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
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
      { name: "AmbassadorCheckIn", schema: AmbassadorCheckInSchema },
      { name: "QueryElapsedTime", schema: QueryElapsedTimeSchema },
      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "Trip", schema: TripSchema },
      { name: "CommuterResponse", schema: CommuterResponseSchema },
      { name: "RouteLandmark", schema: RouteLandmarkSchema },
      { name: "Route", schema: RouteSchema },
      { name: "Trip", schema: TripSchema },
      { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
      { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },
      { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
      { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },

      { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "LocationResponseError", schema: LocationResponseErrorSchema },
      {name: "CommuterPickup", schema: CommuterPickupSchema},


      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
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
    TicketModule,
    PayfastModule,
    InternalModule,
    CommuterModule,
    PaymentModule,
    PointsModule,
  ],
  controllers: [
    AppController,
    DispatchController,
    UserController,
    CommuterController,
  ],
  providers: [
    AppService,
    DispatchService,
    MessagingService,
    TimeSeriesService,
    UserService,
    CityService,
    CloudStorageUploaderService,
    KasieErrorHandler,
    AmbassadorService,
    AssociationService,
    LocationRequestService,
    FileArchiverService,
    FirebaseAdmin,
    CommuterService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ElapsedTimeMiddleware)
      .forRoutes("*")
      .apply(AuthMiddleware)
      .forRoutes("*");
  }
}
