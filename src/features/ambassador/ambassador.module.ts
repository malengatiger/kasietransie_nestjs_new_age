import { Module } from "@nestjs/common";
import { AmbassadorService } from "./ambassador.service";
import { AmbassadorController } from "./ambassador.controller";
import { MessagingService } from "../fcm/fcm.service";
import { TimeSeriesService } from "../time_series/time_series.service";
import { NewMongoService } from "src/data/new_mongo_service";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { MongooseModule } from "@nestjs/mongoose";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { FileArchiverService } from "src/my-utils/zipper";
import { VehicleHeartbeatTimeSeriesSchema } from "src/data/models/VehicleHeartbeatTimeSeries";
import { PassengerTimeSeriesSchema } from "src/data/models/PassengerTimeSeries";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";

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
    NewMongoService,
    FileArchiverService,
  ],
})
export class AmbassadorModule {}
