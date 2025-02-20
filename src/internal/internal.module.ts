import { Module } from "@nestjs/common";
import { InternalService } from "./internal.service";
import { InternalController } from "./internal.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/data/models/User";
import { VehicleSchema } from "src/data/models/Vehicle";
import { UserService } from "src/features/user/user.service";
import { FirebaseAdmin } from "src/services/firebase_util";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { UserGeofenceEventSchema } from "src/data/models/UserGeofenceEvent";
import { AssociationSchema } from "src/data/models/Association";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { MessagingService } from "src/features/fcm/fcm.service";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { ExampleFileSchema } from "src/data/models/ExampleFile";
import { UserPhotoSchema } from "src/data/models/UserPhoto";
import { VehiclePhotoSchema } from "src/data/models/VehiclePhoto";
import { VehicleVideoSchema } from "src/data/models/VehicleVideo";
import { VehicleArrivalSchema } from "src/data/models/VehicleArrival";
import { VehicleTelemetrySchema } from "src/data/models/VehicleTelemetry";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";
import { TicketSchema } from "src/data/models/Ticket";
import { CommuterRequestSchema } from "src/data/models/CommuterRequest";
import { DispatchService } from "src/features/dispatch/dispatch.service";
import { CommuterService } from "src/features/commuter/commuter.service";
import { PaymentService } from "src/features/payment/payment.service";
import { VehicleService } from "src/features/vehicle/vehicle.service";
import { AmbassadorService } from "src/features/ambassador/ambassador.service";
import { RouteSchema } from "src/data/models/Route";
import { TimeSeriesService } from "src/features/time_series/time_series.service";
import { FileArchiverService } from "src/my-utils/zipper";
import { VehicleHeartbeatTimeSeriesSchema } from "src/data/models/VehicleHeartbeatTimeSeries";
import { PassengerTimeSeriesSchema } from "src/data/models/PassengerTimeSeries";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { AmbassadorCheckInSchema } from "src/data/models/AmbassadorCheckIn";
import { VehicleHeartbeatSchema } from "src/data/models/VehicleHeartbeat";
import { VehicleDepartureSchema } from "src/data/models/VehicleDeparture";
import { TripSchema } from "src/data/models/Trip";
import { CommuterSchema } from "src/data/models/Commuter";
import { CommuterResponseSchema } from "src/data/models/CommuterResponse";
import { RouteLandmarkSchema } from "src/data/models/RouteLandmark";
import { CommuterCashPaymentSchema } from "src/data/models/CommuterCashPayment";
import { CommuterProviderPaymentSchema } from "src/data/models/CommuterProviderPayment";
import { RankFeeCashPaymentSchema } from "src/data/models/RankFeeCashPayment";
import { RankFeeProviderPaymentSchema } from "src/data/models/RankFeeProviderPayment";
import { CommuterCashCheckInSchema } from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashCheckInSchema } from "src/data/models/RankFeeCashCheckIn";
import { PaymentProviderSchema } from "src/data/models/PaymentProvider";
import { AssociationService } from "src/features/association/association.service";
import { CityService } from "src/features/city/city.service";
import { CitySchema } from "src/data/models/City";
import { SettingsModelSchema } from "src/data/models/SettingsModel";
import { CountrySchema } from "src/data/models/Country";
import { AppErrorSchema } from "src/data/models/AppError";
import { RouteAssignmentSchema } from "src/data/models/RouteAssignment";
import { VehicleMediaRequestSchema } from "src/data/models/VehicleMediaRequest";
import { TelemetryService } from "src/features/heartbeat/heartbeat.service";
import { FuelBrandSchema } from "src/data/models/FuelBrand";
import { FuelTopUpSchema } from "src/data/models/FuelTopUp";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Vehicle", schema: VehicleSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "Association", schema: AssociationSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },
      { name: "DispatchRecord", schema: DispatchRecordSchema },
      { name: "Ticket", schema: TicketSchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
      { name: "AmbassadorCheckIn", schema: AmbassadorCheckInSchema },
      { name: "Route", schema: RouteSchema },
      { name: "City", schema: CitySchema },
      { name: "Country", schema: CountrySchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "RouteAssignment", schema: RouteAssignmentSchema },
      { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },

      { name: "SettingsModel", schema: SettingsModelSchema },

      { name: "Commuter", schema: CommuterSchema },
      { name: "CommuterResponse", schema: CommuterResponseSchema },
      { name: "RouteLandmark", schema: RouteLandmarkSchema },
      { name: "Trip", schema: TripSchema },
      {
        name: "CommuterProviderPayment",
        schema: CommuterProviderPaymentSchema,
      },
      { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
      { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },

      { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
      { name: "RankFeeProviderPayment", schema: RankFeeProviderPaymentSchema },
      { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },
      { name: "PaymentProvider", schema: PaymentProviderSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },
      {
        name: "VehicleHeartbeatTimeSeries",
        schema: VehicleHeartbeatTimeSeriesSchema,
      },

      { name: "FuelBrand", schema: FuelBrandSchema },

      { name: "FuelTopUp", schema: FuelTopUpSchema },
    ]),
  ],

  controllers: [InternalController],
  providers: [
    InternalService,
    UserService,
    FirebaseAdmin,
    CityService,
    KasieErrorHandler,
    TimeSeriesService,
    AssociationService,
    MessagingService,
    AmbassadorService,
    FileArchiverService,
    DispatchService,
    CommuterService,
    PaymentService,
    VehicleService,
    CloudStorageUploaderService,
    TelemetryService,
  ],
})
export class InternalModule {}
