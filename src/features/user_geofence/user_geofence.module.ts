import { Module } from "@nestjs/common";
import { UserGeofenceService } from "./user_geofence.service";
import { UserGeofenceController } from "./user_geofence.controller";
import { DataModule } from "src/data/data.module";
import { MessagingService } from "../fcm/fcm.service";
import {
  UserGeofenceEvent,
  UserGeofenceEventSchema,
} from "src/data/models/UserGeofenceEvent";
import { MongooseModule } from "@nestjs/mongoose";
import { TranslationBagSchema } from "src/data/models/TranslationBag";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "TranslationBag", schema: TranslationBagSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
    
    ]),
  ],
  controllers: [UserGeofenceController],
  providers: [UserGeofenceService, MessagingService],
})
export class UserGeofenceModule {}
