import { MyUtils } from 'src/my-utils/my-utils';

import { MongoClient, ServerApiVersion } from 'mongodb';
import { Injectable, Logger } from '@nestjs/common';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const mm = '🍎🍎🍎 AssociationService: 🍎🍎🍎';

@Injectable()
export class NewMongoService {
  constructor() {
    this.connect();
  }

  async connect() {
    await this.client.connect();
    Logger.log(
      `🍎🍎🍎🍎🍎 MongoClient connected to ${MyUtils.getDatabaseUrl()}`,
    );
  }
  async find(name: string, query: any = {}, limit?: number): Promise<any[]> {
    // const database = this.client.db('kasie_transie');
    const collection = this.db.collection(name);
    let data: any[];
    if (limit) {
      data = await collection.find(query).limit(limit).toArray();
    } else {
      data = await collection.find(query).toArray();
    }
    console.log(data);
    return data;
  }
  async create(name: string, data: any): Promise<any> {
    // const database = this.client.db('kasie_transie');
    const collection = this.db.collection(name);
    const result = await collection.insertOne(data);
    console.log(result);
    return result.insertedId;
  }
  async delete(name: string, query: any): Promise<any> {
    // const database = this.client.db('kasie_transie');
    const collection = this.db.collection(name);
    const result = await collection.deleteOne(query);
    console.log(result);
    return result.deletedCount;
  }
  client = new MongoClient(MyUtils.getDatabaseUrl(), {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  db = this.client.db('kasie_transie');
}
// export async function pingDatabase() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db('kasie_transie').command({ ping: 1 });
//     console.log(
//       ` 💖💖💖 Pinged my MongoDB Atlas deployment.  🥦🥦 I am successfully connected to MongoDB!\n${uri}`,
//     );
//     const database = client.db('kasie_transie');
//     const collection = database.collection('Association');
//     const countries = await collection.find({}).toArray();
//     console.log(countries);
//   } catch (error) {
//     console.error(error);
//     await client.close();
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
