import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { AssociationService } from './association.service';
import { Association } from 'src/data/models/Association';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { Vehicle } from 'src/data/models/Vehicle';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { AppError } from 'src/data/models/AppError';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { KasieQRCode } from 'src/data/helpers/kasie_qr_code';
import { User } from 'src/data/models/User';
import { VehicleService } from '../vehicle/vehicle.service';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService,
    private readonly storage: CloudStorageUploaderService,
    private readonly vehicleService: VehicleService
  ) {}

  @Get('getAssociationData')
  async getAssociationData(
    @Query('associationId') associationId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string
  ): Promise<any> {

    const res1 = await this.associationService.getAssociationCommuterRequests(associationId, startDate, endDate);
    const res2 = await this.associationService.getAssociationDispatchRecords(associationId, startDate, endDate);
    const res3 = await this.associationService.getAssociationCommuterCashPayments(associationId, startDate, endDate);
    const res4 = await this.associationService.getAssociationCommuterCashCheckIns(associationId, startDate, endDate);

    const res5 = await this.associationService.getAssociationRankFeeCashPayments(associationId, startDate, endDate);
    const res6 = await this.associationService.getAssociationRankFeeCashCheckIns(associationId, startDate, endDate);

    const res7 = await this.associationService.getAssociationPassengerCounts(associationId, startDate, endDate);
    const res8 = await this.associationService.getAssociationUsers(associationId);
    const res9 = await this.associationService.getAssociationVehicles(associationId);
    const res10 = await this.associationService.getAssociationRoutes(associationId);

    const res11 = await this.associationService.getAssociationVehicleArrivals(associationId, startDate, endDate);
    const res12 = await this.associationService.getAssociationVehicleTelemetry(associationId, startDate, endDate);
    const res13 = await this.associationService.getAssociationTrips(associationId, startDate, endDate);


    const ass = await this.associationService.getAssociationById(associationId);
    const tops = await this.vehicleService.getAssociationFuelTopUps(associationId, startDate, endDate);

    const bag = {
      'associationId': associationId,
      'associationName': ass.associationName,
      'commuterRequests': res1,
      'dispatchRecords': res2,
      'commuterCashPayments': res3,
      'commuterCashCheckIns': res4,
      'rankFeeCashPayments': res5,
      'rankFeeCashCheckIns': res6,
      'passengerCounts': res7,
      'vehicleArrivals': res11,
      'vehicleTelemetry': res12,
      'trips': res13,
      'users': res8,
      'vehicles': res9,
      'routes': res10,
      'fuelTopUps': tops,
      
    }

    Logger.debug(`getAssociationData complete, 🍎 commuterRequests: ${bag.commuterRequests.length}`);
    Logger.debug(`getAssociationData complete, 🍎 dispatchRecords: ${bag.dispatchRecords.length}`);
    Logger.debug(`getAssociationData complete, 🍎 commuterCashPayments: ${bag.commuterCashPayments.length}`);
    Logger.debug(`getAssociationData complete, 🍎 commuterCashCheckIns: ${bag.commuterCashCheckIns.length}`);
    Logger.debug(`getAssociationData complete, 🍎 rankFeeCashPayments: ${bag.rankFeeCashPayments.length}`);
    Logger.debug(`getAssociationData complete, 🍎 rankFeeCashCheckIns: ${bag.rankFeeCashCheckIns.length}`);
    Logger.debug(`getAssociationData complete, 🍎 passengerCounts: ${bag.passengerCounts.length}`);
    Logger.debug(`getAssociationData complete, 🍎 vehicleArrivals: ${bag.vehicleArrivals.length}`);
    Logger.debug(`getAssociationData complete, 🍎 vehicleTelemetry: ${bag.vehicleTelemetry.length}`);

    Logger.debug(`getAssociationData complete, 🍎 users: ${bag.users.length}`);
    Logger.debug(`getAssociationData complete, 🍎 vehicles: ${bag.vehicles.length}`);
    Logger.debug(`getAssociationData complete, 🍎 routes: ${bag.routes.length}`);

    return bag;
  }
  @Post('registerAssociation')
  async registerAssociation(
    @Body() association: Association,
  ): Promise<RegistrationBag> {
    return this.associationService.registerAssociation(association);
  }
  @Post('addSettingsModel')
  async addSettingsModel(@Body()model: SettingsModel): Promise<any> {
    return this.associationService.addSettingsModel(model);
  }

  @Get('addAssociationToken')
  async addAssociationToken(
    @Query('associationId') associationId: string,
    @Query('userId') userId: string,
    @Query('token') token: string,
  ): Promise<any> {
    return this.associationService.addAssociationToken(
      associationId,
      userId,
      token,
    );
  }
  @Get('getAssociationTokens')
  async getAssociationTokens(
    @Query('associationId') associationId: string,
   
  ): Promise<any> {
    return this.associationService.getAssociationTokens(
      associationId,
    );
  }

  @Get('resetAssociationData')
  async resetAssociationData(
    @Query() associationId: string,
   
  ): Promise<any> {
    return this.associationService.resetAssociationData(
      associationId,
    );
  }


  @Get('downloadExampleUserCSVFile')
  async downloadExampleUserCSVFile(): Promise<string> {
    return this.associationService.downloadExampleUserCSVFile();
  }

  @Get('getAssociations')
  async getAssociations(): Promise<any[]> {
    return await this.associationService.getAssociations();
  }
  @Get('getAssociationById')
  async getAssociationById(@Query('associationId') associationId: string): Promise<any> {
    return await this.associationService.getAssociationById(associationId);
  }
  @Get('getAssociationUsers')
  public async getAssociationUsers(
    @Query('associationId') associationId: string,
  ): Promise<User[]> {
    return await this.associationService.getAssociationUsers(associationId);
  }

  @Get('getAssociationVehicles')
  public async getAssociationVehicles(
    @Query('associationId') associationId: string,
  ): Promise<Vehicle[]> {
    return await this.associationService.getAssociationVehicles(associationId);
  }

  @Get('getAssociationSettingsModels')
  async getAssociationSettingsModels(
    @Query('associationId') associationId: string,
  ): Promise<any[]> {
        Logger.debug(`AssociationController: getAssociationSettingsModels AssociationId: ${JSON.stringify(associationId)}`);
    
    return await this.associationService.getAssociationSettingsModels(
      associationId,
    );
  }

  @Get('downloadExampleVehicleCSVFile')
  async downloadExampleVehicleCSVFile(): Promise<string> {
    return this.associationService.downloadExampleVehicleCSVFile();
  }

  @Get('getAssociationAppErrors')
  async getAssociationAppErrors(
    associationId: string,
    startDate: string,
    endDate: string,
  ): Promise<AppError[]> {
    return this.associationService.getAssociationAppErrors(
      associationId,
      startDate,
      endDate,
    );
  }
  
  async getExampleFiles(): Promise<any[]> {
    return this.associationService.getExampleFiles();
  }
  @Post('createQRCode')
  async createQRCode(
    @Body() data: KasieQRCode
  ): Promise<string> {
    return this.storage.createQRCode(data);
  }
  @Post('sendToDevice')
  async sendToDevice(
    @Query('fcmToken') fcmToken: string,
    @Body() count: AmbassadorPassengerCount
  ): Promise<any> {
    return this.associationService.sendToDevice(fcmToken, count);
  }
}
