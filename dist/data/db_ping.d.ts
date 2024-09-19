import { MongoClient } from 'mongodb';
export declare class NewMongoService {
    constructor();
    connect(): Promise<void>;
    find(name: string, query?: any, limit?: number): Promise<any[]>;
    create(name: string, data: any): Promise<any>;
    delete(name: string, query: any): Promise<any>;
    client: MongoClient;
    db: import("mongodb").Db;
}
