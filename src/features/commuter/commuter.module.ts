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
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { ExampleFileSchema } from "src/data/models/ExampleFile";
import { VehicleSchema } from "src/data/models/Vehicle";
import { UserSchema } from "src/data/models/User";
import { UserPhotoSchema } from "src/data/models/UserPhoto";
import { VehiclePhotoSchema } from "src/data/models/VehiclePhoto";
import { VehicleVideoSchema } from "src/data/models/VehicleVideo";
import { AssociationSchema } from "src/data/models/Association";
import { CommuterPickupSchema } from "src/data/models/CommuterPickup";

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
      { name: "Vehicle", schema: VehicleSchema },
      { name: "User", schema: UserSchema },
      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },

      { name: "Association", schema: AssociationSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },

      { name: "AssociationToken", schema: AssociationTokenSchema },

      {name: "CommuterPickup", schema: CommuterPickupSchema}
    ]),
  ],
  controllers: [CommuterController],
  providers: [CommuterService, 
    KasieErrorHandler,
    MessagingService, CloudStorageUploaderService, FirebaseAdmin],
})
export class CommuterModule {}
