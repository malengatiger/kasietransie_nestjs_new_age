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

    ]),
  ],  controllers: [UserController],
  providers: [UserService, CloudStorageUploaderService, FirebaseAdmin],
})
export class UserModule {}
