import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from "@nestjs/common";
import { AssociationCarSummary, CarSummaryRecord, PubSubService } from "./pub-sub.service";

const mm = '👽👽👽👽 CarSummaryController: pubSub 👽👽👽';

@Controller("pubSub")
export class CarSummaryController {
  constructor(private readonly pubSubService: PubSubService) {}

  @Get("createAssociationData")
  public async createAssociationData(@Query("associationId") associationId: string) : Promise<any> {
    return this.pubSubService.createAssociationData(associationId);
  }

  @Get("createAssociationTelemetryData")
  public async createAssociationTelemetryData(
    @Query("associationId") associationId: string
  ) : Promise<any>{
    return this.pubSubService.createAssociationTelemetryData(associationId);
  }

  @Get("createCarSummary")
  public async createCarSummary(
    @Query("vehicleId") vehicleId: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ) : Promise<any> {
    const carSummaryRecord: CarSummaryRecord = await this.pubSubService.createCarSummary(
      vehicleId,
      startDate,
      endDate
    );

     Logger.debug(`${mm} createCarSummary: 🥬 🥬 🥬 🥬 🥬 trips: ${carSummaryRecord.trips} totalCash; ${carSummaryRecord.totalCash}; passengers; ${carSummaryRecord.passengers})`); 
   
    return carSummaryRecord;
  }

  @Get('fixFuel') 
  public async fixFuel() : Promise<any>{
    return await this.pubSubService.fixFuel();
  }

  @Get("createAssociationCarSummary")
  public async createAssociationCarSummary(
    @Query("associationId") associationId: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string
  ): Promise<AssociationCarSummary> {
    const associationCarSummary: AssociationCarSummary = 
      await this.pubSubService.createAssociationCarSummary(
      associationId,
      startDate,
      endDate
    );

    Logger.debug(`${mm} createAssociationCarSummary: 🥬 🥬 🥬 🥬 🥬 
      totalCash; ${associationCarSummary.totalCash}; totalCash: ${associationCarSummary.totalCash}`);
    return associationCarSummary;
  }
}
