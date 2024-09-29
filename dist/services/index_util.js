"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoIndexBuilder = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const tag = "🍎🍎🍎 MongoIndexBuilder 🍎🍎🍎 ";
let MongoIndexBuilder = class MongoIndexBuilder {
    static async createIndexes() {
        const uri = process.env.REMOTE_DB_URI;
        common_1.Logger.debug(`${tag} connectToMongoDB: Atlas uri: ${uri}`);
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            console.log(`${tag} Connected to MongoDB`);
            this.buildIndexes(client);
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }
    static async buildIndexes(client) {
        common_1.Logger.debug(`${tag} ...... create MongoDB Atlas indexes .........`);
        const db = client.db("kasie_transie");
        try {
            const collection1 = db.collection("Association");
            const res1 = await collection1.createIndex({ associationName: 1 }, { unique: true });
            common_1.Logger.debug(`${tag} Association unique index created: ${res1}`);
            const collection2 = db.collection("Vehicle");
            const res2 = await collection2.createIndex({ vehicleReg: 1 }, { unique: true });
            common_1.Logger.debug(`${tag} Vehicle unique index created: ${res2}`);
            const collection3 = db.collection("User");
            const res3 = await collection3.createIndex({ email: 1 }, { unique: true });
            common_1.Logger.debug(`${tag} User unique email index created: ${res3}`);
            const collection4 = db.collection("User");
            const res4 = await collection4.createIndex({ cellphone: 1 }, { unique: true });
            common_1.Logger.debug(`${tag} User unique cellphone index created: ${res4}\n\n`);
            common_1.Logger.log(`${tag} 🌼 🌼 🌼 4 MongoDB Atlas indexes created successfully!  🌼\n\n`);
        }
        catch (error) {
            console.error(`${tag} Error creating indexes:`, error);
        }
    }
};
exports.MongoIndexBuilder = MongoIndexBuilder;
exports.MongoIndexBuilder = MongoIndexBuilder = __decorate([
    (0, common_1.Injectable)()
], MongoIndexBuilder);
//# sourceMappingURL=index_util.js.map