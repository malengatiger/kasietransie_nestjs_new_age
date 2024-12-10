import { Controller, Get, Logger } from '@nestjs/common';
import { InternalService } from './internal.service';

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
    const store = await this.internalService.deleteCloudStorage();
    //
    const admin = await this.internalService.addInternalAdminUser();
    
    const res = [];
    res.push(fbUsers);
    res.push(dbUsers);
    res.push(cars);
    res.push(store);
    res.push(admin);

    Logger.debug(`${mm} cleanUp completed: Firebase Users: ${JSON.stringify(fbUsers, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Users: ${JSON.stringify(dbUsers, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Atlas Vehicles: ${JSON.stringify(cars, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Sowertech Admin: ${JSON.stringify(admin, null, 2)}`);
    Logger.debug(`${mm} cleanUp completed: Cloud Storage: ${store}`);

    Logger.log(`\n\n\n${mm} ... environment cleanUp completed ....\n\n`);

    return res;

  }

}
