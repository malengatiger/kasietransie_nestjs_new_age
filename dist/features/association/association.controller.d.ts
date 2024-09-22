import { AssociationService } from './association.service';
import { Association } from 'src/data/models/Association';
import { RegistrationBag } from 'src/data/models/RegistrationBag';
import { Vehicle } from 'src/data/models/Vehicle';
import { SettingsModel } from 'src/data/models/SettingsModel';
import { AppError } from 'src/data/models/AppError';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { KasieQRCode } from 'src/data/helpers/kasie_qr_code';
export declare class AssociationController {
    private readonly associationService;
    private readonly storage;
    constructor(associationService: AssociationService, storage: CloudStorageUploaderService);
    registerAssociation(association: Association): Promise<RegistrationBag>;
    addSettingsModel(model: SettingsModel): Promise<any>;
    addAssociationToken(associationId: string, userId: string, token: string): Promise<any>;
    downloadExampleUserCSVFile(): Promise<string>;
    getAssociations(): Promise<any[]>;
    getAssociationVehicles(associationId: string): Promise<Vehicle[]>;
    getAssociationSettingsModels(associationId: string): Promise<any[]>;
    downloadExampleVehicleCSVFile(): Promise<string>;
    getAssociationAppErrors(associationId: string, startDate: string, endDate: string): Promise<AppError[]>;
    generateFakeAssociation(name: string): Promise<RegistrationBag>;
    getExampleFiles(): Promise<any[]>;
    createQRCode(data: KasieQRCode): Promise<string>;
}
