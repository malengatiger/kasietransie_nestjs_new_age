import { Logger, Injectable } from "@nestjs/common";
import { MongoClient } from "mongodb";
const tag = "🍎🍎🍎 MongoIndexBuilder 🍎🍎🍎 ";

@Injectable()
export class MongoIndexBuilder {
  public static async createIndexes() {
    const uri = process.env.REMOTE_DB_URI;
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
      const resI = await collectionI.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} UserGeofenceEvent spatial index created: ${resI}`);

      const collectionH = db.collection("VehicleVideo");
      const resH = await collectionH.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} VehicleVideo spatial index created: ${resH}`);

      const collectionG = db.collection("VehiclePhoto");
      const resG = await collectionG.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} VehiclePhoto spatial index created: ${resG}`);

      const collectionF = db.collection("VehicleHeartbeat");
      const resF = await collectionF.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} VehicleHeartbeat spatial index created: ${resF}`);

      const collectionE = db.collection("VehicleDeparture");
      const resE = await collectionE.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} VehicleDeparture spatial index created: ${resE}`);

      const collectionD = db.collection("VehicleArrival");
      const resD = await collectionD.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} VehicleArrival spatial index created: ${resD}`);
      
      const collectionC = db.collection("RouteLandmark");
      const resC = await collectionC.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} RouteLandmark spatial index created: ${resC}`);
      
      const collectionB = db.collection("RouteCity");
      const resB = await collectionB.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} RouteCity spatial index created: ${resB}`);
      
      const collectionA = db.collection("RoutePoint");
      const resA = await collectionA.createIndex(
        { position: "2dsphere" },
      );
      Logger.debug(`${tag} RoutePoint spatial index created: ${resA}`);

      const collection0 = db.collection("City");
      const res0 = await collection0.createIndex(
        { position: "2dsphere" },
      );
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

      const collection3 = db.collection("User");
      const res3 = await collection3.createIndex(
        { email: 1 },
        { unique: true }
      );
      Logger.debug(`${tag} User unique email index created: ${res3}`);

      const collection4 = db.collection("User");
      const res4 = await collection4.createIndex(
        { cellphone: 1 },
        { unique: true }
      );
      Logger.debug(`${tag} User unique cellphone index created: ${res4}\n\n`);

      Logger.log(`${tag} 🌼 🌼 🌼 4 MongoDB Atlas indexes created successfully!  🌼\n\n`);

    } catch (error) {
      console.error(`${tag} Error creating indexes:`, error);
    }
  }
}
