import { Association } from './data/models/Association';
import mongoose from 'mongoose';
import { QueryElapsedTime } from './data/models/QueryElapsedTime';
export declare class AppService {
    private assocModel;
    private qelModel;
    constructor(assocModel: mongoose.Model<Association>, qelModel: mongoose.Model<QueryElapsedTime>);
    shakeKasieUp(): Promise<string>;
    addQueryElapsedTime(queryElapsedTime: QueryElapsedTime): Promise<any>;
}
