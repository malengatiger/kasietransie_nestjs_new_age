import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { UserGeofenceEvent } from 'src/data/models/UserGeofenceEvent';
export declare class UserGeofenceService {
    private configService;
    private userGeofenceEventModel;
    constructor(configService: ConfigService, userGeofenceEventModel: mongoose.Model<UserGeofenceEvent>);
    getUserGeofenceEventsForUser(userId: string): Promise<UserGeofenceEvent[]>;
    getVehicleGeofenceEventsForLandmark(landmarkId: string): Promise<UserGeofenceEvent[]>;
    getVehicleGeofenceEventsForAssociation(associationId: string): Promise<UserGeofenceEvent[]>;
    addUserGeofenceEvent(event: UserGeofenceEvent): Promise<UserGeofenceEvent>;
}
