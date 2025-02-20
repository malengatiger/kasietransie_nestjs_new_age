import { Module } from "@nestjs/common";
import { AssociationService } from "./association.service";
import { AssociationController } from "./association.controller";
import { FileArchiverService } from "src/my-utils/zipper";
import { UserService } from "../user/user.service";
import { CityService } from "../city/city.service";
import { MessagingService } from "../fcm/fcm.service";
//import { NewMongoService } from "src/data/new_mongo_service";
import { MongooseModule } from "@nestjs/mongoose";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { AppErrorSchema } from "src/data/models/AppError";
import { AssociationSchema } from "src/data/models/Association";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { CitySchema } from "src/data/models/City";
import { CommuterSchema } from "src/data/models/Commuter";
import { CountrySchema } from "src/data/models/Country";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";
import { ExampleFileSchema } from "src/data/models/ExampleFile";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { RouteSchema } from "src/data/models/Route";
import { RouteAssignmentSchema } from "src/data/models/RouteAssignment";
import { SettingsModelSchema } from "src/data/models/SettingsModel";
import { UserSchema } from "src/data/models/User";
import { UserGeofenceEventSchema } from "src/data/models/UserGeofenceEvent";
import { VehicleSchema } from "src/data/models/Vehicle";
import { VehicleArrivalSchema } from "src/data/models/VehicleArrival";
import { VehicleDepartureSchema } from "src/data/models/VehicleDeparture";
import { VehicleHeartbeatSchema } from "src/data/models/VehicleHeartbeat";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { FirebaseAdmin } from "src/services/firebase_util";
import { VehiclePhotoSchema } from "src/data/models/VehiclePhoto";
import { VehicleVideoSchema } from "src/data/models/VehicleVideo";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { UserPhotoSchema } from "src/data/models/UserPhoto";
import { CommuterCashPaymentSchema } from "src/data/models/CommuterCashPayment";
import { CommuterCashCheckInSchema } from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashPaymentSchema } from "src/data/models/RankFeeCashPayment";
import { RankFeeCashCheckInSchema } from "src/data/models/RankFeeCashCheckIn";
import { TripSchema } from "src/data/models/Trip";
import { VehicleTelemetrySchema } from "src/data/models/VehicleTelemetry";
import { CommuterRequestSchema } from "src/data/models/CommuterRequest";
import { VehicleService } from "../vehicle/vehicle.service";
import { DispatchService } from "../dispatch/dispatch.service";
import { FuelTopUpSchema } from "src/data/models/FuelTopUp";
import { VehicleMediaRequestSchema } from "src/data/models/VehicleMediaRequest";
import { FuelBrandSchema } from "src/data/models/FuelBrand";

@Module({
  imports: [
    
    MongooseModule.forFeature([
      { name: "Vehicle", schema: VehicleSchema },
      { name: "DispatchRecord", schema: DispatchRecordSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
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
      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
      { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },
      { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
      { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },
      
      { name: "Trip", schema: TripSchema },
      { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },

      { name: "FuelTopUp", schema: FuelTopUpSchema },
      { name: "FuelBrand", schema: FuelBrandSchema },

      { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },

      { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],
  controllers: [AssociationController],
  providers: [
    AssociationService,
    FileArchiverService,
    UserService,
    CityService,
    MessagingService,
    KasieErrorHandler, VehicleService,
    //
    DispatchService,
    CloudStorageUploaderService, FirebaseAdmin,
  ],
})
export class AssociationModule {}
