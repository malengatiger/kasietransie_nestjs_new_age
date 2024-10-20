/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
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
const mm = "💚 💚 💚 VehicleService  💚 ";

@Injectable()
export class VehicleService {
  constructor(
    private storage: CloudStorageUploaderService,
    private associationService: AssociationService,
    private userService: UserService,

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
    private vehicleVideoModel: mongoose.Model<VehicleVideo>
  ) {}

  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string
  ): Promise<VehicleMediaRequest[]> {
    return await this.vehicleMediaRequestModel.find({
      associationId: associationId,
      startDate: startDate,
    });
  }
  public async addVehiclePhoto(
    vehiclePhoto: VehiclePhoto
  ): Promise<VehiclePhoto> {
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
      if (vehicle.ownerName != null) {
        Logger.debug(`${mm} ... checking owner ... create if none.`);
        const userCount = await this.createOwnerIfNotExists(vehicle);
        Logger.debug(`${mm} fresh new owner created: ${userCount} `);
      }

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
        Logger.debug(`$mm car updated, result: ${JSON.stringify(res)}`)
        return vehicle;
      } else {
        Logger.debug(`${mm} creating new vehicle ...`);
        vehicle.vehicleId = randomUUID();
        vehicle.created = new Date().toISOString();
        const url = await this.storage.createQRCode({
          data: JSON.stringify(vehicle),
          prefix: vehicle.vehicleReg.replaceAll(" ", ""),
          size: 2,
          associationId: vehicle.associationId,
        });
        vehicle.qrCodeUrl = url;
        return await this.vehicleModel.create(vehicle);
      }
    } catch (e) {
      Logger.debug(`${mm} add car failed: ${e}`);
      this.errorHandler.handleError(
        `Vehicle add failed: ${e}`,
        vehicle.associationId
      );
      throw new HttpException(`🔴🔴 ${e} 🔴🔴`, HttpStatus.BAD_REQUEST);
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
  public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.vehicleModel.create(vehicle);
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

  private async addCarsToDatabase(cars: Vehicle[]): Promise<AddCarsResponse> {
    Logger.log(`${mm} ... addCarsToDatabase: ${cars.length}`);
    const errors = [];
    const uList: any[] = [];
    for (const mCar of cars) {
      try {
        const c = await this.vehicleModel.create(mCar);
        uList.push(c);
        Logger.log(
          `${mm} car added to Atlas: 🍎 ${JSON.stringify(c, null, 2)}\n`
        );
      } catch (e) {
        errors.push(mCar);
        Logger.error(
          `${mm} 😈 👿 error adding car: ${mCar.vehicleReg} to Atlas: ${e} 😈 👿\n`
        );
      }
    }

    Logger.log(
      `${mm}  🍎🍎🍎🍎 ${uList.length} cars added to Atlas 🍎🍎 🥬 🥬\n`
    );
    Logger.log(
      `${mm} 😈 👿 errors encountered adding cars to Atlas: ${errors.length} 😈 👿`
    );
    return { cars: uList, errors: errors };
  }

  public async importVehiclesFromCSV(
    file: Express.Multer.File,
    associationId: string
  ): Promise<AddCarsResponse> {
    Logger.log(
      `\n\n${mm} importVehiclesFromCSV: ... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`
    );
    Logger.debug(
      `${mm} importVehiclesFromCSV:... file size: ${file.buffer.length} bytes`
    );
    const list = await this.associationModel.find({
      associationId: associationId,
    });
    if (list.length == 0) {
      throw new Error("Association not found");
    }
    const ass = list[0];
    Logger.log(
      `${mm} importVehiclesFromCSV:... association: 🔵 ${JSON.stringify(ass, null, 2)} 🔵\n\n`
    );

    const cars: Vehicle[] = [];
    Logger.log(
      `${mm} importVehiclesFromCSV:... 🔵 read csv file: ${file.originalname}`
    );
    let response: AddCarsResponse;
    // Create a temporary file path
    const tempFilePath = path.join(os.tmpdir(), file.originalname);
    Logger.log(
      `${mm} importVehiclesFromCSV:... 🔵 tempFilePath: ${tempFilePath}`
    );
    const carList = [];

    try {
      let index = 0;
      // Write the uploaded file data to the temporary file
      await fs.promises.writeFile(tempFilePath, file.buffer);
      // Wrap the entire stream processing in a Promise
      response = await new Promise<AddCarsResponse>((resolve, reject) => {
        fs.createReadStream(tempFilePath)
          .pipe(parse())
          .on("data", async (data: any) => {
            if (index > 0) {
              carList.push(data);
            }
            index++;
          })
          .on("error", (err) => {
            reject(new Error(`Error processing vehicles CSV file: ${err}`));
          })
          .on("end", async () => {
            Logger.debug(`${mm} CSV parsing completed ......`);
            Logger.log(`${mm} Save the parsed cars to the database`);
            const result = await this.handleExtractedCars(carList, cars, ass);
            // Delete the temporary file after processing
            await fs.promises.unlink(tempFilePath);
            resolve(result); // Resolve the promise with the response
          });
      });
    } catch (err) {
      Logger.error(
        `${mm} 😈😈 Error processing vehicles CSV file: 😈😈 ${err}`
      );
      this.errorHandler.handleError(err, ass.associationId);
    }

    // Now 'response' will have the correct value
    if (response) {
      Logger.log(`${mm} return response: ${JSON.stringify(response, null, 2)}`);
      return response;
    } else {
      // This should ideally never happen now
      Logger.error(`${mm} Unexpected error: response is undefined`);
      this.errorHandler.handleError("Unexpected Error", ass.associationId);
    }
  }

  private async handleExtractedCars(
    carList: any[],
    cars: Vehicle[],
    ass: Association
  ) {
    Logger.debug(`${mm} handleExtractedCars: 🔷 ${carList.length} cars`);
    let userCount = 0;
    for (const mCar of carList) {
      const car: Vehicle = await this.buildCar(mCar, ass);
      userCount += await this.createOwnerIfNotExists(car);
      cars.push(car);
    }

    Logger.debug(
      `\n\n${mm} handleExtractedCars: 🔷 ${userCount} 🔷 owners have been added to Atlas`
    );
    Logger.debug(
      `${mm} handleExtractedCars: 🔷 ${cars.length} 🔷 cars to be added to Atlas`
    );

    const response = await this.addCarsToDatabase(cars);
    return response;
  }

  private async buildCar(data: string[], ass: Association): Promise<Vehicle> {
    Logger.debug(
      `\n${mm} buildCar, data: check for vehicleReg in csv data:\n ${JSON.stringify(data)}\n`
    );
    Logger.debug(
      `${mm} buildCar, association: ${JSON.stringify(ass.associationName)}`
    );

    const myCar = new Vehicle();
    myCar.vehicleId = randomUUID().trim();
    myCar.ownerName = data[0];
    myCar.vehicleReg = data[1];
    myCar.model = data[2];
    myCar.make = data[3];
    myCar.year = data[4];
    myCar.passengerCapacity = parseInt(data[5]);

    myCar.associationId = ass.associationId;
    myCar.associationName = ass.associationName;
    myCar.active = 0;
    myCar.created = new Date().toISOString();

    const url = await this.storage.createQRCode({
      data: JSON.stringify(myCar),
      prefix: "car",
      size: 2,
      associationId: ass.associationName,
    });
    myCar.qrCodeUrl = url;
    Logger.debug(
      `\n${mm} buildCar:... 🔵 vehicle built: ${JSON.stringify(myCar, null, 2)} 🔵\n\n`
    );
    return myCar;
  }

  public async createOwnerIfNotExists(car: Vehicle): Promise<number> {
    Logger.debug(`\n${mm} handleOwner: for car: 🔵 ${car.vehicleReg}`);

    const nameParts = car.ownerName.split(" ");
    const firstName = nameParts.slice(0, -1).join(" "); // Join all parts except the last one
    const lastName = nameParts[nameParts.length - 1]; // Take the last part as the last name
    Logger.debug(
      `\n${mm} handleOwner: firstName: ${firstName} lastName: ${lastName}`
    );

    const user = await this.userService.getUserByName(firstName, lastName);
    try {
      if (user == null) {
        const mUser = await this.userService.createOwner(car);
        car.ownerId = mUser.userId;
        car.ownerName = mUser.firstName + " " + mUser.lastName;
        Logger.debug(
          `\n\n${mm} new owner created! 🍎 🍎 ${JSON.stringify(mUser, null, 2)} 🍎 🍎\n\n`
        );
        return 1;
      }
    } catch (e) {
      //TODO ignore for now
      return 0;
    }

    Logger.debug(
      `${mm} owner exists already!  🔵 🔵 ${user.firstName} ${user.lastName}`
    );
    car.ownerId = user.userId;
    return 0;
  }
}

export interface AddCarsResponse {
  cars: Vehicle[];
  errors: any[];
}
