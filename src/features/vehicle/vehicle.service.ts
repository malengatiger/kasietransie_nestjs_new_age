/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { UpdateResult } from "mongoose";
import { Vehicle } from "src/data/models/Vehicle";
import { Association } from "src/data/models/Association";
import { User } from "src/data/models/User";
import { Route } from "src/data/models/Route";
import { RouteAssignmentList } from "src/data/helpers/RouteAssignmentList";
import { RouteAssignment } from "src/data/models/RouteAssignment";
import { RoutePoint } from "src/data/models/RoutePoint";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
// import csvParser from "csv-parser";
import * as fs from "fs";
import { randomUUID } from "crypto";
import { VehicleBag } from "src/data/helpers/VehicleBag";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { AssociationService } from "../association/association.service";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { VehicleMediaRequest } from "src/data/models/VehicleMediaRequest";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import * as os from "os";
import * as path from "path";
import { parse } from "csv";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { UserService } from "../user/user.service";
import { DispatchService } from "../dispatch/dispatch.service";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { Trip } from "src/data/models/Trip";
import { daysInWeek } from "date-fns";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { FuelBrand } from "src/data/models/FuelBrand";
import { FuelTopUp } from "src/data/models/FuelTopUp";
const mm = "💚 💚 💚 VehicleService  💚 ";

@Injectable()
export class VehicleService {
  constructor(
    private storage: CloudStorageUploaderService,
    private associationService: AssociationService,
    private userService: UserService,
    private readonly dispatchService: DispatchService,

    private readonly errorHandler: KasieErrorHandler,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,
    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,

    @InjectModel(VehicleHeartbeat.name)
    private vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>,

    @InjectModel(AmbassadorPassengerCount.name)
    private ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(VehicleDeparture.name)
    private vehicleDepartureModel: mongoose.Model<VehicleDeparture>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(RouteAssignment.name)
    private assignModel: mongoose.Model<RouteAssignment>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,

    @InjectModel(VehicleTelemetry.name)
    private vehicleTelemetryModel: mongoose.Model<VehicleTelemetry>,

    @InjectModel(AmbassadorPassengerCount.name)
    private passengerCountModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(CommuterCashPayment.name)
    private commuterCashPaymentModel: mongoose.Model<CommuterCashPayment>,

    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>,

    @InjectModel(FuelBrand.name)
    private fuelBrandModel: mongoose.Model<FuelBrand>,

    @InjectModel(FuelTopUp.name)
    private fuelTopUpModel: mongoose.Model<FuelTopUp>,


    @InjectModel(RankFeeCashPayment.name)
    private rankFeeCashPaymentModel: mongoose.Model<RankFeeCashPayment>
  ) {}

  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string
  ): Promise<VehicleMediaRequest[]> {
    return this.vehicleMediaRequestModel.find({
      associationId: associationId,
      created: { $gte: startDate },
    });
  }

  public async addFuelBrand(
    fuelBrand: FuelBrand
  ): Promise<FuelBrand> {
    fuelBrand.fuelBrandId = randomUUID();
    fuelBrand.created = new Date().toISOString();
    return await this.fuelBrandModel.create(fuelBrand);
  }
  public async getFuelBrands(
  ): Promise<FuelBrand[]> {
    return await this.fuelBrandModel.find({});
  }
  public async addFuelTopUp(
    fuelTopUp: FuelTopUp
  ): Promise<FuelTopUp> {
    return await this.fuelTopUpModel.create(fuelTopUp);
  }
  public async getAssociationFuelTopUps(
    associationId: string, startDate: string, endDate: string
  ): Promise<FuelTopUp[]> {
    return await this.fuelTopUpModel.find({
      associationId: associationId
    });
  }
  public async getVehicleFuelTopUps(
    vehicleId: string, startDate: string, endDate: string
  ): Promise<FuelTopUp[]> {
    const res = await this.fuelTopUpModel.find({
      vehicleId: vehicleId,
      created: {$gte: startDate, $lte: endDate}
    });
    Logger.debug(`${mm} getVehicleFuelTopUps: ${JSON.stringify(res, null, 2)}`);
    return res;
  }
  public async addVehiclePhoto(
    vehiclePhoto: VehiclePhoto
  ): Promise<VehiclePhoto> {
    const mDate = new Date(vehiclePhoto.created);
    vehiclePhoto.mDate = mDate;
    return await this.vehiclePhotoModel.create(vehiclePhoto);
  }
  public async getVehicleMediaRequests(
    vehicleId: string
  ): Promise<VehicleMediaRequest[]> {
    return [];
  }
  public async addVehicleVideo(
    vehicleVideo: VehicleVideo
  ): Promise<VehicleVideo> {
    const mDate = new Date(vehicleVideo.created);
    vehicleVideo.mDate = mDate;
    return await this.vehicleVideoModel.create(vehicleVideo);
  }
  public async getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]> {
    const photos = await this.vehiclePhotoModel.find({
      vehicleId: vehicleId,
    });
    Logger.debug(`${mm} vehicle photos found: ${photos.length}`);
    return photos;
  }
  public async getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]> {
    return [];
  }
  public async findOwnerVehiclesByLocationAndTime(
    userId: string,
    latitude: number,
    longitude: number,
    minutes: number
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async findAssociationVehiclesByLocationAndTime(
    associationId: string,
    latitude: number,
    longitude: number,
    minutes: number
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateFakeVehiclesFromFile(
    associationId: string
  ): Promise<Vehicle[]> {
    return [];
  }
  public async getPoints(route: Route): Promise<RoutePoint[]> {
    return [];
  }
  public async buildUser(
    cellphone: string,
    lastName: string,
    firstName: string,
    ass: Association,
    responses: []
  ): Promise<User> {
    return null;
  }
  public async insertCar(
    resultVehicles: Vehicle[],
    responses: [],
    existingUser: User,
    vehicle: Vehicle,
    result: number
  ): Promise<void> {
    return null;
  }

  public async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    try {
      Logger.debug(`${mm} ... addVehicle; car ... ${vehicle.vehicleReg}`);

      const existingCar = await this.vehicleModel.findOne({
        vehicleId: vehicle.vehicleId,
      });
      if (existingCar) {
        Logger.debug(`${mm} ... car exists; will update ...`);
        vehicle.updated = new Date().toISOString();
        const res = await this.vehicleModel.updateOne(
          {
            vehicleId: vehicle.vehicleId,
          },
          vehicle
        );
        Logger.debug(
          `${mm} car updated, result: ${JSON.stringify(res, null, 2)}`
        );
        return vehicle;
      } else {
        Logger.debug(
          `${mm} ... creating new car ... ${JSON.stringify(vehicle)}`
        );
        vehicle.created = new Date().toISOString();
        const url = await this.storage.createQRCode({
          data: JSON.stringify(vehicle, null, 2),
          prefix: vehicle.vehicleReg.replace(" ", ""),
          size: 1,
          associationId: vehicle.associationId,
        });
        vehicle.qrCodeUrl = url;
        await this.vehicleModel.create(vehicle);
        return vehicle;
      }
    } catch (e) {
      Logger.debug(`${mm} add car failed: ${e}`);
      this.errorHandler.handleError(
        `Vehicle add failed: ${e}`,
        vehicle.associationId,
        vehicle.associationName
      );
      throw new HttpException(
        `🔴🔴 addVehicle failed ${e} 🔴🔴`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async getVehicleBag(
    vehicleId: string,
    startDate: string
  ): Promise<VehicleBag> {
    const dispatches = await this.dispatchRecordModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const beats = await this.vehicleHeartbeatModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const counts = await this.ambassadorPassengerCountModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const arrivals = await this.vehicleArrivalModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    const deps = await this.vehicleDepartureModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate },
    });
    //
    const bag = new VehicleBag();
    bag.arrivals = arrivals;
    bag.dispatchRecords = dispatches;
    bag.created = new Date().toISOString();
    bag.departures = deps;
    bag.heartbeats = beats;
    bag.vehicleId = vehicleId;
    bag.passengerCounts = counts;
    return bag;
  }
  public async addRouteAssignments(
    list: RouteAssignmentList
  ): Promise<RouteAssignment[]> {
    Logger.log(`${mm} ... addRouteAssignments: ${list.assignments}`);
    return await this.assignModel.insertMany(list.assignments);
  }
  public async getVehicleRouteAssignments(
    vehicleId: string
  ): Promise<RouteAssignment[]> {
    return this.assignModel.find({ vehicleId: vehicleId });
  }
  public async getRouteAssignments(
    routeId: string
  ): Promise<RouteAssignment[]> {
    return this.assignModel.find({ routeId: routeId });
  }
  public async generateHeartbeats(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateRouteHeartbeats(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async updateVehicle(vehicle: Vehicle): Promise<UpdateResult> {
    Logger.debug(`${mm} Update vehicle, check fcmToken: ${JSON.stringify(vehicle)}`);
    
    const updateResult = await this.vehicleModel.updateOne({
      vehicleId: vehicle.vehicleId, 
    }, vehicle);
    Logger.debug(`${mm} updateVehicle: Update result: ${updateResult}`);

    return updateResult;
  }

  public async getOwnerVehicles(
    userId: string,
    page: number
  ): Promise<Vehicle[]> {
    return this.vehicleModel.find({ ownerId: userId }).sort({ vehicleReg: 1 });
  }
  public async updateVehicleQRCode(vehicle: Vehicle): Promise<number> {
    const url = await this.storage.createQRCode({
      data: JSON.stringify(vehicle),
      prefix: vehicle.vehicleReg.replace(" ", ""),
      size: 2,
      associationId: vehicle.associationId,
    });
    vehicle.qrCodeUrl = url;
    await this.vehicleModel.create(vehicle);
    return 0;
  }

  public async uploadQRFile(
    file: Express.Multer.File,
    associationId: string
  ): Promise<any> {
    Logger.log(
      `\n\n${mm} uploadQRFile: ... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`
    );
    Logger.debug(
      `${mm} uploadQRFile:... file size: ${file.buffer.length} bytes`
    );

    let uploadResult = null;
    try {
      // Create a temporary file path
      const tempFilePath = path.join(os.tmpdir(), file.originalname);
      await fs.promises.writeFile(tempFilePath, file.buffer);

      Logger.log(`${mm} uploadQRFile: ... 🔵 tempFilePath: ${tempFilePath}`);
      uploadResult = await this.storage.uploadQRCodeFile(
        associationId,
        tempFilePath
      );
    } catch (err) {
      Logger.error(`${mm} 😈😈 Error uploadQRFile: 😈😈 ${err}`);
      this.errorHandler.handleError(err, associationId, "nay");
      throw new HttpException(
        `🔴🔴 Error uploadQRFile failed ${err} 🔴🔴`,
        HttpStatus.BAD_REQUEST
      );
    }
    if (uploadResult) {
      Logger.log(`${mm} return qrcode upload result: ${uploadResult}`);
      return uploadResult;
    } else {
      // This should ideally never happen now
      Logger.error(`${mm} Unexpected error: url is undefined`);
      this.errorHandler.handleError(
        "Unexpected Error: url is undefine",
        associationId,
        "nay"
      );
      throw new HttpException(
        `🔴🔴 Error uploadQRFile failed 🔴🔴`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async getVehicleData(
    vehicleId: string,
    startDate: string,
    endDate: string
  ): Promise<any> {
    Logger.log(
      `${mm} getVehicleData: vehicleId: ${vehicleId} startDate: ${startDate} endDate:${endDate}`
    );

    const telemetry = await this.vehicleTelemetryModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const dispatches = await this.dispatchRecordModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const passengerCounts = await this.passengerCountModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });

    const commuterCashPayments = await this.commuterCashPaymentModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const vehicleArrivals = await this.vehicleArrivalModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });

    const trips = await this.tripModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const rankFeeCashPayments = await this.rankFeeCashPaymentModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });
    const fuelTopUps = await this.fuelTopUpModel.find({
      vehicleId: vehicleId,
      created: { $gte: startDate, $lte: endDate },
    });

    var result = {
      vehicleArrivals: vehicleArrivals,
      commuterCashPayments: commuterCashPayments,
      passengerCounts: passengerCounts,
      dispatchRecords: dispatches,
      vehicleTelemetry: telemetry,
      trips: trips,
      fuelTopUps: fuelTopUps,
      commuterCashCheckIns: [],
      rankFeeCashPayments: rankFeeCashPayments,
      rankFeeCashCheckIns: [],
    };

    const jsonData = JSON.stringify(result, null, 2); // Convert JSON object to string with indentation
    // Specify the file path where you want to save the JSON data
    const outputDir = './vehicledata';
    const filePath = path.join(outputDir, `${new Date().getTime()}_data.json`);
    
    //todo - uncomment when ready - save data in json file and upload it to cloud storage
    // try {
    //     if (!fs.existsSync(outputDir)) {
    //         fs.mkdirSync(outputDir);
    //     }
    //     fs.writeFileSync(filePath, jsonData);
    //     console.log(`JSON data saved to ${filePath}`);

    // } catch (error) {
    //   console.error("Error writing JSON data to file:", error);
    //   // Handle the error appropriately, e.g., throw an exception or return an error response.
    // }

    Logger.debug(`${mm} vehicleData: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}

export interface AddCarsResponse {
  cars: Vehicle[];
  errors: any[];
}
