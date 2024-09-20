import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { LocationRequest } from 'src/data/models/LocationRequest';
import { LocationResponse } from 'src/data/models/LocationResponse';
import { MessagingService } from '../fcm/fcm.service';
export declare class LocationRequestService {
    private configService;
    private messagingService;
    private locationRequestModel;
    private locationResponseModel;
    constructor(configService: ConfigService, messagingService: MessagingService, locationRequestModel: mongoose.Model<LocationRequest>, locationResponseModel: mongoose.Model<LocationResponse>);
    addLocationRequest(locationRequest: LocationRequest): Promise<LocationRequest>;
    addLocationResponse(locationResponse: LocationResponse): Promise<LocationResponse>;
}
