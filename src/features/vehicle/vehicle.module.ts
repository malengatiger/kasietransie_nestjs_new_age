import { Module } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { AssociationService } from "../association/association.service";
import { MessagingService } from "../fcm/fcm.service";
import { VehicleSchema } from "src/data/models/Vehicle";
import { MongooseModule } from "@nestjs/mongoose";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";
import { VehicleArrivalSchema } from "src/data/models/VehicleArrival";
import { VehicleDepartureSchema } from "src/data/models/VehicleDeparture";
import { VehicleHeartbeatSchema } from "src/data/models/VehicleHeartbeat";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { AssociationSchema } from "src/data/models/Association";
import { UserSchema } from "src/data/models/User";
import { RouteAssignmentSchema } from "src/data/models/RouteAssignment";
import { RouteSchema } from "src/data/models/Route";
import { FileArchiverService } from "src/my-utils/zipper";
import { UserService } from "../user/user.service";
import { UserGeofenceEventSchema } from "src/data/models/UserGeofenceEvent";
import { CityService } from "../city/city.service";
import { CitySchema } from "src/data/models/City";
import { CommuterSchema } from "src/data/models/Commuter";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { ExampleFileSchema } from "src/data/models/ExampleFile";
import { CountrySchema } from "src/data/models/Country";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { SettingsModelSchema } from "src/data/models/SettingsModel";
import { DispatchService } from "../dispatch/dispatch.service";
import { CommuterRequestSchema } from "src/data/models/CommuterRequest";
import { MediaService } from "src/services/MediaService";
import { VehiclePhotoSchema } from "src/data/models/VehiclePhoto";
import { VehicleVideoSchema } from "src/data/models/VehicleVideo";
import { VehicleMediaRequestSchema } from "src/data/models/VehicleMediaRequest";
import { LocationRequestSchema } from "src/data/models/LocationRequest";
import { LocationRequestService } from "../location_request/location_request.service";
import { LocationResponseSchema } from "src/data/models/LocationResponse";
import { RouteService } from "../route/route.service";
import { RouteLandmarkSchema } from "src/data/models/RouteLandmark";
import { RouteCitySchema } from "src/data/models/RouteCity";
import { RoutePointSchema } from "src/data/models/RoutePoint";
import { CalculatedDistanceSchema } from "src/data/models/CalculatedDistance";
import { TimeSeriesService } from "../time_series/time_series.service";
import { VehicleHeartbeatTimeSeriesSchema } from "src/data/models/VehicleHeartbeatTimeSeries";
import { PassengerTimeSeriesSchema } from "src/data/models/PassengerTimeSeries";
import { RouteUpdateRequestSchema } from "src/data/models/RouteUpdateRequest";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { FirebaseAdmin } from "src/services/firebase_util";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { UserPhotoSchema } from "src/data/models/UserPhoto";
import { TelemetryService } from "../heartbeat/heartbeat.service";
import { VehicleTelemetrySchema } from "src/data/models/VehicleTelemetry";
import { TripSchema } from "src/data/models/Trip";
import { CommuterCashCheckInSchema } from "src/data/models/CommuterCashCheckIn";
import { CommuterCashPaymentSchema } from "src/data/models/CommuterCashPayment";
import { RankFeeCashCheckInSchema } from "src/data/models/RankFeeCashCheckIn";
import { RankFeeCashPaymentSchema } from "src/data/models/RankFeeCashPayment";
import { LocationResponseErrorSchema } from "src/data/models/LocationResponseError";
import { FuelBrandSchema } from "src/data/models/FuelBrand";
import { FuelTopUpSchema } from "src/data/models/FuelTopUp";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Vehicle", schema: VehicleSchema },
      { name: "DispatchRecord", schema: DispatchRecordSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },

      { name: "Association", schema: AssociationSchema },
      { name: "RouteAssignment", schema: RouteAssignmentSchema },
      { name: "User", schema: UserSchema },
      { name: "Route", schema: RouteSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "City", schema: CitySchema },
      { name: "Commuter", schema: CommuterSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "Country", schema: CountrySchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "SettingsModel", schema: SettingsModelSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },
      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
      { name: "LocationRequest", schema: LocationRequestSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },
      { name: "RouteUpdateRequest", schema: RouteUpdateRequestSchema },
      { name: "RouteLandmark", schema: RouteLandmarkSchema },
      { name: "RouteCity", schema: RouteCitySchema },
      { name: "Route", schema: RouteSchema },
      { name: "RoutePoint", schema: RoutePointSchema },
      { name: "CalculatedDistance", schema: CalculatedDistanceSchema },
      {
        name: "VehicleHeartbeatTimeSeries",
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },
      { name: "City", schema: CitySchema },
      { name: "City", schema: CitySchema },
      { name: "Trip", schema: TripSchema },

      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
      { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },
      { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
      { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },

      { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "LocationResponseError", schema: LocationResponseErrorSchema },
      { name: "FuelBrand", schema: FuelBrandSchema },

      { name: "FuelTopUp", schema: FuelTopUpSchema },

    ]),
  ],
  controllers: [VehicleController],
  providers: [
    TelemetryService,
    VehicleService,
    UserService,
    CityService,
    KasieErrorHandler,
    RouteService,
    TimeSeriesService,
    DispatchService,
    MediaService,
    LocationRequestService,
    AssociationService,
    MessagingService,
    FileArchiverService,
    CloudStorageUploaderService,
    FirebaseAdmin,
  ],
})
export class VehicleModule {}
