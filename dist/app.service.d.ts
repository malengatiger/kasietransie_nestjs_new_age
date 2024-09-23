import { Association } from './data/models/Association';
import mongoose from 'mongoose';
export declare class AppService {
    private assocModel;
    constructor(assocModel: mongoose.Model<Association>);
    shakeKasieUp(): Promise<string>;
}
