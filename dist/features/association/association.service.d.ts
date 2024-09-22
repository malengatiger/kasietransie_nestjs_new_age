import { ConfigService } from "@nestjs/config";
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
import { NewMongoService } from "src/data/new_mongo_service";
import { AssociationToken } from "src/data/models/AssociationToken";
import { Commuter } from "src/data/models/Commuter";
import { MessagingService } from "../fcm/fcm.service";
import { CityService } from "../city/city.service";
import { UserService } from "../user/user.service";
export declare class AssociationService {
    private configService;
    private archiveService;
    private userService;
    private cityService;
    private messagingService;
    private mongoService;
    private userModel;
    private commuterModel;
    private appErrorModel;
    private associationModel;
    private exampleFileModel;
    private vehicleModel;
    private countryModel;
    private associationTokenModel;
    private settingsModel;
    constructor(configService: ConfigService, archiveService: FileArchiverService, userService: UserService, cityService: CityService, messagingService: MessagingService, mongoService: NewMongoService, userModel: mongoose.Model<User>, commuterModel: mongoose.Model<Commuter>, appErrorModel: mongoose.Model<AppError>, associationModel: mongoose.Model<Association>, exampleFileModel: mongoose.Model<ExampleFile>, vehicleModel: mongoose.Model<Vehicle>, countryModel: mongoose.Model<Country>, associationTokenModel: mongoose.Model<AssociationToken>, settingsModel: mongoose.Model<SettingsModel>);
    getAssociations(): Promise<any[]>;
    getAssociationUsers(associationId: string): Promise<any[]>;
    getAssociationVehicles(associationId: string): Promise<Vehicle[]>;
    getAssociationVehiclesZippedFile(associationId: string): Promise<string>;
    getOwnerVehiclesZippedFile(userId: string): Promise<string>;
    getCountryCitiesZippedFile(countryId: string): Promise<string>;
    getAssociationById(associationId: string): Promise<any>;
    getCountries(): Promise<Country[]>;
    T: any;
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
    addSettingsModel(model: SettingsModel): Promise<any>;
    addAssociationToken(associationId: string, userId: string, token: string): Promise<any>;
    getAssociationAppErrors(associationId: string, startDate: string, endDate: string): Promise<AppError[]>;
    getRandomCommuters(limit: number): Promise<any[]>;
    getAppErrors(startDate: string): Promise<any[]>;
    generateFakeAssociation(name: string): Promise<RegistrationBag>;
    getExampleFiles(): Promise<any[]>;
    upLoadExampleFiles(files: File[]): Promise<ExampleFile[]>;
    getFakeEmail(): string;
    randomIntFromInterval(min: number, max: number): number;
    getFakeCellphoneNumber(): string;
}
