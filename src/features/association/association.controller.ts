import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssociationService } from './association.service';
import { Association } from 'src/data/models/Association';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { Vehicle } from 'src/data/models/Vehicle';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { AppError } from 'src/data/models/AppError';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { KasieQRCode } from 'src/data/helpers/kasie_qr_code';

@Controller('association')
export class AssociationController {
  constructor(private readonly associationService: AssociationService,
    private readonly storage: CloudStorageUploaderService
  ) {}

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
    @Query() associationId: string,
    @Query() userId: string,
    @Query() token: string,
  ): Promise<any> {
    return this.associationService.addAssociationToken(
      associationId,
      userId,
      token,
    );
  }

  @Get('downloadExampleUserCSVFile')
  async downloadExampleUserCSVFile(): Promise<string> {
    return this.associationService.downloadExampleUserCSVFile();
  }

  @Get('getAssociations')
  async getAssociations(): Promise<any[]> {
    return this.associationService.getAssociations();
  }
  
  @Get('getAssociationVehicles')
  public async getAssociationVehicles(
    @Query() associationId: string,
  ): Promise<Vehicle[]> {
    return await this.associationService.getAssociationVehicles(associationId);
  }

  @Get('getAssociationSettingsModels')
  async getAssociationSettingsModels(
    @Query() associationId: string,
  ): Promise<any[]> {
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
  
  @Get('generateFakeAssociation')
  async generateFakeAssociation(
    @Query('name') name: string,
  ): Promise<RegistrationBag> {
    return await this.associationService.generateFakeAssociation(name);
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
}
