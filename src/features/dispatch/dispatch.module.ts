import { Module } from "@nestjs/common";
import { DispatchService } from "./dispatch.service";
import { DispatchController } from "./dispatch.controller";
import { FileArchiverService } from "src/my-utils/zipper";
import { MessagingService } from "../fcm/fcm.service";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { MongooseModule } from "@nestjs/mongoose";
import { AppErrorSchema } from "src/data/models/AppError";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";
import { VehicleHeartbeatSchema } from "src/data/models/VehicleHeartbeat";
import { VehicleArrivalSchema } from "src/data/models/VehicleArrival";
import { VehicleDepartureSchema } from "src/data/models/VehicleDeparture";
import { CommuterSchema } from "src/data/models/Commuter";
import { CommuterRequestSchema } from "src/data/models/CommuterRequest";
import { CommuterResponseSchema } from "src/data/models/CommuterResponse";
import { UserGeofenceEventSchema } from "src/data/models/UserGeofenceEvent";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { FirebaseAdmin } from "src/services/firebase_util";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "Commuter", schema: CommuterSchema },
      { name: "CommuterResponse", schema: CommuterResponseSchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },

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
