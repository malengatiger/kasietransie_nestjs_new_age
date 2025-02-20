import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommuterService } from './commuter.service';
import { Commuter } from 'src/data/models/Commuter';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { start } from 'repl';

@Controller('commuter')
export class CommuterController {
  constructor(private readonly commuterService: CommuterService) {}

  @Post('addCommuter')
  public async addCommuter(
    @Body() commuter: Commuter
  ) : Promise<any> {

    return await this.commuterService.addCommuter(commuter);
  }

  @Post('updateCommuter')
  public async updateCommuter(
    @Body() commuter: Commuter
  ) : Promise<any> {

    return await this.commuterService.updateCommuter(commuter);
  }

  @Post('addCommuterRequest')
  public async addCommuterRequest(
    @Body() commuterRequest: CommuterRequest
  ) : Promise<CommuterRequest> {

    return await this.commuterService.addCommuterRequest(commuterRequest);
  }
  @Post('cancelCommuterRequest')
  public async cancelCommuterRequest(
    @Body() commuterRequest: CommuterRequest
  ) : Promise<any> {

    return null;
  }
  @Get('getRouteCommuterRequests')
  public async getRouteCommuterRequests(
    @Query('routeId') routeId: string,
    @Query('startDate') startDate: string): Promise<CommuterRequest[]>{

    return await this.commuterService.getRouteCommuterRequests(
      routeId, startDate
    );
  }
  @Get('getCommuterRequests')
  public async getCommuterRequests(
    @Query('commuterId') commuterId: string,
    @Query('startDate') startDate: string): Promise<CommuterRequest[]>{

    return await this.commuterService.getCommuterRequests(
      commuterId, startDate
    );
  }
  @Get('getAssociationCommuterRequests')
  public async getAssociationCommuterRequests(
    @Query('associationId') associationId: string,
    @Query('startDate') startDate: string): Promise<CommuterRequest[]>{

    return await this.commuterService.getAssociationCommuterRequests(
      associationId, startDate
    );
  }
}
