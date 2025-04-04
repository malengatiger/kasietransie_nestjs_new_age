import { Logger, Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { MyUtils } from "src/my-utils/my-utils";
const tag = "🍎🍎🍎 MongoIndexBuilder 🍎🍎🍎 ";

@Injectable()
export class MongoIndexBuilder {
  public static async createIndexes() {
    const uri = MyUtils.getDatabaseUrl();
    Logger.debug(`${tag} connectToMongoDB: Atlas uri: ${uri}`);
    const client = new MongoClient(uri);
    try {
      await client.connect();
      Logger.log(`${tag} MongoClient connected to MongoDB Atlas`);
      await this.buildIndexes(client);
    } catch (error) {
      Logger.error("Error connecting to MongoDB:", error);
    }
  }

  private static async buildIndexes(client: MongoClient) {
    Logger.debug(`${tag} ...... create MongoDB Atlas indexes .........`);
    const db = client.db("kasie_transie");

    try {
      const collectionI = db.collection("UserGeofenceEvent");
      const resI = await collectionI.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} UserGeofenceEvent spatial index created: ${resI}`);

      const collectionIa = db.collection("CommuterRequest");
      const resIa = await collectionIa.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} CommuterRequest spatial index created: ${resIa}`);

      const collectionIb = db.collection("DispatchRecord");
      const resIb = await collectionIb.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} DispatchRecord spatial index created: ${resIb}`);

      const collectionIc = db.collection("VehicleTelemetry");
      const resIc = await collectionIc.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleTelemetry spatial index created: ${resIc}`);

      const collectionH = db.collection("VehicleVideo");
      const resH = await collectionH.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleVideo spatial index created: ${resH}`);

      const collectionH1 = db.collection("CommuterCashPayment");
      const resH1 = await collectionH1.createIndex({ position: "2dsphere" });
      Logger.debug(
        `${tag} CommuterCashPayment spatial index created: ${resH1}`
      );

      const collectionH2 = db.collection("CommuterProviderPayment");
      const resH2 = await collectionH2.createIndex({ position: "2dsphere" });
      Logger.debug(
        `${tag} CommuterProviderPayment spatial index created: ${resH2}`
      );

      const collectionH3 = db.collection("RankFeeProviderPayment");
      const resH3 = await collectionH3.createIndex({ position: "2dsphere" });
      Logger.debug(
        `${tag} RankFeeProviderPayment spatial index created: ${resH3}`
      );
      const collectionH4 = db.collection("RankFeeCashPayment");
      const resH4 = await collectionH4.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} RankFeeCashPayment spatial index created: ${resH4}`);

      const collectionH5 = db.collection("CommuterCashCheckIn");
      const resH5 = await collectionH5.createIndex({ position: "2dsphere" });
      Logger.debug(
        `${tag} CommuterCashCheckIn spatial index created: ${resH5}`
      );

      const collectionH6 = db.collection("RankFeeCashCheckIn");
      const resH6 = await collectionH6.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} RankFeeCashCheckIn spatial index created: ${resH6}`);

      const collectionH7 = db.collection("VehicleTelemetry");
      const resH7 = await collectionH7.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleTelemetry spatial index created: ${resH7}`);

      const collectionG = db.collection("VehiclePhoto");
      const resG = await collectionG.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehiclePhoto spatial index created: ${resG}`);

      const collectionF = db.collection("VehicleHeartbeat");
      const resF = await collectionF.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleHeartbeat spatial index created: ${resF}`);

      const collectionE = db.collection("VehicleDeparture");
      const resE = await collectionE.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleDeparture spatial index created: ${resE}`);

      const collectionD = db.collection("VehicleArrival");
      const resD = await collectionD.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} VehicleArrival spatial index created: ${resD}`);

      const collectionC = db.collection("RouteLandmark");
      const resC = await collectionC.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} RouteLandmark spatial index created: ${resC}`);

      const collectionB = db.collection("RouteCity");
      const resB = await collectionB.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} RouteCity spatial index created: ${resB}`);

      const collectionA = db.collection("RoutePoint");
      const resA = await collectionA.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} RoutePoint spatial index created: ${resA}`);

      const collection0 = db.collection("City");
      const res0 = await collection0.createIndex({ position: "2dsphere" });
      Logger.debug(`${tag} City spatial index created: ${res0}`);

      const collection1 = db.collection("Association");
      const res1 = await collection1.createIndex(
        { associationName: 1 },
        { unique: true }
      );
      Logger.debug(`${tag} Association unique index created: ${res1}`);

      const collection2 = db.collection("Vehicle");
      const res2 = await collection2.createIndex(
        { vehicleReg: 1 },
        { unique: true }
      );
      Logger.debug(`${tag} Vehicle unique index created: ${res2}`);

      // const collection3 = db.collection("User");
      // const res3 = await collection3.createIndex(
      //   { email: 1 },
      //   { unique: true }
      // );
      // Logger.debug(`${tag} User unique email index created: ${res3}`);

      // const collection4 = db.collection("User");
      // const res4 = await collection4.createIndex(
      //   { cellphone: 1 },
      //   { unique: true }
      // );
      // Logger.debug(`${tag} User unique cellphone index created: ${res4}`);

      const collection5 = db.collection("Route");
      const res5 = await collection5.createIndex(
        { associationId: 1, name: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} Route association/route name unique index created: ${res5}`
      );

      const collection6 = db.collection("Association");
      const res6 = await collection6.createIndex(
        { countryId: 1, associationName: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} Association country/associationName unique index created: ${res6}`
      );

      const collection6a = db.collection("PaymentProvider");
      const res6a = await collection6a.createIndex(
        { countryId: 1, paymentProviderName: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} PaymentProvider country/paymentProviderName unique index created: ${res6a}`
      );

      const collection7 = db.collection("Vehicle");
      const res7 = await collection7.createIndex(
        { associationId: 1, vehicleReg: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} Vehicle association/vehicleReg unique index created: ${res7}`
      );

      const collection8 = db.collection("User");
      const res8 = await collection8.createIndex(
        { associationId: 1, lastName: 1, firstName: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} User association/lastName/firstName unique index created: ${res8}`
      );

      const collection9 = db.collection("User");
      const res9 = await collection9.createIndex(
        { associationId: 1, email: 1 },
        { unique: true }
      );
      Logger.debug(
        `${tag} User association/email unique index created: ${res9}`
      );

      // const collection10 = db.collection("User");
      // const res10 = await collection10.createIndex(
      //   { associationId: 1, cellphone: 1 },
      //   { unique: true }
      // );
      // Logger.debug(`${tag} User association/cellphone unique index created: ${res10}\n\n`);

      Logger.log(
        `${tag} 🌼 🌼 🌼 21 MongoDB Atlas indexes created successfully!  🌼\n\n`
      );
    } catch (error) {
      console.error(`${tag} Error creating indexes:`, error);
    }
  }
}
