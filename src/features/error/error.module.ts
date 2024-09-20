import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { ErrorController } from './error.controller';
import { MessagingService } from '../fcm/fcm.service';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';

@Module({
  imports: [
    MongooseModule.forFeature([
    
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
    
    ]),
  ],  
  
  controllers: [ErrorController],
  providers: [ErrorService, MessagingService],
})
export class ErrorModule {}
