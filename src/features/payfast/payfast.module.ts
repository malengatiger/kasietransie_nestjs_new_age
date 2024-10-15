import { Module } from '@nestjs/common';
import { PayfastService } from './payfast.service';
import { PayfastController } from './payfast.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { CommuterTicketSchema } from 'src/data/models/CommuterTicket';
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { TicketSchema } from 'src/data/models/Ticket';
import { CommuterTicketPunchedSchema } from 'src/data/models/TicketPunched';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { KasieErrorHandler } from 'src/middleware/errors.interceptor';
import { MessagingService } from '../fcm/fcm.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Ticket", schema: TicketSchema },
      { name: "CommuterTicket", schema: CommuterTicketSchema },
      { name: "CommuterTicketPunched", schema: CommuterTicketPunchedSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "Vehicle", schema: VehicleSchema },
      { name: "KasieError", schema: KasieErrorSchema },

      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },

    ]),
  ],
  controllers: [PayfastController],
  providers: [PayfastService, KasieErrorHandler, MessagingService],
})
export class PayfastModule {}
