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
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { MessagingService } from "src/features/fcm/fcm.service";
import { differenceInSeconds, min } from "date-fns";
import { RoutePoint } from "src/data/models/RoutePoint";
import { AssociationToken } from "src/data/models/AssociationToken";
import { KasieError } from "src/data/models/kasie.error";
import { FuelTopUp } from "src/data/models/FuelTopUp";
import { FuelBrand } from "src/data/models/FuelBrand";

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
    private readonly messagingService: MessagingService,

    @InjectModel(FuelBrand.name)
    private fuelBrandModel: mongoose.Model<FuelBrand>,

    @InjectModel(FuelTopUp.name)
    private fuelTopUpdModel: mongoose.Model<FuelTopUp>,

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

    @InjectModel(Association.name)
    private assModel: mongoose.Model<Association>,

    @InjectModel(AssociationToken.name)
    private assTokenModel: mongoose.Model<AssociationToken>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(AmbassadorPassengerCount.name)
    private passengerContModel: mongoose.Model<AmbassadorPassengerCount>,

    @InjectModel(VehicleTelemetry.name)
    private vehicleTelemetryModel: mongoose.Model<VehicleTelemetry>,

    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>,

    @InjectModel(RoutePoint.name)
    private routePointModel: mongoose.Model<RoutePoint>,

    @InjectModel(FuelTopUp.name)
    private fuelTopUpModel: mongoose.Model<FuelTopUp>,

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
  public async startSingleRouteDemo(routeId: string): Promise<any> {
    try {
      // Run all async functions concurrently
      const results = await Promise.all([
        this.startSingleCarDemo(
          routeId,
          "991c6bc4-2535-4f70-b42d-24f1a8c77329",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "17831c17-f367-4895-bc64-5c1bfb93e218",
          "c0f185a8-8cc1-4072-8891-8b2263b4b16c",
          "a5467938-08c3-4166-8e2d-fa9462ae4a67"
        ),

        this.startSingleCarDemo(
          routeId,
          "a3c28460-4ec5-4f67-a7bc-ce2e8b5bb32d",
          "5dbbf76d-340e-4496-a86d-c2803828cf36",
          "d1dc9a25-e783-49ea-815c-2f494ae8f0fe"
        ),

        this.startSingleCarDemo(
          routeId,
          "ca4a9314-180c-45cd-8d80-5c322290e0a2",
          "cc2be701-70ce-45c8-be96-b91645abbd91",
          "7033d07f-7bca-480f-8c3a-5e57c9201ea3"
        ),

        this.startSingleCarDemo(
          routeId,
          "70be2f32-4213-4bac-9e84-8d61bfeaa146",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135",
          "fc321c5a-8aae-477d-b412-d84c40a19f9d"
        ),

        this.startSingleCarDemo(
          routeId,
          "fad1610e-f88d-4b1d-ae1a-688a1ba20c48",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "dd0cb6d4-aaaa-47ac-9f79-14b9925850c2",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "6d0fb4cd-2696-4adb-b09d-2e6ff0d423d6",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "26f10141-f965-487d-9633-1467311f1001",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "6c0bd4dd-52bb-44db-a936-5546713db5a4",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "1ae8c141-013a-4b11-96af-7cd78b4517ec"
        ),

        this.startSingleCarDemo(
          routeId,
          "95aad828-f7a5-4b77-94e5-c8d3fe0d9945",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "3be9914c-1e4e-47eb-be21-4c2fad895392"
        ),

        this.startSingleCarDemo(
          routeId,
          "3833d9af-ed09-4131-b61c-fc458ab05695",
          "b27d00ac-a215-4f01-8938-8d92c99a9b71",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),

        this.startSingleCarDemo(
          routeId,
          "2628ffe0-6aa0-4cc1-ac00-95d152fed951",
          "cc2be701-70ce-45c8-be96-b91645abbd91",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),
        //
        this.startSingleCarDemo(
          routeId,
          "071adcd4-3ff2-4656-93c9-95ce98da4039",
          "41a6e66f-7883-49b7-8f7c-2eb342954cf8",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),

        this.startSingleCarDemo(
          routeId,
          "33878375-3b66-4927-a1c0-4d565d7132ef",
          "cc2be701-70ce-45c8-be96-b91645abbd91",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),

        this.startSingleCarDemo(
          routeId,
          "4a600896-ee15-4e9a-8a64-ba87c24fd052",
          "5dbbf76d-340e-4496-a86d-c2803828cf36",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),

        this.startSingleCarDemo(
          routeId,
          "e7ab6ff1-558b-4ee2-8494-4ee566afde43",
          "c0f185a8-8cc1-4072-8891-8b2263b4b16c",
          "2e4ec3a3-4239-47d5-91cb-4ae449678135"
        ),
      ]);

      Logger.log(
        `\n\n\n ${mm} All car demos completed: ${JSON.stringify(results, null, 2)}`
      );
      return {
        message: "Car Demos done and dusted!",
        results: results,
      };
    } catch (error) {
      Logger.error("One of the functions failed:", error);
      throw new HttpException(
        `ERROR ${error} - One of the functions failed!`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  sortRouteLandmarksByIndex(landmarks: RouteLandmark[]): RouteLandmark[] {
    /**
     * Sorts an array of RouteLandmark objects by their index property in ascending order.
     *
     * @param {RouteLandmark[]} landmarks - The array of RouteLandmark objects to sort.
     * @returns {RouteLandmark[]} A new array containing the sorted RouteLandmark objects.
     * @throws {Error} If the input is not an array or if any element is not a RouteLandmark object
     * with a valid numeric index property.
     */

    if (!Array.isArray(landmarks)) {
      throw new Error("Input must be an array.");
    }

    // Create a copy to avoid modifying the original array
    const sortedLandmarks = [...landmarks];

    sortedLandmarks.sort((a, b) => {
      // Sort by the 'index' property in ascending order
      return a.index - b.index;
    });

    Logger.debug(
      `\n\n${mm} SORTED LANDMARKS, total: ${sortedLandmarks.length}`
    );
    for (const m of sortedLandmarks) {
      Logger.debug(`${mm} index: ${m.index} - ${m.landmarkName}`);
    }
    return sortedLandmarks;
  }

  public async startSingleCarDemo(
    routeId: string,
    vehicleId: string,
    ambassadorId: string,
    marshalId: string,
    associationId?: string
  ): Promise<any> {
    const mm = "🍎 🍎 🍎 startSingleCarDemo 🍎 "; // Assuming mm is defined somewhere
    Logger.debug(
      `\n\n\n\n${mm} starting ............... car: ${vehicleId} \n\n`
    );

    let diff1 = 0;
    let car: Vehicle;
    let dispatches = 0;
    let passengerCountsIn = 0;
    let passengerCountsOut = 0;
    let landmarks = 0;
    let arrivals = 0;
    let cashPayments = 0;
    let trips = 0;
    let telemetry = 0;
    let route: Route;
    let ambassador: User;
    let marshal: User;
    let routeLandmarks: RouteLandmark[];
    let routePoints: RoutePoint[];
    let token: string;
    let cash = 0.0;

    const startTime = Date.now(); // Get the current time in milliseconds

    try {
      Logger.debug(`${mm} associationId: ${associationId}`);

      if (associationId) {
        const tokens: AssociationToken[] = await this.assTokenModel
          .find({ associationId: associationId })
          .sort({ created: 1 });
        Logger.debug(`${mm}  found ${tokens.length} association tokens`);
        if (tokens.length > 0) {
          for (const assToken of tokens) {
            // Access properties of each AssociationToken object
            Logger.debug(`${mm} token: ${assToken.token}`);
            Logger.debug(`${mm} associationId: ${assToken.associationId}`);
            Logger.debug(
              `${mm} startSingleCarDemo: created: ${assToken.created}`
            );

            // You can use the assToken object here to perform any operations.
            // For example, you can send notifications, update records, etc.
            // in this example we want to get the token
            token = assToken.token;

            // If you only need the first token and want to exit after it is found:
            // break;
          }
          Logger.debug(`${mm} 💦💦💦💦💦💦 the token to use: ${token}`);
        } else {
          Logger.warn(
            `${mm} startSingleCarDemo: 👿👿 No association tokens found for associationId: ${associationId}`
          );
        }
      } else {
        Logger.warn(
          `${mm} startSingleCarDemo: 👿👿 No association id supplied`
        );
      }

      if (!token) {
        Logger.error(`${mm} 👿👿👿👿👿👿👿 ... Token has not been found`);
        throw new KasieError("👿👿👿 Token not found", HttpStatus.BAD_REQUEST);
      }

      // Fetch route and related data
      route = await this.routeModel.findOne({ routeId: routeId });
      const ass: Association = await this.assModel.findOne({
        associationId: associationId,
      });

      routePoints = await this.routePointModel
        .find({ routeId: routeId })
        .sort({ index: 1 });
      Logger.debug(`${mm} routePoints: ${routePoints.length} ...`);

      if (!ass.associationName) {
        Logger.error(
          `${mm} association name is null from route: ${route.name}`
        );
        ass.associationName = "Fake Association Name";
      }
      Logger.debug(
        `${mm} association name from route: ${route.associationName}`
      );
      Logger.debug(`${mm} association for demo: ${ass.associationName} ...`);
      Logger.debug(
        `${mm} route for demo: ${route.name} .... routeId: ${route.routeId} \n\n`
      );

      ambassador = await this.userModel.findOne({
        associationId: ass.associationId,
        userId: ambassadorId,
      });
      Logger.debug(
        `${mm} ambassador for demo: ${ambassador.firstName} ${ambassador.lastName} ... ambassadorId: ${ambassador.userId}`
      );

      car = await this.vehicleModel.findOne({ vehicleId: vehicleId }).limit(1);
      Logger.debug(`${mm} vehicle for demo: ${car.vehicleReg} ...`);

      marshal = await this.userModel
        .findOne({
          userId: marshalId,
        })
        .limit(1);
      Logger.debug(
        `${mm} marshal for demo: ${marshal.firstName} ${marshal.lastName} ... marshalId: ${marshal.userId}`
      );

      routeLandmarks = await this.routeLandmarkModel.find({
        routeId: route.routeId,
      });
      Logger.debug(`\n${mm} landmarks for demo: ${routeLandmarks.length} ...`);

      const sortedLandmarks: RouteLandmark[] =
        this.sortRouteLandmarksByIndex(routeLandmarks);

      if (sortedLandmarks.length == 0) {
        Logger.error(`${mm} No landmarks for route: ${route.name}`);
        return `No landmarks found for car: ${car.vehicleId} - route: ${route.name}`;
      }

      for (const landmark of sortedLandmarks) {
        Logger.debug(
          `${mm} route: ${route.name} - index: ${landmark.index} - landmark: ${landmark.landmarkName}`
        );
      }

      // Dispatch and trip logic
      Logger.debug(
        `\n\n\n\n${mm} starting car: adding dispatch record: ${car.vehicleReg} landmark: ${sortedLandmarks[0].landmarkName}...`
      );
      const dr = await this.addDispatch(
        car,
        route,
        sortedLandmarks[0],
        marshal,
        this.getRandomNumber(16)
      );

      await this.messagingService.sendToDevice(
        token,
        "Taxi Dispatch",
        "Dispatch  has been issued",
        `${Constants.dispatchRecord}`,
        `${JSON.stringify(dr)}`
      );

      dispatches++;
      Logger.log(
        `\n${mm} starting car: added dispatch record: ${dr.vehicleReg}`
      );

      const trip: Trip = await this.addTrip(
        dr,
        ambassador.userId,
        `${ambassador.firstName} ${ambassador.lastName}`
      );
      await this.messagingService.sendToDevice(
        token,
        "Trip",
        "Trip has started",
        `${Constants.trips}`,
        `${JSON.stringify(trip)}`
      );

      trips++;
      landmarks++;
      Logger.debug(`${mm} adding original dispatch passenger count ...`);
      const pCount = await this.addPassengerCount(
        route,
        car,
        dr.passengers,
        0,
        dr.passengers,
        ambassador,
        trip.tripId,
        sortedLandmarks[0].position
      );
      await this.messagingService.sendToDevice(
        token,
        "Passenger Count",
        `Passengers ${dr.passengers}`,
        `${Constants.passengerCount}`,
        `${JSON.stringify(pCount)}`
      );
      Logger.debug(`${mm} adding original dispatch commuter cash ...`);

      const pCash = await this.addCommuterCashPayment(
        pCount,
        car,
        trip,
        ambassador
      );
      await this.messagingService.sendToDevice(
        token,
        "Commuter Payment",
        `Payment ${pCash.amount}`,
        `${Constants.commuterCashPayment}`,
        `${JSON.stringify(pCash)}`
      );
      cash += pCash.amount;

      // Sleep before processing landmarks
      Logger.log(`\n\n${mm} Time before sleep: 🔴 ${new Date()}\n`);

      // Generate a random sleep duration between 3 and 5 seconds
      await this.hibernate(2, 4);
      // Process landmarks
      let index = 0;
      const numbers: number[] = [];
      let totalNumberOfPassengers = 0;
      for (const m of sortedLandmarks) {
        let n = this.getRandomNumber(8);
        if (n == 0) {
          n = 4;
        }
        numbers.push(n);
      }
      Logger.debug(`${mm} passengers for landmarks`);

      let cnt = 0;
      for (const m of numbers) {
        Logger.debug(`${mm} number of passengers: ${m}`);
        cnt += m;
      }

      Logger.log(
        `$mm generated passenger numbers: ${numbers} - landmarks: ${sortedLandmarks.length} - passengers for route: ${cnt}`
      );

      const pList: AmbassadorPassengerCount[] = [];
      const cList: CommuterCashPayment[] = [];

      const fuelTopUp = await this.addFuelTopUp(car);
      Logger.debug(
        `${mm} fuelTopUp added: ${fuelTopUp.numberOfLitres} - ${fuelTopUp.amount} `
      );

      for (const mark of sortedLandmarks) {
        Logger.debug(
          `\n\n\n\n${mm} .... starting car: add passenger records: ${car.vehicleReg} landmark: ${mark.landmarkName}...`
        );
        arrivals = await this.handleArrival(car, mark, mm, token, arrivals);
        const currentPassengers = dr.passengers;
        //
        Logger.debug(
          `\n${mm} number of passengersIn for addPassengerCount: ${numbers[index]}`
        );
        ({ passengerCountsIn, totalNumberOfPassengers, cashPayments } =
          await this.countPassengers(
            route,
            car,
            numbers,
            index,
            currentPassengers,
            ambassador,
            trip,
            dr,
            pList,
            token,
            passengerCountsIn,
            totalNumberOfPassengers,
            mark,
            cList,
            cashPayments
          ));

        //
        telemetry = await this.handleTelemetry(car, mark, token, telemetry);
        //let passengers off
        passengerCountsOut = await this.dropPassengersOff(
          index,
          pList,
          route,
          car,
          ambassador,
          trip,
          dr,
          token,
          passengerCountsOut
        );
        index++;
        // Sleep after processing each landmark
        this.hibernate(2, 7);
      }

      trip.dateEnded = new Date().toISOString();
      const res = await this.dispatchService.updateTrip(trip);
      Logger.debug(
        `\n${mm} ..... end the Trip ... update result: ${JSON.stringify(res)}`
      );
      for (const p of cList) {
        cash += p.amount;
      }

      const result = {
        message: `🥬🥬🥬🥬🥬🥬 Demo is complete for car: 🥬 ${car.vehicleReg} on route: 🥬 ${route.name}`,
        date: new Date().toISOString(),
        cashPayments: cashPayments,
        telemetry: telemetry,
        dispatches: dispatches,
        trips: trips,
        arrivals: arrivals,
        topUps: 1,
        totalCash: cash,
        passengersCountIn: passengerCountsIn,
        passengerCountsOut: passengerCountsOut,
        passengers: totalNumberOfPassengers + dr.passengers,
        originalDispatchPassengers: dr.passengers,
        generatedNumbers: numbers,

        vehicleReg: car.vehicleReg,
        vehicleId: vehicleId,
        routeId: route.routeId,
      };
      Logger.log(
        `\n\n${mm} Demo completion; result: ${JSON.stringify(result, null, 2)}\n\n`
      );
      return result;
    } catch (e) {
      Logger.error(`${mm} Error : ${e}`);
      throw new KasieError(`Demo failed: ${e}`, 400);
    }
  }
  private async handleArrival(
    car: Vehicle,
    mark: RouteLandmark,
    mm: string,
    token: string,
    arrivals: number
  ) {
    const arrival = await this.addArrival(car, mark);
    Logger.log(`${mm} arrival, check arrivalId: ${JSON.stringify(arrival)}`);
    await this.messagingService.sendToDevice(
      token,
      "Car Arrival",
      `Car has arrived at ${mark.landmarkName}`,
      `${Constants.vehicleArrival}`,
      `${JSON.stringify(arrival)}`
    );
    arrivals++;
    return arrivals;
  }

  private async dropPassengersOff(
    index: number,
    pList: AmbassadorPassengerCount[],
    route: Route,
    car: Vehicle,
    ambassador: User,
    trip: Trip,
    dr: DispatchRecord,
    token: string,
    passengerCountsOut: number
  ) {
    if (index > 0) {
      const pCount = pList[index - 1];
      const count2 = await this.addPassengerCount(
        route,
        car,
        0,
        pCount.passengersIn,
        0,
        ambassador,
        trip.tripId,
        dr.position
      );

      await this.messagingService.sendToDevice(
        token,
        "Passenger Count",
        `Passengers ${dr.passengers}`,
        `${Constants.passengerCount}`,
        `${JSON.stringify(count2)}`
      );
      passengerCountsOut++;
    }
    return passengerCountsOut;
  }

  private async handleTelemetry(
    car: Vehicle,
    mark: RouteLandmark,
    token: string,
    telemetry: number
  ) {
    const tel = await this.addTelemetry(
      car,
      mark.position!.coordinates[1],
      mark.position!.coordinates[0]
    );
    await this.messagingService.sendToDevice(
      token,
      "Car Telemetry",
      `Car has reported its location `,
      `${Constants.telemetry}`,
      `${JSON.stringify(tel)}`
    );
    telemetry++;
    return telemetry;
  }

  private async countPassengers(
    route: Route,
    car: Vehicle,
    numbers: number[],
    index: number,
    currentPassengers: number,
    ambassador: User,
    trip: Trip,
    dr: DispatchRecord,
    pList: AmbassadorPassengerCount[],
    token: string,
    passengerCountsIn: number,
    totalNumberOfPassengers: number,
    mark: RouteLandmark,
    cList: CommuterCashPayment[],
    cashPayments: number
  ) {
    const count = await this.addPassengerCount(
      route,
      car,
      numbers[index],
      0,
      currentPassengers,
      ambassador,
      trip.tripId,
      dr.position
    );
    pList.push(count);
    await this.messagingService.sendToDevice(
      token,
      "Passenger Count",
      `Passengers ${dr.passengers}`,
      `${Constants.passengerCount}`,
      `${JSON.stringify(count)}`
    );
    passengerCountsIn++;
    totalNumberOfPassengers += count.passengersIn;

    //
    const payment = await this.addCommuterCashPayment(
      count,
      car,
      trip,
      ambassador
    );
    await this.messagingService.sendToDevice(
      token,
      "Commuter Cash",
      `Cash Payment of ${JSON.stringify(payment)} at ${mark.landmarkName}`,
      `${Constants.commuterCashPayment}`,
      `${JSON.stringify(payment)}`
    );
    cList.push(payment);
    cashPayments++;
    return { passengerCountsIn, totalNumberOfPassengers, cashPayments };
  }

  private async hibernate(min: number, max: number) {
    const minSleep = min; // Minimum sleep duration in seconds
    const maxSleep = max; // Maximum sleep duration in seconds
    const sleepDuration =
      Math.floor(Math.random() * (maxSleep - minSleep + 1)) + minSleep;

    // Sleep for the generated duration
    Logger.log(
      `hibernate: Time to sleep ${sleepDuration} seconds, min: ${min} max: ${max} 🔴 ${new Date()}\n\n`
    );
    await this.sleep(sleepDuration * 1000); // Ensure sleep is in milliseconds
  }

  getRandomNumbersThatSumToTarget(
    target: number,
    count: number = 3,
    min: number = 1,
    max: number = target
  ): number[] {
    // Validate input parameters
    if (target < count) {
      throw new Error(
        "Target number must be greater than or equal to the count."
      );
    }

    if (min > max) {
      throw new Error("Min value should be less than max.");
    }

    if (count <= 0 || !Number.isInteger(count)) {
      throw new Error("Count should be a positive integer.");
    }

    if (min < 0 || !Number.isInteger(min)) {
      throw new Error("Min should be a positive integer.");
    }

    if (max < 0 || !Number.isInteger(max)) {
      throw new Error("Max should be a positive integer.");
    }

    const numbers: number[] = [];
    let remainingSum = target;

    for (let i = 0; i < count - 1; i++) {
      // Calculate the maximum possible value for the current number
      const maxVal = Math.min(max, remainingSum - (count - i - 1) * min);
      if (maxVal < min) {
        throw new Error(
          `Error: unable to generate random numbers with given params: count: ${count} target: ${target} min: ${min} max: ${max}`
        );
      }
      // Generate a random number between min and maxVal
      const randomNumber = Math.floor(Math.random() * (maxVal - min + 1)) + min;
      numbers.push(randomNumber);
      remainingSum -= randomNumber;
    }

    // Ensure the last number is within the min and max range
    if (remainingSum < min || remainingSum > max) {
      throw new Error(
        `Error: unable to generate random numbers with given params: count: ${count} target: ${target} min: ${min} max: ${max}`
      );
    }
    numbers.push(remainingSum);

    // Log the result
    console.log(
      `Generated random numbers: ${JSON.stringify(numbers)} that sum to ${target}`
    );
    return numbers;
  }
  calculateDifferenceInSeconds(
    date1: Date | string,
    date2: Date | string
  ): number {
    /**
     * Calculates the difference in seconds between two dates.
     *
     * @param {Date | string} date1 - The first date (can be a Date object or an ISO 8601 string).
     * @param {Date | string} date2 - The second date (can be a Date object or an ISO 8601 string).
     * @returns {number} The difference in seconds between the two dates.
     * @throws {TypeError} If either date1 or date2 is invalid.
     */

    let d1: Date;
    let d2: Date;

    try {
      // Convert input to Date objects if they are strings
      d1 = typeof date1 === "string" ? new Date(date1) : date1;
      d2 = typeof date2 === "string" ? new Date(date2) : date2;

      // Check for invalid Date objects after conversion
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new TypeError("Invalid date provided");
      }
    } catch (error) {
      throw new TypeError(`Invalid date provided: ${error}`);
    }

    return differenceInSeconds(d2, d1);
  }
  getRandomSleep() {
    let time = Math.random();
  }
  splitNumberIntoThree(num: number): number[] {
    if (num < 3) {
      throw new Error("Number must be at least 3 to split into 3 parts.");
    }

    // Generate two random numbers
    const num1 = Math.floor(Math.random() * (num - 2)) + 1; // Ensure at least 1 is left for the other two numbers
    const num2 = Math.floor(Math.random() * (num - num1 - 1)) + 1; // Ensure at least 1 is left for the third number

    // Calculate the third number
    const num3 = num - num1 - num2;

    const res = [num1, num2, num3];
    Logger.log(`${mm} number split into: ${res}`);

    return res;
  }

  
  private async addFuelTopUp(car: Vehicle): Promise<FuelTopUp> {
    Logger.debug(`${mm} adding fuel topUp ${car.vehicleReg} ...`);

    const randomLitres = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    const price = 12.5;
    const amount = randomLitres * price;

    const fuelBrands = await this.fuelBrandModel.find({});
    if (!fuelBrands || fuelBrands.length === 0) {
      return null; // Return null if the array is empty or undefined
    }

    const randomIndex = Math.floor(Math.random() * fuelBrands.length);
    const brand = fuelBrands[randomIndex];

    const f = new FuelTopUp();
    f.fuelTopUpId = randomUUID();
    f.fuelBrandId = brand.fuelBrandId;
    f.brandName = brand.brandName;
    f.associationId = car.associationId;
    f.associationName = car.associationName;
    f.created = new Date().toISOString();
    f.numberOfLitres = randomLitres;
    f.amount = amount;
    f.vehicleId = car.vehicleId;
    f.vehicleReg = car.vehicleReg;

    var res = await this.vehicleService.addFuelTopUp(f);
    Logger.debug(`${mm} My FUCKING topUp added, check vehicleId: ${JSON.stringify(res,null,2)}`);
    return f;
  }
  private async addArrival(
    car: Vehicle,
    landmark: RouteLandmark
  ): Promise<VehicleArrival> {
    Logger.debug(`${mm} add car arrival ${car.vehicleReg} ...`);
    Logger.debug(
      `${mm} addArrival landmark: ${landmark.landmarkName}; in car: ${car.vehicleReg} pos: ${landmark.position.coordinates}...`
    );
    const c = new VehicleArrival();

    c.vehicleArrivalId = randomUUID();
    c.vehicleId = car.vehicleId;
    c.vehicleReg = car.vehicleReg;
    c.associationId = car.associationId;
    c.associationName = car.associationName;
    c.landmarkId = landmark.landmarkId;
    c.landmarkName = landmark.landmarkName;
    c.created = new Date().toISOString();
    c.make = car.make;
    c.model = car.model;
    c.routeId = landmark.routeId;
    c.routeName = landmark.routeName;
    c.position = landmark.position;

    await this.dispatchService.addVehicleArrival(c);

    return c;
  }
  private async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private async addDispatch(
    car: Vehicle,
    route: Route,
    landmark: RouteLandmark,
    marshal: User,
    passengers: number
  ) {
    Logger.log(
      `\n\n${mm} add addDispatch ... marshal: ${marshal.firstName}  ${marshal.lastName} at ${landmark.landmarkName}\n`
    );

    const dr = new DispatchRecord();
    dr.vehicleId = car.vehicleId;
    dr.vehicleReg = car.vehicleReg;
    dr.dispatchRecordId = randomUUID();
    dr.associationId = route.associationId;
    dr.associationName = route.associationName;
    dr.ownerId = car.ownerId;
    (dr.passengers = passengers), (dr.mDate = new Date());
    dr.created = new Date().toISOString();
    dr.routeName = route.name;
    dr.routeId = route.routeId;
    dr.position = landmark.position;
    dr.marshalId = marshal.userId;
    dr.landmarkName = landmark.landmarkName;
    dr.landmarkId = landmark.landmarkId;
    dr.routeLandmarkId = landmark.landmarkId;
    dr.marshalName = `${marshal.firstName} ${marshal.lastName}`;

    await this.dispatchService.addDispatchRecord(dr);

    return dr;
  }

  private async addTrip(dr: DispatchRecord, userId: string, userName: string) {
    Logger.debug(
      `${mm} addTrip route: ${dr.routeId} ${dr.routeName}; in car: ${dr.vehicleReg} ...`
    );
    const trip = new Trip();
    trip.tripId = randomUUID();
    trip.associationId = dr.associationId;
    trip.associationName = dr.associationName;
    trip.vehicleId = dr.vehicleId;
    trip.vehicleReg = dr.vehicleReg;
    trip.created = new Date().toISOString();
    trip.dateStarted = new Date().toISOString();
    trip.routeId = dr.routeId;
    trip.routeName = dr.routeName;
    trip.position = dr.position;

    trip.userId = userId;
    trip.userName = userName;

    await this.dispatchService.addTrip(trip);
    return trip;
  }

  private async addPassengerCount(
    route: Route,
    car: Vehicle,
    passengersIn: number,
    passengersOut: number,
    currentPassengers: number,
    amb: User,
    tripId: string,
    position: Position
  ): Promise<AmbassadorPassengerCount> {
    //
    Logger.debug(
      `${mm} add passenger count: passengersIn: ${passengersIn} in currentPassengers: ${currentPassengers} ...`
    );
    Logger.debug(
      `${mm} route: ${route.name}   ${route.routeId}, in car: ${car.vehicleReg} ...`
    );
    const c = new AmbassadorPassengerCount();
    c.passengerCountId = randomUUID();
    c.created = new Date().toISOString();
    c.associationId = car.associationId;
    c.vehicleId = car.vehicleId;
    c.vehicleReg = car.vehicleReg;
    c.passengersIn = passengersIn;
    c.passengersOut = passengersOut;
    c.tripId = tripId;
    c.currentPassengers = currentPassengers;
    c.routeId = route.routeId;
    c.routeName = route.name;
    c.userId = amb.userId;
    c.position = position;
    c.userName = amb.userId != null ? `${amb.firstName} ${amb.lastName}` : "";

    await this.ambassadorService.addAmbassadorPassengerCount(c);
    return c;
  }

  private async removePassengerCount(
    route: Route,
    car: Vehicle,
    passengersIn: number,
    passengersOut: number,
    currentPassengers: number,
    amb: User,
    tripId: string,
    position: Position
  ): Promise<AmbassadorPassengerCount> {
    //
    Logger.debug(
      `${mm} add passenger count: passengersIn: ${passengersIn} in currentPassengers: ${currentPassengers} ...`
    );
    Logger.debug(
      `${mm} route: ${route.name}   ${route.routeId}, in car: ${car.vehicleReg} ...`
    );
    const c = new AmbassadorPassengerCount();
    c.passengerCountId = randomUUID();
    c.created = new Date().toISOString();
    c.associationId = car.associationId;
    c.vehicleId = car.vehicleId;
    c.vehicleReg = car.vehicleReg;
    c.passengersIn = passengersIn;
    c.passengersOut = passengersOut;
    c.tripId = tripId;
    c.currentPassengers = currentPassengers;
    c.routeId = route.routeId;
    c.routeName = route.name;
    c.userId = amb.userId;
    c.position = position;
    c.userName = amb.userId != null ? `${amb.firstName} ${amb.lastName}` : "";

    await this.ambassadorService.addAmbassadorPassengerCount(c);
    return c;
  }
  private async addCommuterCashPayment(
    c: AmbassadorPassengerCount,
    car: Vehicle,
    trip: Trip,
    user: User
  ) {
    Logger.debug(`${mm} ... add commuter cash ...`);
    Logger.debug(
      `${mm} addCommuterCashPayment route: ${c.routeName}  ${c.routeId} in car: ${car.vehicleReg} ...`
    );
    const price = 20.0;

    const p = new CommuterCashPayment();
    p.commuterCashPaymentId = randomUUID();
    p.amount = c.passengersIn * price;
    p.associationId = car.associationId;
    p.associationName = car.associationName;
    p.created = new Date().toISOString();
    p.tripId = trip.tripId;
    p.mDate = new Date();
    p.position = trip.position;
    p.routeId = trip.routeId;
    p.routeName = trip.routeName;
    p.numberOfPassengers = c.passengersIn;
    p.userId = user.userId ?? "";
    p.userName =
      user.userId != null ? `${user.firstName} ${user.lastName}` : "";
    p.vehicleId = car.vehicleId;
    p.vehicleReg = car.vehicleReg;

    await this.paymentService.addCommuterCashPayment(p);
    Logger.debug(`${mm} ... added commuter cash: payment: ${p.amount} ...`);

    return p;
  }
  private async addTelemetry(
    car: Vehicle,
    latitude: number,
    longitude: number
  ): Promise<VehicleTelemetry> {
    Logger.debug(`${mm} ... add telemetry ...`);
    Logger.debug(`${mm} addTelemetry in car: ${car.vehicleReg} ...`);
    const vh = new VehicleTelemetry();
    const pos = new Position("Point", [Number(longitude), Number(latitude)]);

    vh.position = pos;
    vh.vehicleId = car.vehicleId;
    vh.vehicleReg = car.vehicleReg;
    vh.associationId = car.associationId;
    vh.associationName = car.associationName;
    vh.created = new Date().toISOString();
    vh.make = car.make;
    vh.model = car.model;
    vh.accuracy = 0;
    vh.speed = 0;
    vh.speedAccuracy = 0;

    await this.telemetryService.addVehicleTelemetry(vh);
    return vh;
  }

  getThreeNumbers(number: number): number[] {
    const num1 = this.getRandomInt();
    const num2 = this.getRandomInt();
    const num3 = this.getRandomInt();
    const list = [num1, num2, num3];

    Logger.log(`${mm} returning numbers: ${list}`);
    return [this.getRandomInt(), this.getRandomInt(), this.getRandomInt()];
  }

  isInt(value: any): boolean {
    /**
     * Checks if a given value is an integer.
     *
     * @param {any} value - The value to check.
     * @returns {boolean} True if the value is an integer, false otherwise.
     */
    return typeof value === "number" && Number.isInteger(value);
  }
  getRandomNumber(limit: number): number {
    const num = Math.floor(Math.random() * limit);
    if (num == 0) {
      return 2;
    }
    return num;
  }

  public async startOfficialAppCarDemo(
    carId: string,
    routeId: string,
    userId: string,
    latitude: number,
    longitude: number
  ): Promise<any> {
    Logger.log(`\n\n${mm} ... startOfficialAppCarDemo ... `);

    try {
      const vehicle = await this.vehicleModel.findOne({ vehicleId: carId });
      const route = await this.routeModel.findOne({ routeId: routeId });
      const user = await this.userModel.findOne({ userId: userId });

      if (!vehicle) {
        Logger.error(`${mm} ERROR: vehicle not found`);
        throw new HttpException(
          `Demo failed: car not found`,
          HttpStatus.BAD_REQUEST
        );
      }
      if (!route) {
        Logger.error(`${mm} ERROR: route not found`);
        throw new HttpException(
          `Demo failed: route not found`,
          HttpStatus.BAD_REQUEST
        );
      }
      if (!user) {
        Logger.error(`${mm} ERROR: user not found`);
        throw new HttpException(
          `Demo failed: user not found`,
          HttpStatus.BAD_REQUEST
        );
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
      trip.userId = user.userId ?? "";
      trip.userName =
        user.userId != null ? `${user.firstName} ${user.lastName}` : "";

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
      c.userName =
        user.userId != null ? `${user.firstName} ${user.lastName}` : "";

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
      p.userId = user.userId ?? "";
      p.userName =
        user.userId != null ? `${user.firstName} ${user.lastName}` : "";
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
      c1.userId = user.userId ?? "";
      c1.position = dr.position;
      c1.userName =
        user.userId != null ? `${user.firstName} ${user.lastName}` : "";

      await this.ambassadorService.addAmbassadorPassengerCount(c1);

      Logger.debug(`${mm} ... update Trip...`);

      await this.dispatchService.updateTrip(trip);

      Logger.debug(`${mm} ... add telemetry cash ...`);

      const vh = new VehicleTelemetry();
      const pos = new Position("Point", [Number(longitude), Number(latitude)]);

      vh.position = pos;
      vh.vehicleId = vehicle.vehicleId;
      vh.vehicleReg = vehicle.vehicleReg;
      vh.associationId = vehicle.associationId;
      vh.associationName = vehicle.associationName;

      await this.telemetryService.addVehicleTelemetry(vh);

      Logger.debug(`${mm} ... add RankFee cash ...`);

      const rf = new RankFeeCashPayment();
      rf.rankFeeCashPaymentId = randomUUID();
      rf.amount = 100.0;
      rf.associationId = vehicle.associationId;
      rf.associationName = vehicle.associationName;
      rf.created = new Date().toISOString();
      rf.mDate = new Date();
      rf.position = dr.position;
      rf.userId = user.userId ?? "";
      rf.userName =
        user.userId != null ? `${user.firstName} ${user.lastName}` : "";
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
      };
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
