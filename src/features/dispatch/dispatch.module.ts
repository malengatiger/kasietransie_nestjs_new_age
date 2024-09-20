import { Module } from "@nestjs/common";
import { DispatchService } from "./dispatch.service";
import { DispatchController } from "./dispatch.controller";
import { FileArchiverService } from "src/my-utils/zipper";
import { DataModule } from "src/data/data.module";
import { MessagingService } from "../fcm/fcm.service";
import { AssociationToken } from "src/data/models/AssociationToken";
import { KasieError, KasieErrorSchema } from "src/data/models/kasie.error";
import { MongooseModule } from "@nestjs/mongoose";
import { AppErrorSchema } from "src/data/models/AppError";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: "TranslationBag", schema: TranslationBagSchema },
      // { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      // { name: "Commuter", schema: CommuterSchema },
      // { name: "CommuterResponse", schema: CommuterResponseSchema },
      // { name: "CommuterRequest", schema: CommuterRequestSchema },
      // { name: "VehicleHeartbeatTimeSeries", schema: VehicleHeartbeatTimeSeriesSchema },
      // { name: "PassengerTimeSeries", schema: PassengerTimeSeriesSchema },

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
      { name: "DispatchRecord", schema: DispatchRecordSchema },

      {
        name: "AmbassadorPassengerCount",
        schema: AmbassadorPassengerCountSchema,
      },
    ]),
  ],
  controllers: [DispatchController],
  providers: [DispatchService, MessagingService, FileArchiverService],
})
export class DispatchModule {}
