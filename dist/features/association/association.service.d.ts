import mongoose from "mongoose";
import { Association } from "src/data/models/Association";
import { SettingsModel } from "src/data/models/SettingsModel";
import { ExampleFile } from "src/data/models/ExampleFile";
import { RegistrationBag } from "src/data/models/RegistrationBag";
import { User } from "src/data/models/User";
import { AppError } from "src/data/models/AppError";
import { Vehicle } from "src/data/models/Vehicle";
import { FileArchiverService } from "src/my-utils/zipper";
import { Country } from "src/data/models/Country";
import { AssociationToken } from "src/data/models/AssociationToken";
import { MessagingService } from "../fcm/fcm.service";
import { CityService } from "../city/city.service";
import { UserService } from "../user/user.service";
import { Commuter } from "src/data/models/Commuter";
import { ErrorHandler } from "src/middleware/errors.interceptor";
export declare class AssociationService {
    private archiveService;
    private userService;
    private cityService;
    private messagingService;
    private readonly errorHandler;
    private associationModel;
    private vehicleModel;
    private settingsModel;
    private userModel;
    private countryModel;
    private associationTokenModel;
    private appErrorModel;
    private exampleFileModel;
    private commuterModel;
    constructor(archiveService: FileArchiverService, userService: UserService, cityService: CityService, messagingService: MessagingService, errorHandler: ErrorHandler, associationModel: mongoose.Model<Association>, vehicleModel: mongoose.Model<Vehicle>, settingsModel: mongoose.Model<SettingsModel>, userModel: mongoose.Model<User>, countryModel: mongoose.Model<Country>, associationTokenModel: mongoose.Model<AssociationToken>, appErrorModel: mongoose.Model<AppError>, exampleFileModel: mongoose.Model<ExampleFile>, commuterModel: mongoose.Model<Commuter>);
    getAssociationById(associationId: string): Promise<any>;
    getAssociations(): Promise<any[]>;
    getAssociationUsers(associationId: string): Promise<any[]>;
    getAssociationVehicles(associationId: string): Promise<Vehicle[]>;
    getAssociationVehiclesZippedFile(associationId: string): Promise<string>;
    getOwnerVehiclesZippedFile(userId: string): Promise<string>;
    getAssociationSettingsModels(associationId: string): Promise<any[]>;
    getAllSettingsModels(): Promise<any[]>;
    downloadExampleVehiclesFile(): Promise<File>;
    downloadExampleUserCSVFile(): Promise<string>;
    downloadExampleUserJSONFile(): Promise<string>;
    downloadExampleVehicleCSVFile(): Promise<string>;
    downloadExampleVehicleJSONFile(): Promise<string>;
    downloadFileFromStorage(fileName: string): Promise<string>;
    private generateUniqueId;
    registerAssociation(association: Association): Promise<RegistrationBag>;
    private handleError;
    addSettingsModel(model: SettingsModel): Promise<any>;
    addAssociationToken(associationId: string, userId: string, token: string): Promise<any>;
    getAssociationAppErrors(associationId: string, startDate: string, endDate: string): Promise<AppError[]>;
    getRandomCommuters(limit: number): Promise<any[]>;
    getAppErrors(startDate: string): Promise<any[]>;
    generateFakeAssociation(name: string): Promise<RegistrationBag>;
    getExampleFiles(): Promise<any[]>;
    upLoadExampleFiles(): Promise<ExampleFile[]>;
    getFakeEmail(): string;
    randomIntFromInterval(min: number, max: number): number;
    getFakeCellphoneNumber(): string;
}
