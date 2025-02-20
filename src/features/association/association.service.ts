/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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
import { AssociationToken } from "src/data/models/AssociationToken";
import { MessagingService } from "../fcm/fcm.service";
import { CityService } from "../city/city.service";
import { UserService } from "../user/user.service";
import { v4 as uuidv4 } from "uuid";
import { Commuter } from "src/data/models/Commuter";
import { Constants } from "src/my-utils/constants";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import { randomUUID } from "crypto";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { Trip } from "src/data/models/Trip";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { Route } from "src/data/models/Route";

const mm = "🍎🍎🍎 AssociationService: 🍎🍎🍎";

@Injectable()
export class AssociationService {
  constructor(
    private archiveService: FileArchiverService,
    private userService: UserService,
    private cityService: CityService,
    private messagingService: MessagingService,
    private readonly errorHandler: KasieErrorHandler,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,
    @InjectModel(SettingsModel.name)
    private settingsModel: mongoose.Model<SettingsModel>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(Country.name)
    private countryModel: mongoose.Model<Country>,

    @InjectModel(AssociationToken.name)
    private associationTokenModel: mongoose.Model<AssociationToken>,

    @InjectModel(AppError.name)
    private appErrorModel: mongoose.Model<AppError>,

    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,

    @InjectModel(ExampleFile.name)
    private exampleFileModel: mongoose.Model<ExampleFile>,

    @InjectModel(Commuter.name)
    private commuterModel: mongoose.Model<Commuter>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>,

    @InjectModel(CommuterCashPayment.name)
    private commuterCashPaymentModel: mongoose.Model<CommuterCashPayment>,

    @InjectModel(CommuterCashCheckIn.name)
    private commuterCashCheckInModel: mongoose.Model<CommuterCashCheckIn>,

    @InjectModel(RankFeeCashCheckIn.name)
    private rankFeeCashCheckInModel: mongoose.Model<RankFeeCashCheckIn>,

    @InjectModel(RankFeeCashPayment.name)
    private rankFeeCashPaymentModel: mongoose.Model<RankFeeCashPayment>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(VehicleTelemetry.name)
    private vehicleTelemetryModel: mongoose.Model<VehicleTelemetry>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>
  ) {}

  public async getAssociationVehicleDepartures(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleDeparture[]> {
    return [];
  }
  public async getAssociationDispatchRecords(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<DispatchRecord[]> {
    const res = await this.dispatchRecordModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });

    return res;
  }

  public async getAssociationVehicleArrivals(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleArrival[]> {
    const res = await this.vehicleArrivalModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }

  public async getAssociationVehicleTelemetry(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<VehicleTelemetry[]> {
    const res = await this.vehicleTelemetryModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }

  public async getAssociationCommuterRequests(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<CommuterRequest[]> {
    const res = await this.commuterRequestModel.find({
      associationId: associationId,
      dateRequested: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationCommuterCashPayments(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<CommuterCashPayment[]> {
    const res = await this.commuterCashPaymentModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationCommuterCashCheckIns(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<CommuterCashCheckIn[]> {
    const res = await this.commuterCashCheckInModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationRankFeeCashPayments(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<RankFeeCashPayment[]> {
    const res = await this.rankFeeCashPaymentModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationRankFeeCashCheckIns(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<RankFeeCashCheckIn[]> {
    const res = await this.rankFeeCashCheckInModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationTrips(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<Trip[]> {
    const res = await this.tripModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationPassengerCounts(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AmbassadorPassengerCount[]> {
    const res = await this.ambassadorPassengerCountModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
    return res;
  }
  public async getAssociationRoutes(associationId: string): Promise<Route[]> {
    const res = await this.routeModel.find({
      associationId: associationId,
    });
    return res;
  }
  async getAssociationById(associationId: string): Promise<any> {
    Logger.log(
      `${mm} ... getAssociationById starting, id: ${associationId} ...`
    );
    const list = await this.associationModel
      .find({
        associationId: associationId,
      })
      .limit(1);
    Logger.log(`${mm} ... getAssociationById found: ${list.length} ...`);
    if (list.length > 0) {
      return list[0];
    }

    throw new Error(`Association not found; associationId: ${associationId}`);
  }

  async resetAssociationData(associationId: string): Promise<any> {
    const res1 = await this.userModel.deleteMany({});
    const res2 = await this.vehicleModel.deleteMany({});

    Logger.log(`${mm} delete users: ${JSON.stringify(res1)}`);
    Logger.log(`${mm} delete vehicles: ${JSON.stringify(res2)}`);
    return {
      users: res1,
      vehicles: res2,
    };
  }
  //----------------------------------------------------------------
  public async getAssociations(): Promise<any[]> {
    Logger.log(`${mm} ... getAssociations starting ...`);
    const list = await this.associationModel.find({});
    Logger.log(`${mm} ... getAssociations found: ${list.length} ...`);
    return list;
  }

  public async getAssociationUsers(associationId: string): Promise<any[]> {
    Logger.log(
      `${mm} ... getAssociationUsers starting, id: ${associationId} ...`
    );
    const list = await this.userModel.find({
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
    const list = await this.vehicleModel.find({
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

    const file = await this.archiveService.zip([{ contentString: json }]);
    Logger.log(`${mm} ... getAssociationVehicles found: ${list.length} ...`);
    return file;
  }

  public async getOwnerVehiclesZippedFile(userId: string): Promise<string> {
    const list = await this.vehicleModel.find({ ownerId: userId });
    const json = JSON.stringify(list);

    const file = await this.archiveService.zip([{ contentString: json }]);
    Logger.log(
      `${mm} ... getOwnerVehiclesZippedFile found: ${list.length} ...`
    );
    return file;
  }

  public async getAssociationSettingsModels(
    associationId: string
  ): Promise<any[]> {
    Logger.debug(
      `${mm} getAssociationSettingsModels AssociationId: ${JSON.stringify(associationId)}`
    );
    const list = await this.settingsModel.find({
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
    const uuid = uuidv4();
    console.log(`UUID: ${uuid}`);
    return uuid;
  }

  public async registerAssociation(
    association: Association
  ): Promise<RegistrationBag> {
    const associationId = this.generateUniqueId();

    Logger.log(`\n\n${mm} registerAssociation ... id: ${associationId}`);
    const existingAss = await this.associationModel.findOne({
      associationName: association.associationName,
    });
    if (existingAss) {
      Logger.debug(
        `${mm} existingAss Association: ${JSON.stringify(existingAss, null, 2)}`
      );
      this.errorHandler.handleError(
        "Association exists",
        association.associationId,
        association.associationName
      );
      throw new HttpException(
        "This association exists, so fuck you!",
        HttpStatus.BAD_REQUEST
      );
    }
    let mAdminUser: User;
    let mCarUser: User;
    let myAss: Association;
    let mSettings: SettingsModel;
    try {
      const date = new Date().toISOString();
      const adminUser = new User();
      adminUser.firstName = `admin`;
      adminUser.lastName = `admin${associationId}`;
      adminUser.countryId = association.countryId;
      adminUser.countryName = association.countryName;
      adminUser.associationId = associationId;
      adminUser.associationName = association.associationName;
      adminUser.email = `admin${associationId}${Constants.associationEmailSuffix}`;
      adminUser.dateRegistered = date;
      adminUser.password = `${Constants.associationPasswordPrefix}${associationId}`;
      adminUser.userType = Constants.ADMINISTRATOR_ASSOCIATION;

      mAdminUser = await this.userService.createUser(adminUser);

      const carUser = new User();
      carUser.firstName = `vehicle`;
      carUser.lastName = `vehicle${associationId}`;
      carUser.email = `car${associationId}${Constants.associationEmailSuffix}`;
      carUser.countryId = association.countryId;
      carUser.countryName = association.countryName;
      carUser.associationId = associationId;
      carUser.associationName = association.associationName;
      carUser.dateRegistered = date;
      carUser.password = `${Constants.associationPasswordPrefix}${associationId}`;
      carUser.userType = Constants.ASSOCIATION_CAR;

      mCarUser = await this.userService.createUser(carUser);

      const ass = new Association();
      ass.associationName = association.associationName;
      ass.associationId = associationId;
      ass.countryId = association.countryId;
      ass.countryName = association.countryName;
      ass.dateRegistered = date;
      ass.adminUser = mAdminUser;
      ass.carUser = mCarUser;
      if (ass.countryId) {
        const country = await this.countryModel.find({
          countryId: ass.countryId,
        });
        if (country.length > 0) {
          ass.countryId = country[0].countryId;
          ass.countryName = country[0].name;
        }
      }
      Logger.log(`\n${mm} send association to Atlas ...`);
      const existingAss = await this.associationModel.findOne({
        associationName: ass.associationName,
      });
      if (existingAss) {
        throw new Error("Association already here");
      }
      myAss = await this.associationModel.create(ass);

      const settings = new SettingsModel();
      settings.created = date;
      settings.associationId = associationId;
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

      const files: any[] = await this.getExampleFiles();

      Logger.log(`\n${mm} send settings to Atlas ...`);

      mSettings = await this.settingsModel.create(settings);

      const bag = new RegistrationBag();
      bag.association = myAss;
      bag.settings = mSettings;
      bag.adminUser = mAdminUser;
      bag.exampleFiles = files;
      bag.carUser = mCarUser;

      await this.messagingService.sendAssociationRegisteredMessage(ass);
      Logger.log(
        `\n${mm} 🥬 association registered successfully!! : 🥬 🥬 🥬 ${JSON.stringify(bag, null, 2)} 🥬 \n\n`
      );
      return bag;
    } catch (e) {
      if (mAdminUser) {
        await this.userService.deleteUser(mAdminUser.userId);
        await this.userModel.deleteOne({ userId: mAdminUser.userId });
        Logger.debug(
          `${mm} 😈😈😈 admin user deleted: ${JSON.stringify(mAdminUser, null, 2)}`
        );
      }
      if (mCarUser) {
        await this.userService.deleteUser(mCarUser.userId);
        await this.userModel.deleteOne({ userId: mCarUser.userId });
        Logger.debug(
          `${mm} 😈😈😈 car user deleted: ${JSON.stringify(mCarUser, null, 2)}`
        );
      }

      if (myAss) {
        await this.associationModel.deleteOne({
          associationId: myAss.associationId,
        });
        Logger.debug(
          `${mm} 😈😈😈 ass deleted: ${JSON.stringify(myAss, null, 2)}`
        );
      }
      this.errorHandler.handleError(
        e,
        association.associationId,
        association.associationName
      );
      throw new HttpException(
        `Registration failed: ${JSON.stringify(e)}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async addSettingsModel(model: SettingsModel): Promise<any> {
    Logger.log(`adding addSettingsModel${model}`);
    return await this.settingsModel.create(model);
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

    return await this.associationTokenModel.create(at);
  }

  public async getAssociationAppErrors(
    associationId: string,
    startDate: string,
    endDate: string
  ): Promise<AppError[]> {
    return this.appErrorModel.find({
      associationId: associationId,
      created: { $gte: startDate, $lte: endDate },
    });
  }
  public async getRandomCommuters(limit: number): Promise<any[]> {
    return this.commuterModel.find({ limit });
  }

  public async getAppErrors(startDate: string): Promise<any[]> {
    return this.appErrorModel.find({
      created: { $gte: startDate },
    });
  }

  public async getExampleFiles(): Promise<any[]> {
    return this.exampleFileModel.find({});
  }

  public async upLoadExampleFiles(): Promise<ExampleFile[]> {
    return [];
  }
  getFakeEmail() {
    const name = "fake admin";
    const mName = name.replace(" ", "").toLowerCase();
    return `${mName}_${new Date().getTime()}@kasietransie.com`;
  }
  randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getFakeCellphoneNumber() {
    const arr = [];
    arr.push("+2765");
    for (let i = 0; i < 7; i++) {
      const x = this.randomIntFromInterval(0, 9);
      arr.push(x);
    }
    return arr.join("");
  }
}
