/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Controller,
  Get,
  Query,
  Res,
  Logger,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { CalculatedDistanceList } from 'src/data/helpers/CalculatedDistanceList';
import { CalculatedDistance } from 'src/data/models/CalculatedDistance';
import { Route } from 'src/data/models/Route';
import { RouteCity } from 'src/data/models/RouteCity';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { RouteUpdateRequest } from 'src/data/models/RouteUpdateRequest';
import { MyUtils } from 'src/my-utils/my-utils';
import { RouteService } from 'src/services/RouteService';
import * as fs from 'fs';
import { RoutePointList } from 'src/data/models/RoutePointList';

const mm = ' 🚼 🚼 🚼 RouteController  🚼';

@Controller('api/v1')
export class RouteController {
  private readonly logger = new Logger(RouteController.name);

  constructor(private readonly routeService: RouteService) {}
  //addRouteUpdateRequest
  @Post('addRoute')
  async addRoute(@Body() route: Route): Promise<Route> {
    return await this.routeService.addRoute(route);
  }
  @Post('addRouteLandmark')
  async addRouteLandmark(
    @Body() routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark[]> {
    return await this.routeService.addRouteLandmark(routeLandmark);
  }
  @Post('addRouteUpdateRequest')
  async addRouteUpdateRequest(
    @Body() routeUpdateRequest: RouteUpdateRequest,
  ): Promise<RouteUpdateRequest> {
    return await this.routeService.addRouteUpdateRequest(routeUpdateRequest);
  }
  @Post('addRouteCity')
  async addRouteCity(@Body() routeCity: RouteCity): Promise<RouteCity> {
    return await this.routeService.addRouteCity(routeCity);
  }
  @Post('addRouteCities')
  async addRouteCities(@Body() routeCities: RouteCity[]): Promise<RouteCity[]> {
    return await this.routeService.addRouteCities(routeCities);
  }
  @Post('addCalculatedDistances')
  async addCalculatedDistances(
    @Body() distanceList: CalculatedDistanceList,
  ): Promise<CalculatedDistance[]> {
    return await this.routeService.addCalculatedDistances(
      distanceList.calculatedDistances,
    );
  }
  @Post('addRoutePoints')
  async addRoutePoints(@Body() routePoints: RoutePointList): Promise<number> {
    const res = await this.routeService.addRoutePoints(routePoints);
    Logger.log(`${mm} ... addRoutePoints result: ${res}`);
    return res;
  }
  @Get('deleteRoutePointsFromIndex')
  async deleteRoutePointsFromIndex(
    @Query() query: { routeId: string; index: number },
  ): Promise<RoutePoint[]> {
    const list = await this.routeService.deleteRoutePointsFromIndex(
      query.routeId,
      query.index,
    );
    return list;
  }
  @Get('updateRouteColor')
  async updateRouteColor(
    @Query() query: { routeId: string; color: string },
  ): Promise<Route> {
    const route = await this.routeService.updateRouteColor(
      query.routeId,
      query.color,
    );
    return route;
  }
  @Get('deleteRouteLandmark')
  async deleteRouteLandmark(
    @Query() query: { routeLandmarkId: string },
  ): Promise<RouteLandmark[]> {
    const result = await this.routeService.deleteRouteLandmark(
      query.routeLandmarkId,
    );
    return result;
  }
  @Get('removeAllDuplicateRoutePoints')
  async removeAllDuplicateRoutePoints(): Promise<any[]> {
    const result = await this.routeService.removeAllDuplicateRoutePoints();
    return result;
  }
  @Get('getAssociationRoutes')
  async getAssociationRoutes(
    @Query() query: { associationId: string },
  ): Promise<Route[]> {
    const list = await this.routeService.getAssociationRoutes(
      query.associationId,
    );
    this.logger.log(`${mm} associationroutes found: ${list.length}`);
    return list;
  }
  @Get('getAssociationRouteLandmarks')
  async getAssociationRouteLandmarks(
    @Query() query: { associationId: string },
  ): Promise<RouteLandmark[]> {
    const list = await this.routeService.getAssociationRouteLandmarks(
      query.associationId,
    );
    this.logger.log(`${mm} routeLandmarks found: ${list.length}`);
    return list;
  }
  @Get('getCalculatedDistances')
  async getCalculatedDistances(
    @Query() query: { routeId: string },
  ): Promise<CalculatedDistance[]> {
    const list = await this.routeService.getCalculatedDistances(query.routeId);
    return list;
  }
  @Get('getRoutePointsZipped')
  public async getRoutePointsZipped(
    @Query('routeId') routeId: string,
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.routeService.getRoutePointsZipped(routeId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error('Error getting route zipped file:', error);
      res.status(500).send('Error downloading file: ' + error.message);
    }
  }
  @Get('deleteRoutePoints')
  public async deleteRoutePoints(
    @Query() query: { routeId: string; latitude: number; longitude: number },
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.routeService.deleteRoutePoints(
        query.routeId,
        query.latitude,
        query.longitude,
      );
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error('Error getting routePoint zipped file:', error);
      res.status(500).send('Error downloading file: ' + error.message);
    }
  }
  @Get('refreshRoute')
  public async refreshRoute(
    @Query('routeId') routeId: string,
    @Res() res: Response,
  ) {
    try {
      const fileName = await this.routeService.refreshRoute(routeId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error('Error getting route zipped file:', error);
      res.status(500).send('Error downloading file: ' + error.message);
    }
  }
  @Get('getAssociationRouteZippedFile')
  public async getAssociationRouteZippedFile(
    @Query('associationId') associationId: string,
    @Res() res: Response,
  ) {
    try {
      const fileName =
        await this.routeService.getAssociationRouteZippedFile(associationId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error('Error getting route zipped file:', error);
      res.status(500).send('Error downloading file: ' + error.message);
    }
  }
  @Get('getRouteLandmarks')
  public async getRoutePointLandmarks(
    @Query('routeId') routeId: string,
  ): Promise<RouteLandmark[]> {
    try {
      const list = await this.routeService.getRouteLandmarks(routeId);
      return list;
    } catch (error) {
      this.logger.error('Error getting route landmarks:', error);
      throw error;
    }
  }
  @Get('getRoutePoints')
  public async getRoutePoints(
    @Query('routeId') routeId: string,
  ): Promise<RoutePoint[]> {
    try {
      const list = await this.routeService.getRoutePoints(routeId);
      return list;
    } catch (error) {
      this.logger.error('Error getting route points:', error);
      throw error;
    }
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log('Sending file: ' + fileName);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
    MyUtils.deleteOldFiles();
    res.sendFile(fileName);
  }
}
