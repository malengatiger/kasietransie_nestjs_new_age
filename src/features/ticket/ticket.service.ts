import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Ticket } from "src/data/models/Ticket";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CommuterTicketPunched } from "src/data/models/TicketPunched";
import { CommuterTicket } from "src/data/models/CommuterTicket";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { randomUUID } from "crypto";
const mm = "🌼🌼🌼 TicketService 🌼 ";
//
@Injectable()
export class TicketService {
  constructor(
    private storage: CloudStorageUploaderService,
    private errorHandler: KasieErrorHandler,
    @InjectModel(Ticket.name)
    private ticketModel: mongoose.Model<Ticket>,
    @InjectModel(CommuterTicketPunched.name)
    private ticketPunchedModel: mongoose.Model<CommuterTicketPunched>,
    @InjectModel(CommuterTicket.name)
    private commuterTicket: mongoose.Model<CommuterTicket>
  ) {}

  async createTicket(ticket: Ticket): Promise<Ticket> {
    ticket.created = new Date().toISOString();

    Logger.debug(
      `${mm} create ticket template: ${JSON.stringify(ticket, null, 2)}`
    );
    try {
      if (ticket.ticketRoutes.length == 0 && !ticket.validOnAllRoutes) {
        throw new Error('Ticket has no routes and is not valid on all routes');
      }
      const mDate= new Date(ticket.created);
      ticket.mDate = mDate;
      var res = await this.ticketModel.create(ticket);
      Logger.log(
        `${mm} ticket template added to Atlas: 🍎 ${JSON.stringify(res, null, 2)} 🍎`
      );
      return res;
    } catch (e) {
      Logger.debug(`${mm} create ticket failed: ${e}`);
      this.errorHandler.handleError(
        `create ticket template failed: ${e}`,
        ticket.associationId, ticket.associationName
      );
      throw new HttpException(
        `error creating ticket template: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createCommuterTicket(commuterTicket: CommuterTicket): Promise<any> {
    Logger.debug(
      `${mm} create commuter ticket: ${JSON.stringify(commuterTicket, null, 2)}`
    );
    commuterTicket.commuterTicketId = randomUUID().toString();
    commuterTicket.created = new Date().toISOString();
    try {
      // const url = await this.storage.createQRCode({

      //   data: JSON.stringify(commuterTicket),
      //   prefix: "commuterTicket",
      //   size: 1,
      //   associationId: commuterTicket.associationId,
      // });
      // commuterTicket.qrCodeUrl = url;
      const mDate= new Date(commuterTicket.created);
      commuterTicket.mDate = mDate;
      var res = await this.commuterTicket.create(commuterTicket);
      Logger.debug(
        `${mm} ticketPunched added to Atlas: ${JSON.stringify(commuterTicket, null, 2)}`
      );
      return res;
    } catch (e) {
      Logger.debug(`${mm} create ticket failed: ${e}`);
      this.errorHandler.handleError(
        `create ticket template failed: ${e}`,
        commuterTicket.associationId,
        commuterTicket.associationName
      );
      throw new HttpException(
        `error creating commuterTicket: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async createCommuterTicketPunched(
    commuterTicketPunched: CommuterTicketPunched
  ): Promise<any> {
    Logger.debug(
      `${mm} create commuter ticket punched: ${JSON.stringify(commuterTicketPunched, null, 2)}`
    );
    commuterTicketPunched.created = new Date().toISOString();
    try {
      const mDate= new Date(commuterTicketPunched.created);
      commuterTicketPunched.mDate = mDate;
      var res = await this.ticketPunchedModel.create(commuterTicketPunched);
      Logger.debug(
        `${mm} commuterTicketPunched added to Atlas: ${JSON.stringify(commuterTicketPunched, null, 2)}`
      );
      return res;
    } catch (e) {
      Logger.debug(`${mm} create ticket failed: ${e}`);
      this.errorHandler.handleError(
        `create ticket template failed: ${e}`,
        commuterTicketPunched.associationId,
        commuterTicketPunched.associationName
      );
      throw new HttpException(
        `error creating commuterTicket: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getAssociationTickets(associationId: string): Promise<Ticket[]> {
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
