import { Module } from '@nestjs/common';
import { LocationRequestService } from './location_request.service';
import { LocationRequestController } from './location_request.controller';
import { MessagingService } from '../fcm/fcm.service';
import { LocationRequestSchema } from 'src/data/models/LocationRequest';
import { MongooseModule } from '@nestjs/mongoose';
import { AmbassadorPassengerCountSchema } from 'src/data/models/AmbassadorPassengerCount';
import { AppErrorSchema } from 'src/data/models/AppError';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { LocationResponseSchema } from 'src/data/models/LocationResponse';
import { FirebaseAdmin } from 'src/services/firebase_util';
import { LocationResponseErrorSchema } from 'src/data/models/LocationResponseError';

@Module({
  imports: [
    

    MongooseModule.forFeature([
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "LocationRequest", schema: LocationRequestSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },
      { name: "LocationResponseError", schema: LocationResponseErrorSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },

      { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],
  controllers: [LocationRequestController],
  providers: [LocationRequestService, MessagingService, FirebaseAdmin],
})
export class LocationRequestModule {}
