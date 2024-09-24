/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { Response } from 'express';
import { MyUtils } from 'src/my-utils/my-utils';
import { ErrorService } from 'src/features/error/error.service';
import { KasieError } from 'src/data/models/kasie.error';
import { AppError } from 'src/data/models/AppError';

const mm: string = ' 🚼 🚼 🚼 ErrorController  🚼';

@Controller('error')
export class ErrorController {
  private readonly logger = new Logger(ErrorController.name);

  constructor(private readonly errorService: ErrorService) {}

  @Get('getAppErrors')
  async getAppErrors(
    @Query('startDate') startDate: string,
  ): Promise<AppError[]> {
    return await this.errorService.getAppErrors(startDate);
  }
  //
  @Get('getKasieErrors')
  async getKasieErrors(
    @Query('startDate') startDate: string,
  ): Promise<KasieError[]> {
    return await this.errorService.getKasieErrors(startDate);
  }
}
