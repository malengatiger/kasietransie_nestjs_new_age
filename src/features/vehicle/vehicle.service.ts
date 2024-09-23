/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Vehicle } from 'src/data/models/Vehicle';
import { Association } from 'src/data/models/Association';
import { User } from 'src/data/models/User';
import { Route } from 'src/data/models/Route';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import csvParser from 'csv-parser';
import * as fs from 'fs';
import { randomUUID } from 'crypto';
import { VehicleBag } from 'src/data/helpers/VehicleBag';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { AssociationService } from '../association/association.service';
import { CloudStorageUploaderService } from 'src/storage/storage.service';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { VehiclePhoto } from 'src/data/models/VehiclePhoto';
import { VehicleVideo } from 'src/data/models/VehicleVideo';

const mm = ' 💚 💚 💚 VehicleService  💚';

@Injectable()
export class VehicleService {
  constructor(
    private storage: CloudStorageUploaderService,
    private associationService: AssociationService,
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

    @InjectModel(Route.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(Route.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(Route.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,

  ) {}

  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string,
  ): Promise<VehicleMediaRequest[]> {
    return await this.vehicleMediaRequestModel.find({
      associationId: associationId,
      startDate: startDate,
    });
  }
  public async addVehiclePhoto(
    vehiclePhoto: VehiclePhoto,
  ): Promise<VehiclePhoto> {
    return await this.vehiclePhotoModel.create(vehiclePhoto);
  }
  public async getVehicleMediaRequests(
    vehicleId: string,
  ): Promise<VehicleMediaRequest[]> {
    return [];
  }
  public async addVehicleVideo(
    vehicleVideo: VehicleVideo,
  ): Promise<VehicleVideo> {
    return await this.vehicleVideoModel.create(vehicleVideo);
  }
  public async getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]> {
    return [];
  }
  public async getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]> {
    return [];
  }
  public async findOwnerVehiclesByLocationAndTime(
    userId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async findAssociationVehiclesByLocationAndTime(
    associationId: string,
    latitude: number,
    longitude: number,
    minutes: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateFakeVehiclesFromFile(
    associationId: string,
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
    responses: [],
  ): Promise<User> {
    return null;
  }
  public async insertCar(
    resultVehicles: Vehicle[],
    responses: [],
    existingUser: User,
    vehicle: Vehicle,
    result: number,
  ): Promise<void> {
    return null;
  }
  public async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
    const url = await this.storage.createQRCode(
     {
       data: JSON.stringify(vehicle),
       prefix: vehicle.vehicleReg,
       size: 2,
       associationId: vehicle.associationId,
     }
    );
    vehicle.qrCodeUrl = url;
    return await this.vehicleModel.create(vehicle);
  }

  public async getVehicleBag(
    vehicleId: string,
    startDate: string,
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
    list: RouteAssignmentList,
  ): Promise<RouteAssignment[]> {
    Logger.log(`${mm} ... addRouteAssignments: ${list.assignments}`);
    return await this.assignModel.insertMany(list.assignments);
  }
  public async getVehicleRouteAssignments(
    vehicleId: string,
  ): Promise<RouteAssignment[]> {
    return this.assignModel.find({ vehicleId: vehicleId });
  }
  public async getRouteAssignments(
    routeId: string,
  ): Promise<RouteAssignment[]> {
    return this.assignModel.find({ routeId: routeId });
  }
  public async generateHeartbeats(
    associationId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async generateRouteHeartbeats(
    routeId: string,
    numberOfCars: number,
    intervalInSeconds: number,
  ): Promise<VehicleHeartbeat[]> {
    return [];
  }
  public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
    return await this.vehicleModel.create(vehicle);
  }

  public async getOwnerVehicles(
    userId: string,
    page: number,
  ): Promise<Vehicle[]> {
    return this.vehicleModel.find({ ownerId: userId }).sort({ vehicleReg: 1 });
  }
  public async updateVehicleQRCode(vehicle: Vehicle): Promise<number> {
    const url = await this.storage.createQRCode(
      {
        data: JSON.stringify(vehicle),
        prefix: vehicle.vehicleReg.replace(' ', ''),
        size: 2,
        associationId: vehicle.associationId,
      });
    vehicle.qrCodeUrl = url;
    await this.vehicleModel.create(vehicle);
    return 0;
  }

  public async importVehiclesFromJSON(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<Vehicle[]> {
    const ass = await this.associationModel.find({associationId: associationId});
    const cars: Vehicle[] = [];

    // Parse the JSON file and create User objects
    const jsonData = fs.readFileSync(file.path, 'utf-8');
    const jsonUsers = JSON.parse(jsonData);

    const m = new Association();
    m.associationId = ass[0].associationId;
    m.associationName = ass[0].associationName;
    m.countryId = ass[0].countryId;
    m.countryName = ass[0].countryName;

    jsonUsers.forEach(async (data: any) => {
      const car: Vehicle = await this.buildCar(data, m);
      cars.push(car);
    });

    // Save the parsed users to the database
    const uList = [];
    await this.processCars(cars, uList);

    return uList;
  }
  private async processCars(cars: Vehicle[], uList: any[]) {
    cars.forEach(async (data: Vehicle) => {
      const url = await this.storage.createQRCode(
        {
          data: JSON.stringify(data),
          prefix: data.vehicleReg.replace(' ', ''),
          size: 2,
          associationId: data.associationId,
        });
      data.qrCodeUrl = url;
      const c = await this.vehicleModel.create(data);
      uList.push(c);
    });
    Logger.log(`${uList.length} cars added`);
  }

  public async importVehiclesFromCSV(
    file: Express.Multer.File,
    associationId: string,
  ): Promise<Vehicle[]> {
    const list = await this.associationModel.find({associationId: associationId});
    if (list.length == 0) {
      throw new Error('Association not found');
    }
    const ass = list[0];
    const m = new Association();
    m.associationId = ass.associationId;
    m.associationName = ass.associationName;
    m.countryId = ass.countryId;
    m.countryName = ass.countryName;

    const cars: Vehicle[] = [];
    const pCars: Vehicle[] = [];

    fs.createReadStream(file.path)
      .pipe(csvParser())
      .on('data', async (data: any) => {
        const car: Vehicle = await this.buildCar(data, m);
        cars.push(car);
      })
      .on('end', async () => {
        // Save the parsed users to the database
        await this.processCars(cars, pCars);
      });

    Logger.log(`${pCars.length} cars added`);
    return cars;
  }
  private async buildCar(data: any, ass: Association): Promise<Vehicle> {
    const car = {
      _partitionKey: null,
      _id: null,
      ownerId: null,
      cellphone: data.cellphone,
      vehicleId: randomUUID.toString(),
      associationId: ass.associationId,
      countryId: ass.countryId,
      ownerName: data.ownerName,
      associationName: ass.associationName,
      vehicleReg: data.vehicleReg,
      model: data.model,
      make: data.make,
      year: data.year,
      passengerCapacity: data.passengerCapacity,
      active: 0,
      created: Date.now().toString(),
      updated: null,
      dateInstalled: null,
      qrCodeUrl: null,
    };
    const prefix = data.vehicleReg.replace(' ', '');
    const url = await this.storage.createQRCode(
     {
       data: JSON.stringify(car),
       prefix: prefix,
       size: 2,
       associationId: ass.associationId,
     
     }
    );
    car.qrCodeUrl = url;
    return car;
  }
}
