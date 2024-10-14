import { Injectable, Logger } from "@nestjs/common";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Ticket } from "src/data/models/Ticket";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommuterTicketPunched } from "src/data/models/TicketPunched";
import { CommuterTicket } from "src/data/models/CommuterTicket";
import { CloudStorageUploaderService } from "src/storage/storage.service";
const mm = "🌼🌼🌼 TicketService 🌼 ";
//
@Injectable()
export class TicketService {
  constructor(
    private storage: CloudStorageUploaderService,

    @InjectModel(Ticket.name)
    private ticketModel: mongoose.Model<Ticket>,
    @InjectModel(CommuterTicketPunched.name)
    private ticketPunchedModel: mongoose.Model<CommuterTicketPunched>,
    @InjectModel(CommuterTicket.name)
    private commuterTicket: mongoose.Model<CommuterTicket>
  ) {}

  async createTicket(ticket: Ticket): Promise<any> {
    const url = await this.storage.createQRCode({
      data: JSON.stringify(ticket),
      prefix: "ticket",
      size: 1,
      associationId: ticket.associationId,
    });
    ticket.qrCodeUrl = url;
    var res = await this.ticketModel.create(ticket);
    Logger.debug(`${mm} ticket created: ${JSON.stringify(ticket, null, 2)}`);
    return res;
  }

  async createCommuterTicket(commuterTicket: CommuterTicket): Promise<any> {
    const url = await this.storage.createQRCode({
      data: JSON.stringify(commuterTicket),
      prefix: "commuterTicket",
      size: 1,
      associationId: commuterTicket.associationId,
    });
    commuterTicket.qrCodeUrl = url;
    var res = await this.commuterTicket.create(commuterTicket);
    Logger.debug(
      `${mm} ticketPunched created: ${JSON.stringify(commuterTicket, null, 2)}`
    );
    return res;
  }

  async createCommuterTicketPunched(
    commuterTicketPunched: CommuterTicketPunched
  ): Promise<any> {
    var res = await this.ticketPunchedModel.create(commuterTicketPunched);
    Logger.debug(
      `${mm} commuterTicketPunched created: ${JSON.stringify(commuterTicketPunched, null, 2)}`
    );
    return res;
  }

  async findAssociationTickets(associationId: string): Promise<Ticket[]> {
    var res = await this.ticketModel.find({
      associationId: associationId,
    });
    Logger.debug(`${mm} association tickets found: ${res.length}`);
    return res;
  }

  async findCommuterTickets(commuterId: string): Promise<CommuterTicket[]> {
    var res = await this.commuterTicket.find({
      commuterId: commuterId,
    });
    Logger.debug(`${mm} commuter tickets found: ${res.length}`);
    return res;
  }
}
