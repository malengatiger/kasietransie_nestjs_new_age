import { Module } from '@nestjs/common';
import { FcmController } from './fcm.controller';
import { MessagingService } from './fcm.service';
import { DataModule } from 'src/data/data.module';
import { AssociationToken } from 'src/data/models/AssociationToken';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { AssociationSchema } from 'src/data/models/Association';
import { KasieErrorSchema } from 'src/data/models/kasie.error';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
 
    ]),
  ],  
  
  controllers: [FcmController],
  providers: [MessagingService],
})
export class FcmModule {}
