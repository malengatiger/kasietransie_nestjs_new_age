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
} from "@nestjs/common";
import { Response } from "express";
import { CalculatedDistanceList } from "src/data/helpers/CalculatedDistanceList";
import { CalculatedDistance } from "src/data/models/CalculatedDistance";
import { Route } from "src/data/models/Route";
import { RouteCity } from "src/data/models/RouteCity";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { RoutePoint } from "src/data/models/RoutePoint";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import { RoutePointList } from "src/data/models/RoutePointList";
import { RouteService, RoutesToCopy } from "src/features/route/route.service";
import { AssociationRouteData, RouteData } from "src/data/models/RouteData";

const mm = " 🚼 🚼 🚼 RouteController  🚼";

@Controller("routes")
export class RouteController {
  private readonly logger = new Logger(RouteController.name);

  constructor(private readonly routeService: RouteService) {}

  @Post("addRoute")
  async addRoute(@Body() route: Route): Promise<Route> {
    return await this.routeService.addRoute(route);
  }
  @Post("addRouteLandmark")
  async addRouteLandmark(
    @Body() routeLandmark: RouteLandmark
  ): Promise<RouteLandmark[]> {
    return await this.routeService.addRouteLandmark(routeLandmark);
  }
  @Post("addRouteUpdateRequest")
  async addRouteUpdateRequest(
    @Body() routeUpdateRequest: RouteUpdateRequest
  ): Promise<RouteUpdateRequest> {
    return await this.routeService.addRouteUpdateRequest(routeUpdateRequest);
  }
  @Post("addRouteCity")
  async addRouteCity(@Body() routeCity: RouteCity): Promise<RouteCity> {
    return await this.routeService.addRouteCity(routeCity);
  }
  @Post("addRouteCities")
  async addRouteCities(@Body() routeCities: RouteCity[]): Promise<RouteCity[]> {
    return await this.routeService.addRouteCities(routeCities);
  }
  @Post("addCalculatedDistances")
  async addCalculatedDistances(
    @Body() distanceList: CalculatedDistanceList
  ): Promise<CalculatedDistance[]> {
    return await this.routeService.addCalculatedDistances(
      distanceList.calculatedDistances
    );
  }
  @Post("addRoutePoints")
  async addRoutePoints(@Body() routePoints: RoutePointList): Promise<number> {
    const res = await this.routeService.addRoutePoints(routePoints);
    Logger.log(`${mm} ... addRoutePoints result: ${res}`);
    return res;
  }
  @Post("deleteRoutePointList")
  async deleteRoutePointList(
    @Body() routePointList: RoutePointList
  ): Promise<RoutePoint[]> {
    Logger.log(
      `${mm} ... deleteRoutePointList routePoints coming in: ${JSON.stringify(routePointList)}`
    );

    const res = await this.routeService.deleteRoutePointList(routePointList);
    Logger.log(
      `${mm} ... deleteRoutePointList result: ${res.length} route points remaining`
    );
    return res;
  }
  @Get("deleteRoutePointsFromIndex")
  async deleteRoutePointsFromIndex(
    @Query() query: { routeId: string; index: number }
  ): Promise<RoutePoint[]> {
    const list = await this.routeService.deleteRoutePointsFromIndex(
      query.routeId,
      query.index
    );
    return list;
  }
  @Get("copyRoutes")
  async copyRoutes(
    @Query() query: { assocIdFrom: string; assocIdTo: string }
  ): Promise<string> {
    const result = await this.routeService.copyRoutes(
      query.assocIdFrom,
      query.assocIdTo
    );
    return result;
  }
  @Get("copySelectedRoute")
  async copySelectedRoute(
    @Query('associationId') associationId: string, @Query('routeId') routeId: string
  ): Promise<any> {
    const result = await this.routeService.copySelectedRoute(associationId, routeId);
    Logger.log(`${result}`)
    return result;
  }
  @Get("deleteCopiedRoutes")
  async deleteCopiedRoutes(
    @Query() query: { associationId: string }
  ): Promise<string> {
    const result = await this.routeService.deleteAssociationArtifacts(
      query.associationId,
      ""
    );
    return result;
  }
  @Get("deleteRoutePoint")
  async deleteRoutePoint(
    @Query("routePointId") routePointId: string
  ): Promise<any> {
    const list = await this.routeService.deleteRoutePoint(routePointId);
    return list;
  }
  @Get("updateRouteColor")
  async updateRouteColor(
    @Query() query: { routeId: string; color: string }
  ): Promise<Route> {
    const route = await this.routeService.updateRouteColor(
      query.routeId,
      query.color
    );
    return route;
  }

  @Get("findRouteLandmarksByLocation")
  public async findRouteLandmarksByLocation(
    @Query() query: { latitude: number; longitude: number; radiusInKM: number }
  ): Promise<RouteLandmark[]> {
    Logger.debug(
      `${mm} findRouteLandmarksByLocation: latitude: ${query.latitude} longitude: ${query.longitude} max: ${query.radiusInKM} limit: 5`
    );

    return await this.routeService.findRouteLandmarksByLocation(
      query.latitude,
      query.longitude,
      query.radiusInKM
    );
  }
  @Get("getRouteById")
  public async getRouteById(
    @Query() query: { routeId: string }
  ): Promise<Route> {
    return await this.routeService.getRoute(query.routeId);
  }

  @Get("findRoutesByLocation")
  public async findRoutesByLocation(
    @Query() query: { latitude: number; longitude: number; radiusInKM: number }
  ): Promise<Route[]> {
    Logger.debug(
      `${mm} findRoutesByLocation: latitude: ${query.latitude} longitude: ${query.longitude} max: ${query.radiusInKM} limit: 5`
    );

    return await this.routeService.findRoutesByLocation(
      query.latitude,
      query.longitude,
      query.radiusInKM
    );
  }
  @Get("findRoutePointsByLocation")
  public async findRoutePointsByLocation(
    @Query() query: { latitude: number; longitude: number; radiusInKM: number }
  ): Promise<RoutePoint[]> {
    Logger.debug(
      `${mm} findRoutePointsByLocation: latitude: ${query.latitude} longitude: ${query.longitude} max: ${query.radiusInKM} limit: 5`
    );

    return await this.routeService.findRoutePointsByLocation(
      query.latitude,
      query.longitude,
      query.radiusInKM
    );
  }

  @Get("deleteRouteLandmark")
  async deleteRouteLandmark(
    @Query() query: { routeLandmarkId: string }
  ): Promise<RouteLandmark[]> {
    const result = await this.routeService.deleteRouteLandmark(
      query.routeLandmarkId
    );
    return result;
  }
  @Get("removeAllDuplicateRoutePoints")
  async removeAllDuplicateRoutePoints(): Promise<any[]> {
    const result = await this.routeService.removeAllDuplicateRoutePoints();
    return result;
  }
  @Get("getAssociationRoutes")
  async getAssociationRoutes(
    @Query() query: { associationId: string }
  ): Promise<Route[]> {
    const list = await this.routeService.getAssociationRoutes(
      query.associationId
    );
    this.logger.log(`${mm} association routes found: ${list.length}`);
    return list;
  }
  @Get("getAssociationRouteData")
  async getAssociationRouteData(
    @Query() query: { associationId: string }
  ): Promise<AssociationRouteData> {
    const data = await this.routeService.getAssociationRouteData(
      query.associationId
    );

    this.logger.debug(
      `${mm} association route data found, returning RouteData ...`
    );
    return data;
  }
  @Get("getSingleRouteData")
  async getSingleRouteData(
    @Query() query: { routeId: string }
  ): Promise<AssociationRouteData> {
    const data = await this.routeService.getSingleRouteData(query.routeId);

    this.logger.debug(`${mm} route data found, returning RouteData ...`);
    return data;
  }
  @Get("getAssociationRouteLandmarks")
  async getAssociationRouteLandmarks(
    @Query() query: { associationId: string }
  ): Promise<RouteLandmark[]> {
    const list = await this.routeService.getAssociationRouteLandmarks(
      query.associationId
    );
    this.logger.log(`${mm} routeLandmarks found: ${list.length}`);
    return list;
  }
  @Get("getCalculatedDistances")
  async getCalculatedDistances(
    @Query() query: { routeId: string }
  ): Promise<CalculatedDistance[]> {
    const list = await this.routeService.getCalculatedDistances(query.routeId);
    return list;
  }
  @Get("getRoutePointsZipped")
  public async getRoutePointsZipped(
    @Query("routeId") routeId: string,
    @Res() res: Response
  ) {
    try {
      const fileName = await this.routeService.getRoutePointsZipped(routeId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error("Error getting route zipped file:", error);
      res.status(500).send("Error downloading file: " + error.message);
    }
  }
  @Get("deleteRoutePoints")
  public async deleteRoutePoints(
    @Query() query: { routeId: string },
    @Res() res: Response
  ) {
    try {
      const fileName = await this.routeService.deleteRoutePoints(query.routeId);
      res.status(200).send(fileName);
    } catch (error) {
      this.logger.error("Error getting routePoint zipped file:", error);
      res.status(500).send("Error deleting RoutePoints: " + error.message);
    }
  }
  @Get("refreshRoute")
  public async refreshRoute(
    @Query("routeId") routeId: string,
    @Res() res: Response
  ) {
    try {
      const fileName = await this.routeService.refreshRoute(routeId);
      this.sendFile(fileName, res);
    } catch (error) {
      this.logger.error("Error getting route zipped file:", error);
      res.status(500).send("Error downloading file: " + error.message);
    }
  }
  @Get("getAssociationRouteZippedFile")
  public async getAssociationRouteZippedFile(
    @Query("associationId") associationId: string,
    @Res() res: Response
  ) {
    try {
      const filePath =
        await this.routeService.getAssociationRouteZippedFile(associationId);
      this.sendFile(filePath, res);
    } catch (error) {
      this.logger.error("Error getting route zipped file:", error);
      res.status(500).send("Error downloading file: " + error.message);
    }
  }
  @Get("getRouteLandmarks")
  public async getRouteLandmarks(
    @Query("routeId") routeId: string
  ): Promise<RouteLandmark[]> {
    try {
      const list = await this.routeService.getRouteLandmarks(routeId);
      return list;
    } catch (error) {
      this.logger.error("Error getting route landmarks:", error);
      throw error;
    }
  }

  @Get("getRoutePoints")
  public async getRoutePoints(
    @Query("routeId") routeId: string
  ): Promise<RoutePoint[]> {
    try {
      const list = await this.routeService.getRoutePoints(routeId);
      return list;
    } catch (error) {
      this.logger.error("Error getting route points:", error);
      throw error;
    }
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.debug(
      `\n\n${mm} .... 💦💦💦💦💦 sending file ....\n💦💦 path:` + fileName
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=route.zip`);
    //MyUtils.deleteOldFiles();
    res.sendFile(fileName);
  }

  @Get("deleteExcept")
  async deleteExcept(@Query() query: { associationId: string }): Promise<any> {
    const data = await this.routeService.deleteExcept(query.associationId);
    return data;
  }
  @Get("deleteAssociationRoutePoints")
  async deleteAssociationRoutePoints(
    @Query() query: { associationId: string }
  ): Promise<any> {
    const data = await this.routeService.deleteAssociationRoutePoints(
      query.associationId
    );
    return data;
  }

  @Get("deleteRoutePointsWithNoAssociation")
  async deleteRoutePointsWithNoAssociation(): Promise<any> {
    const data = await this.routeService.deleteRoutePointsWithNoAssociation();
    return data;
  }
}

