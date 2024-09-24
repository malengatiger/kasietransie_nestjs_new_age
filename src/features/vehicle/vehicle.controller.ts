
/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Vehicle } from 'src/data/models/Vehicle';
import { FileInterceptor } from '@nestjs/platform-express';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { MediaService } from 'src/services/MediaService';
import { VehiclePhoto } from 'src/data/models/VehiclePhoto';
import { MyUtils } from 'src/my-utils/my-utils';

import { DispatchService } from 'src/features/dispatch/dispatch.service';
import { LocationRequestService } from 'src/features/location_request/location_request.service';
import { RouteService } from 'src/features/route/route.service';
import { TimeSeriesService } from 'src/features/time_series/time_series.service';
import { AddCarsResponse, VehicleService } from 'src/features/vehicle/vehicle.service';
import { KasieError } from 'src/data/models/kasie.error';

import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { VehicleBag } from 'src/data/helpers/VehicleBag';

const mm = ' 🚼 🚼 🚼 RouteController  🚼';

@Controller('vehicle')
export class VehicleController {
  private readonly logger = new Logger(VehicleController.name);

  constructor(
    private readonly carService: VehicleService,
    private readonly dispatchService: DispatchService,
    private readonly mediaService: MediaService,
    private readonly locationRequestService: LocationRequestService,
    private readonly routeService: RouteService,
    private readonly timeSeriesService: TimeSeriesService,
  ) {}

  @Post('addVehicle')
  async addVehicle(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return await this.carService.addVehicle(vehicle);
  }
  @Post('addLocationRequest')
  async addLocationRequest(
    @Body() request: LocationRequest,
  ): Promise<LocationRequest> {
    return await this.locationRequestService.addLocationRequest(request);
  }
  @Post('addLocationResponse')
  async addLocationResponse(
    @Body() request: LocationResponse,
  ): Promise<LocationResponse> {
    return await this.locationRequestService.addLocationResponse(request);
  }
  @Post('addVehicleMediaRequest')
  async addVehicleMediaRequest(
    @Body() request: VehicleMediaRequest,
  ): Promise<VehicleMediaRequest> {
    return await this.routeService.addVehicleMediaRequest(request);
  }
  @Post('addVehiclePhoto')
  async addVehiclePhoto(
    @Body() vehiclePhoto: VehiclePhoto,
  ): Promise<VehiclePhoto> {
    return await this.mediaService.addVehiclePhoto(vehiclePhoto);
  }
  @Post('addVehicleArrival')
  async addVehicleArrival(
    @Body() vehicle: VehicleArrival,
  ): Promise<VehicleArrival> {
    return await this.dispatchService.addVehicleArrival(vehicle);
  }
  @Post('importVehiclesFromCSV')
  @UseInterceptors(FileInterceptor('file'))
  async importVehiclesFromCSV(
    @UploadedFile() file: Express.Multer.File,
    @Query('associationId') associationId: string,
  ): Promise<AddCarsResponse> {
    const res = await this.carService.importVehiclesFromCSV(
      file,
      associationId,
    );

    return res;
  }

  @Post('addRouteAssignments')
  async addRouteAssignments(
    @Body('assignments') assignments: RouteAssignmentList,
  ): Promise<RouteAssignment[]> {
    return await this.carService.addRouteAssignments(assignments);
  }
  @Get('getPassengerTimeSeries')
  public async getPassengerTimeSeries(
    @Query()
    query: {
      associationId: string;
      routeId: string;
      vehicleId: string;
      startDate: string;
    },
    // @Res() res: Response,
  ): Promise<any[]> {
    return await this.timeSeriesService.getPassengerTimeSeries(
      query.associationId,
      query.routeId,
      query.startDate,
    );
  }
  @Get('getAssociationHeartbeatTimeSeries')
  public async getAssociationHeartbeatTimeSeries(
    @Query() query: { associationId: string; startDate: string },
    @Res() res: Response,
  ) {
    try {
      const fileName =
        await this.timeSeriesService.aggregateAssociationHeartbeatData(
          query.associationId,
          query.startDate,
        );
      this.sendFile(fileName, res);
    } catch (error) {
      Logger.error(
        `${mm} 👿👿👿👿 Error getAssociationHeartbeatTimeSeries:`,
        error,
      );
      res.status(500).send(`${mm} 👿👿👿 Error downloading file: ${error}`);
    }
  }
  @Get('getOwnerVehicles')
  async getOwnerVehicles(@Query('userId') userId: string): Promise<Vehicle[]> {
    if (userId) {
      throw new KasieError('getOwnerVehicles: UserId is missing!', HttpStatus.BAD_REQUEST);
    }
    return await this.carService.getOwnerVehicles(userId, 0);
  }
  @Get('getVehicleRouteAssignments')
  async getVehicleRouteAssignments(
    @Query('vehicleId') vehicleId: string,
  ): Promise<RouteAssignment[]> {
    return await this.carService.getVehicleRouteAssignments(vehicleId);
  }
  @Get('getVehicleBag')
  async getVehicleBag(
    @Query() query: { vehicleId: string; startDate: string },
  ): Promise<VehicleBag> {
    return await this.carService.getVehicleBag(
      query.vehicleId,
      query.startDate,
    );
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log('Sending file: ' + fileName);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
    MyUtils.deleteOldFiles();
    res.sendFile(fileName);
  }
}

