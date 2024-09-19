"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewMongoService = void 0;
const my_utils_1 = require("../my-utils/my-utils");
const mongodb_1 = require("mongodb");
const common_1 = require("@nestjs/common");
const mm = '🍎🍎🍎 AssociationService: 🍎🍎🍎';
let NewMongoService = class NewMongoService {
    constructor() {
        this.client = new mongodb_1.MongoClient(my_utils_1.MyUtils.getDatabaseUrl(), {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        this.db = this.client.db('kasie_transie');
        this.connect();
    }
    async connect() {
        await this.client.connect();
        common_1.Logger.log(`🍎🍎🍎🍎🍎 MongoClient connected to ${my_utils_1.MyUtils.getDatabaseUrl()}`);
    }
    async find(name, query = {}, limit) {
        const collection = this.db.collection(name);
        let data;
        if (limit) {
            data = await collection.find(query).limit(limit).toArray();
        }
        else {
            data = await collection.find(query).toArray();
        }
        console.log(data);
        return data;
    }
    async create(name, data) {
        const collection = this.db.collection(name);
        const result = await collection.insertOne(data);
        console.log(result);
        return result.insertedId;
    }
    async delete(name, query) {
        const collection = this.db.collection(name);
        const result = await collection.deleteOne(query);
        console.log(result);
        return result.deletedCount;
    }
};
exports.NewMongoService = NewMongoService;
exports.NewMongoService = NewMongoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NewMongoService);
//# sourceMappingURL=db_ping.js.map