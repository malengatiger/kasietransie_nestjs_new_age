import { Module } from '@nestjs/common';
import { FcmController } from './fcm.controller';
import { MessagingService } from './fcm.service';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { FirebaseAdmin } from 'src/services/firebase_util';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },

    ]),
  ],  
  
  controllers: [FcmController],
  providers: [MessagingService, FirebaseAdmin],
})
export class FcmModule {}
