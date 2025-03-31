import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { CreatePubSubDto } from "./dto/create-pub-sub.dto";
import { UpdatePubSubDto } from "./dto/update-pub-sub.dto";
import mongoose from "mongoose";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { AppError } from "src/data/models/AppError";
import { Association } from "src/data/models/Association";
import { AssociationToken } from "src/data/models/AssociationToken";
import { Commuter } from "src/data/models/Commuter";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { Country } from "src/data/models/Country";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { ExampleFile } from "src/data/models/ExampleFile";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { Route } from "src/data/models/Route";
import { SettingsModel } from "src/data/models/SettingsModel";
import { Trip } from "src/data/models/Trip";
import { User } from "src/data/models/User";
import { Vehicle } from "src/data/models/Vehicle";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import { InjectModel } from "@nestjs/mongoose";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { isValid, parseISO } from "date-fns";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import startOfQuarter from "date-fns/startOfQuarter";
import { de } from "date-fns/locale";
import { FuelTopUp } from "src/data/models/FuelTopUp";
import { VehicleService } from "src/features/vehicle/vehicle.service";

const mm = "🦚🦚🦚🦚 PubSubService 🦚🦚 ";

@Injectable()
export class PubSubService {
  constructor(
    private readonly carService: VehicleService,

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

    @InjectModel(FuelTopUp.name)
    private fuelTopUpModel: mongoose.Model<FuelTopUp>,

    @InjectModel(VehicleArrival.name)
    private vehicleArrivalModel: mongoose.Model<VehicleArrival>
  ) {}
  async createAssociationData(
    associationId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    //read database and create output to pubSub
    //write to pubSub
    Logger.debug(
      `${mm} createAssociationData: associationId: ${associationId} 🌺🌺🌺🌺`
    );
    return "🌺 This action adds AssociationData for pubSub";
  }
  async createAssociationTelemetryData(
    associationId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    Logger.debug(
      `${mm} 🥦 createAssociationTelemetryData: associationId: ${associationId}  🥦🥦🥦🥦 `
    );

    return "🥦 This action adds Association TelemetryData for pubSub";
  }
  async createAllTelemetryData(
    startDate: string,
    endDate?: string
  ): Promise<any> {
    Logger.debug(
      `${mm} 🔶 create all TelemetryData for external consumption: startDate: ${startDate} endDate: ${endDate} 🔶🔶🔶🔶`
    );

    return " 🔶 This action adds All TelemetryData for pubSub";
  }

  async createCarSummary(
    vehicleId: string,
    startDate?: string,
    endDate?: string
  ): Promise<CarSummaryRecord> {
    //read database and create output to pubSub
    //write to pubSub
    let payments = 0;
    let passengers = 0;
    let totalCash = 0.0;
    let totalTrips = 0;
    let topUps = 0;
    let totalAmount = 0.0;
    try {
      let car: Vehicle;
      const cars = await this.vehicleModel
        .find({ vehicleId: vehicleId })
        .limit(1);
      if (cars.length > 0) {
        car = cars[0];
      }
      Logger.debug(
        `\n\n\n${mm} 🔵 createCarSummary: vehicleId: ${vehicleId} 🔵🔵🔵🔵 ${car.vehicleReg} `
      );
      //get trips within period or get all trips
      let trips: Trip[] = [];

      if (startDate && endDate) {
        if (!this.validateDate(startDate)) {
          Logger.error(`${mm} invalid startDate: ${startDate}`);
          throw new Error("invalid startDate");
        }
        if (!this.validateDate(endDate)) {
          Logger.error(`${mm} invalid endDate: ${endDate}`);
          throw new Error("invalid endDate");
        }
      }

      trips = await this.tripModel.find({
        created: { $gte: startDate, $lte: endDate },
        vehicleId: vehicleId,
      });
      Logger.debug(`${mm} vehicle trips found : ${trips.length}`);

      const dispatches = await this.dispatchRecordModel.find({
        created: { $gte: startDate, $lte: endDate },
        vehicleId: vehicleId,
      });

      Logger.log(
        `${mm} check keys, vehicleId : 2e7aff49-1589-45f7-b06e-51cd105d4588 startDate: 2025-02-01T00:00 endDate: 2025-03-30T23:59`
      );
      Logger.debug(
        `${mm} createCarSummary: car topUps search, vehicleId : ${vehicleId} startDate: ${startDate} endDate: ${endDate}`
      );
      
      //vehicleId: 2e7aff49-1589-45f7-b06e-51cd105d4588
      //startDate: 2025-02-01T00:00
      //endDate: 2025-03-30T23:59
      ///////////
      const mTopUps = await this.carService.getCarFuelTopUps(
        vehicleId,
        startDate,
        endDate
      );
      Logger.debug(`${mm} ... car topUps found : ${mTopUps.length}`);
      for (const t of mTopUps) {
        totalAmount += t.amount;
        Logger.log(`${mm} FUEL TOPUP: ${JSON.stringify(t, null, 2)}`);
      }

      //for each trip get commuterCash payments
      for (const trip of trips) {
        Logger.log(
          `${mm} trip: created : ${trip.created} - route: ${trip.routeName} created: ${trip.created}`
        );
        const commuterPayments: CommuterCashPayment[] =
          await this.commuterCashPaymentModel.find({ tripId: trip.tripId });
        Logger.log(
          `${mm} commuterPayments found : ${commuterPayments.length} - route: ${trip.routeName} created: ${trip.created}`
        );
        payments += commuterPayments.length;
        for (const commuterPayment of commuterPayments) {
          totalCash += commuterPayment.amount;
          passengers += commuterPayment.numberOfPassengers;
        }
        Logger.debug(
          `${mm} totalCash : ${totalCash} passengers: ${passengers} payments: ${payments}`
        );

        const map: Map<string, number> = new Map<string, number>();
        const arrivals: VehicleArrival[] = await this.vehicleArrivalModel.find({
          created: { $gte: startDate, $lte: endDate },
          vehicleId: vehicleId,
        });

        Logger.debug(`${mm} arrivals found: ${arrivals.length}`);

        let carLandmarks: CarLandmark[] = [];
        for (const arrival of arrivals) {
          if (map.has(arrival.landmarkName.trim())) {
            let num = map.get(arrival.landmarkName.trim());
            num++;
            map.set(arrival.landmarkName.trim(), num);
          } else {
            map.set(arrival.landmarkName.trim(), 1);
          }
        }

        Logger.debug(
          `\n\n${mm} ........ map created : ${map.values.toString()}\n\n`
        );

        for (const val of map) {
          const mark: CarLandmark = {
            landmarkName: val[0].trim(),
            number: val[1],
          };

          carLandmarks.push(mark);
        }
        Logger.debug(
          `\n${mm} total carLandmarks created : ${carLandmarks.length}\n`
        );

        const list: VehicleTelemetry[] = await this.vehicleTelemetryModel.find({
          created: { $gte: startDate, $lte: endDate },
          vehicleId: vehicleId,
        });

        Logger.debug(
          `\n\n${mm} VehicleTelemetry records found : ${list.length}\n`
        );
        Logger.debug(
          `\n\n${mm} 🥬 Car Summary completed! 🥬🥬🥬 ... return CarSummaryRecord ....\n\n`
        );

        return {
          title: `Car Summary: ${car.vehicleReg}`,
          vehicleId: vehicleId,
          telemetry: list.length,
          carLandmarks: carLandmarks,
          passengers: passengers,
          payments: payments,
          totalCash: totalCash,
          date: new Date().toISOString(),
          car: car,
          startDate: startDate,
          endDate: endDate,
          trips: trips.length,
          arrivals: arrivals.length,
          dispatches: dispatches.length,
          topUps: mTopUps.length,
          topUpAmount: totalAmount,
        };
      }
    } catch (e) {
      Logger.error(`${mm} 😈😈😈😈😈 ${e}`);
      throw new HttpException(
        `${mm} 😈😈 Car Summary Error`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async validateDate(date: string) {
    /**
     * Validates if date is a valid date in ISO 8601 format.
     *
     * @param {string} date - The date string to validate.
     * @returns {boolean} True if the date string is valid, false otherwise.
     */
    if (!date) {
      return false;
    }
    const parsedDate = parseISO(date);
    return isValid(parsedDate);
  }
  async createAssociationCarSummary(
    associationId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AssociationCarSummary> {
    //get all association trips within period
    Logger.debug(
      `${mm} 🍐createAssociationCarSummary: associationId: ${associationId} 🍐🍐🍐🍐 startDate: ${startDate} endDate: ${endDate}`
    );
    let topUps = 0;
    let totalAmount = 0.0;

    try {
      const cars: Vehicle[] = await this.vehicleModel.find({
        associationId: associationId,
      });
      let ass: Association;
      let list = await this.associationModel
        .find({ associationId: associationId })
        .limit(1);
      if (list.length > 0) {
        ass = list[0];
        Logger.debug(
          `${mm} 🍐createAssociationCarSummary: associationId: ${ass.associationName} 🍐🍐🍐🍐 startDate: ${startDate} endDate: ${endDate}`
        );
      }
      let associationsTrips: Trip[] = [];
      if (startDate && endDate) {
        {
          associationsTrips = await this.tripModel.find({
            associationId: associationId,
            created: { $gte: startDate, $lte: endDate },
          });
        }
      } else {
        associationsTrips = await this.tripModel.find({
          associationId: associationId,
        });
      }
      //for each trip call createCarSummary
      const carSummaries: CarSummaryRecord[] = [];
      for (const trip of associationsTrips) {
        const carSummary = await this.createCarSummary(
          trip.vehicleId,
          startDate,
          endDate
        );
        carSummaries.push(carSummary);
      }
      //create association summary
      let payments = 0;
      let passengers = 0;
      let totalCash = 0.0;
      let telemetry = 0;
      let carLandmarks = 0;
      let trips = 0;
      let dispatches = 0;

      for (const s of carSummaries) {
        payments += s.payments;
        passengers += s.passengers;
        telemetry += s.telemetry;
        carLandmarks += s.carLandmarks.length;
        passengers += s.passengers;
        totalCash += s.totalCash;
        startDate = startDate;
        endDate = endDate;
        trips = s.trips;
        payments += s.payments;
        dispatches += s.dispatches;
        topUps += s.topUps;
        totalAmount += s.topUpAmount;
      }
      Logger.debug(
        `${mm} 🍐createAssociationCarSummary: associationId: ${associationId} 🍐🍐🍐🍐 startDate: ${startDate} endDate: ${endDate}`
      );

      return {
        title: `Association Car Summary: ${ass.associationName}`,
        associationId: associationId,
        associationName: ass.associationId,
        telemetry: telemetry,
        carLandmarks: carLandmarks,
        passengers: passengers,
        totalCash: totalCash,
        date: new Date().toISOString(),
        startDate: startDate,
        endDate: endDate,
        trips: trips,
        payments: payments,
        carSummaries: carSummaries,
        cars: cars.length,
        dispatches: dispatches,
        topUps: topUps,
        topUpAmount: totalAmount,
      };
    } catch (e) {
      Logger.error(`${mm} 😈😈😈😈😈 ${e}`);
      throw new HttpException(
        `${mm} Association Car Summary Error: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async fixFuel(): Promise<any> {
    const res = [];
    const list = await this.fuelTopUpModel.find({});
    for (const ft of list) {
      ft.created = new Date(Date.parse(ft.createdAt)).toISOString();
      if (!ft.amount) {
        ft.amount = 100.0;
      }
      const car = await this.vehicleModel.findOne({
        vehicleReg: ft.vehicleReg,
      });
      if (car) {
        ft.vehicleId = car.vehicleId;
        ft.vehicleReg = car.vehicleReg;

        const result = await this.fuelTopUpModel.updateOne(
          {fuelTopUpId: ft.fuelTopUpId},
          ft
        );
        const msg = `${mm} FuelTopUp: ${ft.fuelTopUpId} -  vehicleId: ${ft.vehicleId} 👽👽👽 amount: ${ft.amount} - created: ${ft.created}`;
        Logger.debug(msg);
        Logger.debug(`${mm} 🗳 🗳 🗳 update result: ${JSON.stringify(result,null,2)}`);
        res.push(msg);
      }
    }
    return res;
  }
}

export interface CarLandmark {
  landmarkName: string;
  number: number;
}

export interface CarSummaryRecord {
  title: string;
  vehicleId: string;
  telemetry: number;
  carLandmarks: CarLandmark[];
  passengers: number;
  totalCash: number;
  date: string;
  car: Vehicle;
  startDate: string;
  endDate: string;
  trips: number;
  payments: number;
  arrivals: number;
  dispatches: number;
  topUps: number;
  topUpAmount: number;
}

export interface AssociationCarSummary {
  title: string;
  associationId: string;
  associationName: string;
  telemetry: number;
  carLandmarks: number;
  passengers: number;
  totalCash: number;
  date: string;
  startDate: string;
  endDate: string;
  trips: number;
  cars: number;
  payments: number;
  carSummaries: CarSummaryRecord[];
  dispatches: number;
  topUps: number;
  topUpAmount: number;
}
