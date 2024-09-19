import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { VehiclePhoto } from 'src/data/models/VehiclePhoto';
import { VehicleVideo } from 'src/data/models/VehicleVideo';
export declare class MediaService {
    private configService;
    private vehiclePhotoModel;
    private vehicleMediaRequestModel;
    private vehicleVideoModel;
    constructor(configService: ConfigService, vehiclePhotoModel: mongoose.Model<VehiclePhoto>, vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>, vehicleVideoModel: mongoose.Model<VehicleVideo>);
    getAssociationVehicleMediaRequests(associationId: string, startDate: string): Promise<VehicleMediaRequest[]>;
    addVehiclePhoto(vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>;
    getVehicleMediaRequests(vehicleId: string): Promise<VehicleMediaRequest[]>;
    addVehicleVideo(vehicleVideo: VehicleVideo): Promise<VehicleVideo>;
    getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]>;
    getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]>;
}
