import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from 'src/data/models/Ticket';
import { CommuterTicketPunched } from 'src/data/models/TicketPunched';
import { CommuterTicket } from 'src/data/models/CommuterTicket';
import crypto from 'crypto';
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('addTicket')
  async addTicket(@Body() ticket: Ticket): Promise<Ticket> {    
    return this.ticketService.createTicket(ticket);
  }
  @Post('addCommuterTicketPunched')
  async addCommuterTicketPunched(@Body() ticketPunched: CommuterTicketPunched): Promise<any> {
    return this.ticketService.createCommuterTicketPunched(ticketPunched);
  }
  @Post('addCommuterTicket')
  async addCommuterTicket(@Body() ticket: CommuterTicket): Promise<any> {
    return this.ticketService.createCommuterTicket(ticket);
  }

  @Get('getAssociationTickets')
  async getAssociationTickets(@Query('associationId') associationId: string): Promise<Ticket[]> {
    return this.ticketService.getAssociationTickets(associationId);
  }
  @Get('getCommuterTickets')
  async getCommuterTickets(@Query('commuterId') commuterId: string): Promise<any[]> {
    return this.ticketService.findCommuterTickets(commuterId);
  }

}
