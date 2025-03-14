import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { GenerationRequest } from 'src/data/helpers/GenerationRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { VehicleTelemetry } from 'src/data/models/VehicleTelemetry';
import { MessagingService } from '../fcm/fcm.service';
import { TimeSeriesService } from '../time_series/time_series.service';
export declare class TelemetryService {
    private configService;
    private readonly timeSeriesService;
    private messagingService;
    private vehicleModel;
    private vehicleTelemetryModel;
    private vehicleHeartbeatModel;
    constructor(configService: ConfigService, timeSeriesService: TimeSeriesService, messagingService: MessagingService, vehicleModel: mongoose.Model<Vehicle>, vehicleTelemetryModel: mongoose.Model<VehicleTelemetry>, vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>);
    generateVehicleRouteHeartbeats(vehicleId: string, routeId: string, startDate: string, intervalInSeconds: number): Promise<void>;
    getAssociationVehicleHeartbeats(associationId: string, startDate: string): Promise<VehicleHeartbeat[]>;
    addVehicleHeartbeat(heartbeat: VehicleHeartbeat): Promise<VehicleHeartbeat>;
    addVehicleTelemetry(telemetry: VehicleTelemetry): Promise<VehicleTelemetry>;
    generateRouteHeartbeats(request: GenerationRequest): Promise<void>;
    getVehicleHeartbeats(vehicleId: string, cutoffHours: number): Promise<VehicleHeartbeat[]>;
    countVehicleHeartbeats(vehicleId: string): Promise<number>;
    getOwnerVehicleHeartbeats(userId: string, cutoffHours: number): Promise<VehicleHeartbeat[]>;
    writeHeartbeat(vehicleId: string, startDate: string, intervalInSeconds: number, vehicle: Vehicle, pointsFiltered: RoutePoint[]): Promise<VehicleHeartbeat>;
}
