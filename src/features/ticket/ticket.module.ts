import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from 'src/data/models/Ticket';
import { CommuterTicketSchema } from 'src/data/models/CommuterTicket';
import { CommuterTicketPunchedSchema } from 'src/data/models/TicketPunched';
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { KasieErrorHandler } from 'src/middleware/errors.interceptor';
import { MessagingService } from '../fcm/fcm.service';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { KasieErrorSchema } from 'src/data/models/kasie.error';

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
  controllers: [TicketController],
  providers: [TicketService, CloudStorageUploaderService, KasieErrorHandler, MessagingService],
})
export class TicketModule {}
