import { NewMongoService } from 'src/data/new_mongo_service';
export declare class AppService {
    readonly mongoService: NewMongoService;
    constructor(mongoService: NewMongoService);
    shakeKasieUp(): Promise<string>;
}
