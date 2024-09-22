/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Association } from "src/data/models/Association";
import { SettingsModel } from "src/data/models/SettingsModel";
import { ExampleFile } from "src/data/models/ExampleFile";
import { RegistrationBag } from "src/data/models/RegistrationBag";
import { AppErrors } from "src/data/helpers/AppErrors";
import { User } from "src/data/models/User";
import { AppError } from "src/data/models/AppError";
import * as fs from "fs";
import * as path from "path";
import admin from "firebase-admin";
import { Vehicle } from "src/data/models/Vehicle";
import { FileArchiverService } from "src/my-utils/zipper";
import { Country } from "src/data/models/Country";
import { NewMongoService } from "src/data/new_mongo_service";
import { AssociationToken } from "src/data/models/AssociationToken";
import { Commuter } from "src/data/models/Commuter";
import { MessagingService } from "../fcm/fcm.service";
import { CityService } from "../city/city.service";
import { UserService } from "../user/user.service";

const mm = "🍎🍎🍎 AssociationService: 🍎🍎🍎";

@Injectable()
export class AssociationService {
  constructor(
    private configService: ConfigService,
    private archiveService: FileArchiverService,
    private userService: UserService,
    private cityService: CityService,
    private messagingService: MessagingService,
    private mongoService: NewMongoService,
    //
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,
    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,
    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,
    @InjectModel(ExampleFile.name)
    private exampleFileModel: mongoose.Model<ExampleFile>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,
    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,
    @InjectModel(AssociationToken.name)
    private associationTokenModel: mongoose.Model<AssociationToken>,
    @InjectModel(SettingsModel.name)
    private settingsModel: mongoose.Model<SettingsModel>
  ) {}

  //----------------------------------------------------------------
  public async getAssociations(): Promise<any[]> {
    Logger.log(`${mm} ... getAssociations starting ...`);
    const list = await this.mongoService.find("Association", {});
    Logger.log(`${mm} ... getAssociations found: ${list.length} ...`);
    return list;
  }

  public async getAssociationUsers(associationId: string): Promise<any[]> {
    Logger.log(
      `${mm} ... getAssociationUsers starting, id: ${associationId} ...`
    );
    const list = await this.mongoService.find("User", {
      associationId: associationId,
    });
    Logger.log(`${mm} ... getAssociationUsers found: ${list.length} ...`);
    return list;
  }

  public async getAssociationVehicles(
    associationId: string
  ): Promise<Vehicle[]> {
    Logger.log(
      `${mm} ... getAssociationVehicles starting, id: ${associationId} ...`
    );
    const list = await this.mongoService.find("Vehicle", {
      associationId: associationId,
    });
    Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
    return list;
  }

  public async getAssociationVehiclesZippedFile(
    associationId: string
  ): Promise<string> {
    Logger.log(
      `${mm} ... getAssociationVehicles starting, id: ${associationId} ...`
    );
    const list = await this.getAssociationVehicles(associationId);
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
    return file;
  }

  public async getOwnerVehiclesZippedFile(userId: string): Promise<string> {
    const list = await this.vehicleModel.find({ ownerId: userId });
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(
      `${mm} ... getOwnerVehiclesZippedFile found: ${list.length} ...`
    );
    return file;
  }

  public async getCountryCitiesZippedFile(countryId: string): Promise<string> {
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile starting, id: ${countryId} ...`
    );
    const list = await this.cityService.getCountryCities(countryId);
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ content: json }]);
    Logger.log(
      `${mm} ... getCountryCitiesZippedFile found: ${list.length} ...`
    );
    return file;
  }

  public async getAssociationById(associationId: string): Promise<any> {
    const m = await this.mongoService.find("Association", {
      associationId: associationId,
    });
  }

  public async getCountries(): Promise<Country[]> {
    return await this.mongoService.find("Country", {});
  }

  T;

  public async getAssociationSettingsModels(
    associationId: string
  ): Promise<any[]> {
    const list = await this.mongoService.find("SettingsModel", {
      associationId: associationId,
    });
    Logger.log(
      `${mm} ... getAssociationSettingsModels found: ${list.length} ...`
    );
    return list;
  }

  public async getAllSettingsModels(): Promise<any[]> {
    const list = await this.settingsModel.find({});
    Logger.log(`${mm} ... getAllSettingsModels found: ${list.length} ...`);
    return list;
  }

  public async downloadExampleVehiclesFile(): Promise<File> {
    return null;
  }

  public async downloadExampleUserCSVFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleUserCSVFile ...................`);
    const fileName = `users.csv`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleUserJSONFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleUserJSONFile ...................`);
    const fileName = `users.json`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleVehicleCSVFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleVehicleCSVFile ...................`);
    const fileName = `vehicles.csv`;
    return this.downloadFileFromStorage(fileName);
  }

  public async downloadExampleVehicleJSONFile(): Promise<string> {
    Logger.log(`${mm} .... downloadExampleVehicleJSONFile ...................`);
    const fileName = `vehicles.json`;
    return this.downloadFileFromStorage(fileName);
  }

  async downloadFileFromStorage(fileName: string): Promise<string> {
    const tempDir = path.join(__dirname, "..", "tempFiles");
    const tempFilePath = path.join(tempDir, fileName);
    const storage = admin.storage();
    const folder = process.env.BUCKET_FOLDER;

    try {
      // Create the temporary directory if it doesn't exist
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      const csFile = storage.bucket().file(`${folder}/${fileName}`);
      Logger.log(
        `${mm} Downloading file, csFile: ${csFile.cloudStorageURI} tempFilePath: ${tempFilePath} .....`
      );

      const contents = await csFile.download();
      const fileContent = contents[0];
      Logger.log(
        `${mm} ${fileContent}  🔵🔵🔵 fileContent.byteLength: ${fileContent.byteLength}`
      );
      //Create a writable stream to write the file content
      const writeStream = fs.createWriteStream(tempFilePath);
      writeStream.write(fileContent);
      writeStream.end();

      Logger.log(`${mm} x marks the spot, tempFilePath: ${tempFilePath}`);
      return tempFilePath;
    } catch (error) {
      Logger.log(`${mm} Error downloading file: ${error}`);
      throw new Error("Failed to download file");
    }
  }

  //
  private generateUniqueId(): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 6);
    return `${timestamp}_${randomString}`;
  }

  public async registerAssociation(
    association: Association
  ): Promise<RegistrationBag> {
    Logger.log(`${mm} registerAssociation ...`);

    const u = new User();
    u.firstName = association.adminUserFirstName;
    u.lastName = association.adminUserLastName;
    u.email = association.adminEmail;
    u.cellphone = association.adminCellphone;
    u.countryId = association.countryId;
    u.countryName = association.countryName;
    u.dateRegistered = new Date().toISOString();

    const user = await this.userService.createUser(u);
    association.userId = user.userId;

    const ass = new Association();
    ass.userId = user.userId;
    ass.associationName = association.associationName;
    ass.associationId = this.generateUniqueId();
    ass.adminUserFirstName = association.adminUserFirstName;
    ass.adminUserLastName = association.adminUserLastName;
    ass.adminEmail = association.adminEmail;
    ass.adminCellphone = association.adminCellphone;
    ass.countryId = association.countryId;
    ass.countryName = association.countryName;
    ass.dateRegistered = new Date().toISOString();
    ass.userId = user.userId;

    const settings = new SettingsModel();
    settings.created = new Date().toISOString();
    settings.associationId = ass.associationId;
    settings.commuterGeoQueryRadius = 50;
    settings.commuterGeofenceRadius = 200;
    settings.commuterSearchMinutes = 30;
    settings.distanceFilter = 25;
    settings.geofenceRadius = 200;
    settings.heartbeatIntervalSeconds = 600;
    settings.locale = "en";
    settings.loiteringDelay = 60;
    settings.refreshRateInSeconds = 600;
    settings.themeIndex = 0;
    settings.vehicleGeoQueryRadius = 100;
    settings.vehicleSearchMinutes = 30;

    const files = await this.getExampleFiles();
    
    const bag = new RegistrationBag();
    bag.association = ass;
    bag.settings = settings;
    bag.user = user;
    bag.exampleFiles = files;

    if (ass.countryId) {
      const c = await this.mongoService.find("Country", {
        countryId: ass.countryId,
      });
      if (c.length > 0) {
        bag.country = c[0];
      }
    }
    Logger.log(`${mm} send association and settings to Atlas ...`);

    await this.mongoService.create("SettingsModel", settings);
    await this.mongoService.create("AssociationModel", ass);    
    
    Logger.log(`${mm} 🥬 association and settings added to Atlas ...`);

    await this.messagingService.sendAssociationRegisteredMessage(ass);

    Logger.log(`${mm} 🥬 association registered: 🥬 🥬 🥬 ${JSON.stringify(bag, null, 2)} 🥬 `);
    return bag;
  }

  public async addSettingsModel(model: SettingsModel): Promise<any> {
    Logger.log(`adding addSettingsModel${model}`);
    return await this.mongoService.create("SettingsModel", model);
  }

  public async addAssociationToken(
    associationId: string,
    userId: string,
    token: string
  ): Promise<any> {
    const at: AssociationToken = new AssociationToken();
    at.associationId = associationId;
    at.userId = userId;
    at.token = token;
    await this.mongoService.delete("AssociationToken", {
      associationId: associationId,
    });
    return await this.mongoService.create("AssociationToken", at);
  }

  public async getAssociationAppErrors(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AppError[]> {
    return this.mongoService.find("AppError", {
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
  }
  public async getRandomCommuters(limit: number): Promise<any[]> {
    return this.mongoService.find("Commuter", {}, limit);
  }

  public async getAppErrors(startDate: string): Promise<any[]> {
    return this.mongoService.find("AppError", {
      created: { $gte: startDate },
    });
  }

  public async generateFakeAssociation(
    name: string
  ): Promise<RegistrationBag> {
    Logger.log(`${mm} generateFakeAssociation ...`);

    const ass = new Association();
    ass.associationName = name;
    ass.associationId = this.generateUniqueId();
    ass.adminEmail = this.getFakeEmail();
    ass.adminCellphone = this.getFakeCellphoneNumber();
    ass.adminUserFirstName = "James Earl";
    ass.adminUserLastName =  `Jones_${Math.random() * 1000}`;
    ass.dateRegistered = new Date().toISOString();
    ass.countryId = '7a2328bf-915f-4194-82ae-6c220c046cac';
    ass.countryName = 'South Africa';

    const bag = await this.registerAssociation(ass);
    return bag;
  }

  public async getExampleFiles(): Promise<any[]> {
    return this.mongoService.find("ExampleFile", {});
  }

  public async upLoadExampleFiles(files: File[]): Promise<ExampleFile[]> {
    return [];
  }
  getFakeEmail() {
    const name = "fake admin";
    const mName = name.replace(" ", "").toLowerCase();
    return `${mName}_${new Date().getTime()}@kasietransie.com`;
  }
  randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getFakeCellphoneNumber() {
    const arr = [];
    arr.push("+2765");
    for (let i = 0; i < 7; i++) {
      const x = this.randomIntFromInterval(0,9);
      arr.push(x);
    }
    return arr.join("");
  }
   
}
