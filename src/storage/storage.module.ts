import { Module } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { UserPhotoSchema } from 'src/data/models/UserPhoto';
import { UserSchema } from 'src/data/models/User';
import { KasieErrorHandler } from 'src/middleware/errors.interceptor';
import { MessagingService } from 'src/features/fcm/fcm.service';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { AssociationSchema } from 'src/data/models/Association';
import { FirebaseAdmin } from 'src/services/firebase_util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "Vehicle", schema: VehicleSchema },
      { name: "UserPhoto", schema: UserPhotoSchema },
      { name: "User", schema: UserSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "Association", schema: AssociationSchema },

      { name: "KasieError", schema: KasieErrorSchema },


    ])
  ],
  controllers: [StorageController],
  providers: [CloudStorageUploaderService, KasieErrorHandler, MessagingService, FirebaseAdmin],
})
export class StorageModule {}