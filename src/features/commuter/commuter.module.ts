import { Module } from "@nestjs/common";
import { CommuterService } from "./commuter.service";
import { CommuterController } from "./commuter.controller";
import { MessagingService } from "../fcm/fcm.service";
import { CommuterSchema } from "src/data/models/Commuter";
import { MongooseModule } from "@nestjs/mongoose";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { CommuterResponseSchema } from "src/data/models/CommuterResponse";
import { CommuterRequestSchema } from "src/data/models/CommuterRequest";
import { RouteLandmarkSchema } from "src/data/models/RouteLandmark";
import { RouteSchema } from "src/data/models/Route";
import { RoutePointSchema } from "src/data/models/RoutePoint";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { FirebaseAdmin } from "src/services/firebase_util";

@Module({
  imports: [
    

    MongooseModule.forFeature([
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "Commuter", schema: CommuterSchema },
      { name: "CommuterResponse", schema: CommuterResponseSchema },
      { name: "CommuterRequest", schema: CommuterRequestSchema },
      { name: "RouteLandmark", schema: RouteLandmarkSchema },
      { name: "Route", schema: RouteSchema },
      { name: "RoutePoint", schema: RoutePointSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },

    ]),
  ],
  controllers: [CommuterController],
  providers: [CommuterService, MessagingService],
})
export class CommuterModule {}
