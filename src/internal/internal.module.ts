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
    ]),
  ],

  controllers: [InternalController],
  providers: [
    InternalService,
    UserService,
    FirebaseAdmin,
    KasieErrorHandler,
    MessagingService,
    CloudStorageUploaderService,
  ],
})
export class InternalModule {}
