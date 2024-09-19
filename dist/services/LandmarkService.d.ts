import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { Landmark } from 'src/data/models/Landmark';
export declare class LandmarkService {
    private configService;
    private landmarkModel;
    constructor(configService: ConfigService, landmarkModel: mongoose.Model<Landmark>);
    addBasicLandmark(landmark: Landmark): Promise<Landmark>;
    deleteLandmark(landmarkId: string): Promise<number>;
    findLandmarksByLocation(latitude: number, longitude: number, radiusInKM: number): Promise<Landmark[]>;
}
