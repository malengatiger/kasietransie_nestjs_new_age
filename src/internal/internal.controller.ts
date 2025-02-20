import { Controller, Get, Logger, Query } from '@nestjs/common';
import { InternalService } from './internal.service';
import { Position } from 'src/data/models/position';

const mm = "🦠🦠🦠🦠 InternalController  🦠";

@Controller('internal')
export class InternalController {
  constructor(private readonly internalService: InternalService) {}

  @Get('cleanUp')
  async cleanUp(): Promise<any> {
    Logger.log(`\n\n${mm} ... starting cleanUp ....\n\n`);
    const fbUsers = await this.internalService.deleteAllFirebaseUsers();
    const dbUsers = await this.internalService.deleteAllMongoDBusers();
    const cars = await this.internalService.deleteAllVehicles();
    const telemetry = await this.internalService.deleteAllTelemetry();
    const dispatches = await this.internalService.deleteAllDispatches();
    const arrivals = await this.internalService.deleteAllVehicleArrivals();
    const tickets = await this.internalService.deleteAllTickets();
    const requests = await this.internalService.deleteAllCommuterRequests();

    const store = await this.internalService.deleteCloudStorage();
    //
    const admin = await this.internalService.addInternalAdminUser();
    const admin2 = await this.internalService.addInternalAppUser();

    const res = [];

    res.push(fbUsers);
    res.push(dbUsers);
    res.push(cars);
    res.push(telemetry);
    res.push(dispatches);
    res.push(arrivals);
    res.push(tickets);
    res.push(requests);

    res.push(store);
    res.push(admin);
    res.push(admin2);


    Logger.debug(`${mm} cleanUp completed: Firebase Users: ${JSON.stringify(fbUsers, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Users: ${JSON.stringify(dbUsers, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Vehicles: ${JSON.stringify(cars, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Arrivals: ${JSON.stringify(arrivals, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Dispatches: ${JSON.stringify(dispatches, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Tickets: ${JSON.stringify(tickets, null, 2)}`);
    
    Logger.debug(`${mm} cleanUp completed: Atlas Requests: ${JSON.stringify(requests, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas telemetry: ${JSON.stringify(telemetry, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Vehicles: ${JSON.stringify(cars, null, 2)}`);

    Logger.debug(`${mm} cleanUp completed: Sowertech Admin: ${JSON.stringify(admin, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Sowertech App Admin: ${JSON.stringify(admin2, null, 2)}`);

    Logger.debug(`${mm} cleanUp completed: Cloud Storage: ${store}`);

    Logger.log(`\n\n\n${mm} ... environment cleanUp completed ....\n\n`);

    return res;

  }

  @Get('startOfficialAppCarDemo')
  async startOfficialAppCarDemo(
    @Query('vehicleId') vehicleId: string, 
    @Query('routeId')  routeId: string, 
    @Query('userId') userId: string, 
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number
  ): Promise<any> {

    return await this.internalService
    .startOfficialAppCarDemo(vehicleId, routeId, userId, latitude, longitude);
  }

}
