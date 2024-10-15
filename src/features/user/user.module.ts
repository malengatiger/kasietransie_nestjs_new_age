import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from 'src/data/models/User';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGeofenceEventSchema } from 'src/data/models/UserGeofenceEvent';
import { AssociationSchema } from 'src/data/models/Association';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { FirebaseAdmin } from 'src/services/firebase_util';
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { KasieErrorHandler } from 'src/middleware/errors.interceptor';
import { MessagingService } from '../fcm/fcm.service';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { UserPhotoSchema } from 'src/data/models/UserPhoto';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "Association", schema: AssociationSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "Vehicle", schema: VehicleSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "UserPhoto", schema: UserPhotoSchema },

      { name: "KasieError", schema: KasieErrorSchema },

    ]),
  ],  controllers: [UserController],
  providers: [UserService, CloudStorageUploaderService, FirebaseAdmin, KasieErrorHandler, MessagingService],
})
export class UserModule {}
