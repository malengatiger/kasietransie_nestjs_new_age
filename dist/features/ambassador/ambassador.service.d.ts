import mongoose from 'mongoose';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { AmbassadorCheckIn } from 'src/data/models/AmbassadorCheckIn';
import { Vehicle } from 'src/data/models/Vehicle';
import { NewMongoService } from 'src/data/new_mongo_service';
import { MessagingService } from '../fcm/fcm.service';
import { TimeSeriesService } from '../time_series/time_series.service';
export declare class AmbassadorService {
    private readonly messagingService;
    private readonly timeSeriesService;
    private readonly mongoService;
    private ambassadorPassengerCountModel;
    constructor(messagingService: MessagingService, timeSeriesService: TimeSeriesService, mongoService: NewMongoService, ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>);
    getAssociationAmbassadorCheckIn(associationId: string, startDate: string): Promise<any[]>;
    getVehicleAmbassadorCheckIn(vehicleId: string, startDate: string): Promise<AmbassadorCheckIn[]>;
    getUserAmbassadorPassengerCounts(userId: string, startDate: string): Promise<any[]>;
    getAssociationAmbassadorPassengerCounts(associationId: string, startDate: string): Promise<AmbassadorPassengerCount[]>;
    getVehicleAmbassadorPassengerCounts(vehicleId: string, startDate: string): Promise<AmbassadorPassengerCount[]>;
    addAmbassadorPassengerCount(count: AmbassadorPassengerCount): Promise<AmbassadorPassengerCount>;
    generateRoutePassengerCounts(): Promise<AmbassadorPassengerCount[]>;
    getAmbassadorPassengerCount(): Promise<AmbassadorPassengerCount>;
    generateAmbassadorPassengerCounts(): Promise<AmbassadorPassengerCount[]>;
    getCars(): Promise<Vehicle[]>;
    getUserAmbassadorCheckIn(): Promise<AmbassadorCheckIn[]>;
    addAmbassadorCheckIn(): Promise<AmbassadorPassengerCount>;
    getRoutePassengerCounts(routeId: string, startDate: string): Promise<AmbassadorPassengerCount[]>;
    getCurrentPassengers(): Promise<number>;
}
