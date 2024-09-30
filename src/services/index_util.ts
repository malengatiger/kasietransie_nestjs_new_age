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
