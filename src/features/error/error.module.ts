import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { ErrorController } from './error.controller';
import { MessagingService } from '../fcm/fcm.service';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { FirebaseAdmin } from 'src/services/firebase_util';

@Module({
  imports: [
    MongooseModule.forFeature([
    
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },

    ]),
  ],  
  
  controllers: [ErrorController],
  providers: [ErrorService, MessagingService, FirebaseAdmin],
})
export class ErrorModule {}
