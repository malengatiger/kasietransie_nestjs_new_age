import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataModule } from 'src/data/data.module';
import { User, UserSchema } from 'src/data/models/User';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGeofenceEventSchema } from 'src/data/models/UserGeofenceEvent';
import { AssociationSchema } from 'src/data/models/Association';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "Association", schema: AssociationSchema },
    ]),
  ],  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
