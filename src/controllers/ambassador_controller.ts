import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { AmbassadorService } from 'src/services/AmbassadorService';

@Controller('api/v1')
export class AmbassadorController {
  constructor(private readonly ambassadorService: AmbassadorService) {}

  @Post('addAmbassadorPassengerCount')
  async addAmbassadorPassengerCount(
    @Body() count: AmbassadorPassengerCount,
  ): Promise<AmbassadorPassengerCount> {
    return await this.ambassadorService.addAmbassadorPassengerCount(count);
  }

  @Get('getUserAmbassadorPassengerCounts')
  async getUserAmbassadorPassengerCounts(
    @Query() query: { userId: string; startDate: string },
  ): Promise<AmbassadorPassengerCount[]> {
    Logger.log(`${query.userId} ${query.startDate}`);
    return await this.ambassadorService.getUserAmbassadorPassengerCounts(
      query.userId,
      query.startDate,
    );
  }
  @Get('getVehicleAmbassadorPassengerCounts')
  async getVehicleAmbassadorPassengerCounts(
    @Query() query: { vehicleId: string; startSate: string },
  ): Promise<AmbassadorPassengerCount[]> {
    return await this.ambassadorService.getVehicleAmbassadorPassengerCounts(
      query.vehicleId,
      query.startSate,
    );
  }
}
