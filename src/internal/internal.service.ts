import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  DeleteUsersResult,
  ListUsersResult,
} from "firebase-admin/lib/auth/base-auth";
import mongoose from "mongoose";
import { Association } from "src/data/models/Association";
import { User } from "src/data/models/User";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import admin from "firebase-admin";
import { Vehicle } from "src/data/models/Vehicle";
import { UserService } from "src/features/user/user.service";
import { Constants } from "src/my-utils/constants";
import { Storage } from "@google-cloud/storage";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { Ticket } from "src/data/models/Ticket";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { DispatchService } from "src/features/dispatch/dispatch.service";
import { CommuterService } from "src/features/commuter/commuter.service";
import { PaymentService } from "src/features/payment/payment.service";
import { VehicleService } from "src/features/vehicle/vehicle.service";
import { Route } from "src/data/models/Route";
import { randomUUID } from "crypto";
import { Position } from "src/data/models/position";
import { Trip } from "src/data/models/Trip";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { AmbassadorService } from "src/features/ambassador/ambassador.service";
import { de } from "date-fns/locale";
import { AssociationService } from "src/features/association/association.service";
import { TelemetryService } from "src/features/heartbeat/heartbeat.service";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";

const mm = " 🔵 🔵 🔵 🔵 InternalService  🔵 ";

@Injectable()
export class InternalService {
  constructor(
    private readonly userService: UserService,
    private readonly dispatchService: DispatchService,
    private readonly commuterService: CommuterService,
    private readonly paymentService: PaymentService,
    private readonly vehicleService: VehicleService,
    private readonly ambassadorService: AmbassadorService,
    private readonly telemetryService: TelemetryService,


    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(Ticket.name)
    private ticketModel: mongoose.Model<Ticket>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,

    @InjectModel(VehicleTelemetry.name)
    private vehicleTelemetryModel: mongoose.Model<VehicleTelemetry>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>
  ) {}

  public async deleteCloudStorage(): Promise<any> {
    const bucketName = "kasie-transie-3.appspot.com";
    Logger.debug(
      `${mm} deleteCloudStorage: starting cloud storage deletes ... for bucket: ${bucketName}`
    );

    const storage = new Storage();
    const [metadata] = await storage.bucket(bucketName).addLifecycleRule({
      action: {
        type: "Delete",
      },
      condition: { age: 0 },
    });

    Logger.log(
      `${mm} Lifecycle management is enabled for bucket ${bucketName} and the rules are below:`
    );
    Logger.debug(
      `${mm} metadata.lifecycle.rule: ${JSON.stringify(metadata.lifecycle.rule)}`
    );
    const bucket = storage.bucket(bucketName);
    await bucket.deleteFiles({
      prefix: `kasie-transie-3_data`,
    });
    const msg = `🌰 🌰🌰 🌰 Cloud Storage bucket.deleteFiles: ${bucket.name} completed. 🌰 🌰`;
    Logger.debug(`${mm} ${msg}`);
    return msg;
  }
  public async addInternalAdminUser(): Promise<User> {
    Logger.log(`\n\n\n${mm} addInternalAdminUser to Atlas ...\n`);

    const user: User = new User();
    user.firstName = "Kenneth";
    user.lastName = "Kaunda";
    user.associationName = "ADMIN";
    user.associationId = "ADMIN";
    user.cellphone = null;
    user.email = "kk@swt.com";
    user.password = "pass123";
    user.countryId = "7a2328bf-915f-4194-82ae-6c220c046cac";
    user.userType = Constants.ADMINISTRATOR_AFTAROBOT;

    const res = await this.userService.createUser(user);
    Logger.debug(
      `${mm} InternalAdminUser created: ${JSON.stringify(res, null, 2)}`
    );
    return user;
  }
  public async addInternalAppUser(): Promise<User> {
    Logger.log(`\n\n\n${mm} addInternalAppUser to Atlas ...\n`);

    const user: User = new User();
    user.firstName = "Admin";
    user.lastName = "AppUser";
    user.associationName = "ADMIN";
    user.associationId = "ADMIN";
    user.cellphone = null;
    user.email = "admin@kasie.com";
    user.password = "pass123";
    user.countryId = "7a2328bf-915f-4194-82ae-6c220c046cac";
    user.userType = Constants.ADMINISTRATOR_AFTAROBOT;

    const res = await this.userService.createUser(user);
    Logger.log(
      `${mm} InternalAppUser created: ${JSON.stringify(res, null, 2)}`
    );
    return user;
  }
  public async deleteAllMongoDBusers(): Promise<any> {
    Logger.log(`\n${mm} deleteAllMongoDBusers from Atlas ...`);
    var res = await this.userModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllMongoDBusers from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllVehicles(): Promise<any> {
    Logger.log(`${mm} deleteAllVehicles from Atlas ...`);
    var res = await this.vehicleModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllVehicles from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }

  public async deleteAllVehicleArrivals(): Promise<any> {
    Logger.log(`${mm} deleteAllVehicleArrivals from Atlas ...`);
    var res = await this.vehicleArrivalModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllVehicleArrivals from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllDispatches(): Promise<any> {
    Logger.log(`${mm} deleteAllDispatches from Atlas ...`);
    var res = await this.dispatchRecordModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllDispatches from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllTickets(): Promise<any> {
    Logger.log(`${mm} deleteAllTickets from Atlas ...`);
    var res = await this.ticketModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllTickets from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllTelemetry(): Promise<any> {
    Logger.log(`${mm} deleteAllTelemetry from Atlas ...`);
    var res = await this.vehicleTelemetryModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllTelemetry from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllCommuterRequests(): Promise<any> {
    Logger.log(`${mm} deleteAllCommuterRequests from Atlas ...`);
    var res = await this.commuterRequestModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllCommuterRequests from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllFirebaseUsers(): Promise<DeleteUsersResult> {
    Logger.debug(
      `\n${mm} deleteAllFirebaseUsers: delete all Firebase users ...`
    );
    const res: ListUsersResult = await admin.auth().listUsers();
    const uids = [];
    res.users.forEach((u) => {
      uids.push(u.uid);
      Logger.debug(
        `${mm} deleteAllFirebaseUsers: Firebase user: ${u.displayName} - ${u.email}`
      );
    });

    Logger.debug(
      `${mm} deleteAllFirebaseUsers: deleting ${uids.length} Firebase users ...`
    );

    const result: DeleteUsersResult = await admin.auth().deleteUsers(uids);
    Logger.debug(
      `${mm} deleteAllFirebaseUsers: deleted all Firebase users: ${JSON.stringify(result, null, 2)}`
    );
    return result;
  }

  public async startOfficialAppCarDemo(
    vehicleId: string,
    routeId: string,
    userId: string,
    latitude: number,
    longitude: number
  ): Promise<any> {
    Logger.log(`\n\n${mm} ... startOfficialAppCarDemo ... `);

    try {
      const vehicle = await this.vehicleModel.findOne({ vehicleId: vehicleId });
      const route = await this.routeModel.findOne({ routeId: routeId });
      const user = await this.userModel.findOne({ userId: userId });


      if (!vehicle) {
        Logger.error(`${mm} ERROR: vehicle not found`);
        throw new HttpException(`Demo failed: car not found`, HttpStatus.BAD_REQUEST);
      } if (!route) {
        Logger.error(`${mm} ERROR: route not found`);
        throw new HttpException(`Demo failed: route not found`, HttpStatus.BAD_REQUEST);
      }
      if (!user) {
        Logger.error(`${mm} ERROR: user not found`);
        throw new HttpException(`Demo failed: user not found`, HttpStatus.BAD_REQUEST);
      }

      Logger.debug(`${mm} add dispatch record ...`);
      const dr = new DispatchRecord();
      dr.vehicleId = vehicle.vehicleId;
      dr.vehicleReg = vehicle.vehicleReg;
      dr.dispatchRecordId = randomUUID();
      dr.associationId = route.associationId;
      dr.associationName = route.associationName;
      dr.ownerId = vehicle.ownerId;
      dr.passengers = this.getRandomInt();
      dr.mDate = new Date();
      dr.created = new Date().toISOString();
      dr.routeName = route.name;
      dr.routeId = route.routeId;

     

      await this.dispatchService.addDispatchRecord(dr);

      Logger.debug(`${mm} add Trip ...`);
      const trip = new Trip();
      trip.tripId = randomUUID();
      trip.associationId = vehicle.associationId;
      trip.associationName = vehicle.associationName;
      trip.vehicleId = vehicle.vehicleId;
      trip.vehicleReg = vehicle.vehicleReg;
      trip.created = new Date().toISOString();
      trip.dateStarted = new Date().toISOString();
      trip.routeId = route.routeId;
      trip.routeName = route.name;
      trip.position = dr.position;
      trip.userId = user.userId?? '';
      trip.userName = user.userId != null? `${user.firstName} ${user.lastName}`: '';

      await this.dispatchService.addTrip(trip);
     
      Logger.debug(`${mm} add passenger count 1 ...`);
      const c = new AmbassadorPassengerCount();
      c.passengerCountId = randomUUID();
      c.created = new Date().toISOString();
      c.associationId = vehicle.associationId;
      c.vehicleId = vehicle.vehicleId;
      c.vehicleReg = vehicle.vehicleId;
      c.passengersIn = dr.passengers;
      c.passengersOut = 0;
      c.tripId = trip.tripId;
      c.currentPassengers = c.passengersIn;
      c.routeId = route.routeId;
      c.routeName = route.name;
      c.userId = user.userId;
      c.position = dr.position;
      c.userName = user.userId != null? `${user.firstName} ${user.lastName}`: '';

      await this.ambassadorService.addAmbassadorPassengerCount(c);
     
      Logger.debug(`${mm} ... add commuter cash ...`);

      const p = new CommuterCashPayment();
      p.commuterCashPaymentId = randomUUID();
      p.amount = c.passengersIn * 20;
      p.associationId = vehicle.associationId;
      p.associationName = vehicle.associationName;
      p.created = new Date().toISOString();
      p.tripId = trip.tripId;
      p.mDate = new Date();
      p.position = dr.position;
      p.routeId = route.routeId;
      p.routeName = route.name;
      p.numberOfPassengers = c.passengersIn;
      p.userId = user.userId?? '';
      p.userName = user.userId != null? `${user.firstName} ${user.lastName}`: '';
      p.vehicleId = vehicle.vehicleId;
      p.vehicleReg = vehicle.vehicleReg;

      await this.paymentService.addCommuterCashPayment(p);
      
      Logger.debug(`${mm} ... add passenger count 2...`);
      const c1 = new AmbassadorPassengerCount();
      c1.passengerCountId = randomUUID();
      c1.created = new Date().toISOString();
      c1.associationId = vehicle.associationId;
      c1.vehicleId = vehicle.vehicleId;
      c1.vehicleReg = vehicle.vehicleId;
      c1.passengersOut = c.passengersIn;
      c1.passengersIn = 0;
      c1.tripId = trip.tripId;
      c1.currentPassengers = 0;
      c1.routeId = route.routeId;
      c1.routeName = route.name;
      c1.userId = user.userId?? '';
      c1.position = dr.position;
      c1.userName = user.userId != null? `${user.firstName} ${user.lastName}`: '';

      await this.ambassadorService.addAmbassadorPassengerCount(c1);
      
      Logger.debug(`${mm} ... update Trip...`);

      await this.dispatchService.updateTrip(trip);

      Logger.debug(`${mm} ... add telemetry cash ...`);

      const vh = new VehicleTelemetry();
      const  pos = new Position('Point', [Number(longitude), Number(latitude)]);

      vh.position = pos;
      vh.vehicleId = vehicleId;
      vh.vehicleReg = vehicle.vehicleReg;
      vh.associationId = vehicle.associationId;
      vh.associationName = vehicle.associationName;

      await this.telemetryService.addVehicleTelemetry(vh);
   
      Logger.debug(`${mm} ... add RankFee cash ...`);

      const rf = new RankFeeCashPayment();
      rf.rankFeeCashPaymentId = randomUUID();
      rf.amount = 100.00;
      rf.associationId = vehicle.associationId;
      rf.associationName = vehicle.associationName;
      rf.created = new Date().toISOString();
      rf.mDate = new Date();
      rf.position = dr.position;
      rf.userId = user.userId?? '';
      rf.userName = user.userId != null? `${user.firstName} ${user.lastName}`: '';
      rf.vehicleId = vehicle.vehicleId;
      rf.vehicleReg = vehicle.vehicleReg;

      await this.paymentService.addRankFeeCashPayment(rf);
      

      Logger.debug(`${mm} ... OfficialAppCarDemo complete!`);
      return {
        dispatchRecord: dr,
        trip: trip,
        passengerCount: [c, c1],
        commuterCashPayment: p,
        vehicleTelemetry: vh,
      }
    } catch (e) {
      Logger.error(`${mm} ERROR: ${e}`);
      throw new HttpException(`Demo failed: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }
 getRandomInt(): number {
    const min = 8;
    const max = 16;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
