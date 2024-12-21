import { Module } from "@nestjs/common";
import { AmbassadorService } from "./ambassador.service";
import { AmbassadorController } from "./ambassador.controller";
import { MessagingService } from "../fcm/fcm.service";
import { TimeSeriesService } from "../time_series/time_series.service";
//import { NewMongoService } from "src/data/new_mongo_service";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { MongooseModule } from "@nestjs/mongoose";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { FileArchiverService } from "src/my-utils/zipper";
import { VehicleHeartbeatTimeSeriesSchema } from "src/data/models/VehicleHeartbeatTimeSeries";
import { PassengerTimeSeriesSchema } from "src/data/models/PassengerTimeSeries";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { FirebaseAdmin } from "src/services/firebase_util";
import { AmbassadorCheckInSchema } from "src/data/models/AmbassadorCheckIn";
import { VehicleSchema } from "src/data/models/Vehicle";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";

@Module({
  imports: [
    
    MongooseModule.forFeature([
      {
        name: "VehicleHeartbeatTimeSeries",
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "AmbassadorCheckIn", schema: AmbassadorCheckInSchema },

      { name: "Vehicle", schema: VehicleSchema },

      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
    ]),
  ],
  controllers: [AmbassadorController],
  providers: [
    AmbassadorService,
    MessagingService,
    TimeSeriesService,
    KasieErrorHandler,
    FileArchiverService,
  ],
})
export class AmbassadorModule {}
