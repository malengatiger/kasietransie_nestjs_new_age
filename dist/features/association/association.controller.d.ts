import { AssociationService } from './association.service';
import { Association } from 'src/data/models/Association';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { Vehicle } from 'src/data/models/Vehicle';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { AppError } from 'src/data/models/AppError';
export declare class AssociationController {
    private readonly associationService;
    constructor(associationService: AssociationService);
    registerAssociation(association: Association): Promise<RegistrationBag>;
    addSettingsModel(model: SettingsModel): Promise<any>;
    addAssociationToken(associationId: string, userId: string, token: string): Promise<any>;
    downloadExampleUserCSVFile(): Promise<string>;
    getAssociations(): Promise<any[]>;
    getAssociationVehicles(associationId: string): Promise<Vehicle[]>;
    getAssociationSettingsModels(associationId: string): Promise<any[]>;
    downloadExampleVehicleCSVFile(): Promise<string>;
    getAssociationAppErrors(associationId: string, startDate: string, endDate: string): Promise<AppError[]>;
    getExampleFiles(): Promise<any[]>;
}
