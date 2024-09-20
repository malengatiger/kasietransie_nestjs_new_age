import { Response } from 'express';
import { Vehicle } from 'src/data/models/Vehicle';
import { RouteAssignment } from 'src/data/models/RouteAssignment';
import { RouteAssignmentList } from 'src/data/helpers/RouteAssignmentList';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { MediaService } from 'src/services/MediaService';
import { VehiclePhoto } from 'src/data/models/VehiclePhoto';
import { LocationRequest } from '../data/models/LocationRequest';
import { LocationResponse } from '../data/models/LocationResponse';
import { VehicleMediaRequest } from '../data/models/VehicleMediaRequest';
import { VehicleBag } from '../data/helpers/VehicleBag';
import { DispatchService } from 'src/features/dispatch/dispatch.service';
import { LocationRequestService } from 'src/features/location_request/location_request.service';
import { RouteService } from 'src/features/route/route.service';
import { TimeSeriesService } from 'src/features/time_series/time_series.service';
import { VehicleService } from 'src/features/vehicle/vehicle.service';
export declare class CarController {
    private readonly carService;
    private readonly dispatchService;
    private readonly mediaService;
    private readonly locationRequestService;
    private readonly routeService;
    private readonly timeSeriesService;
    private readonly logger;
    constructor(carService: VehicleService, dispatchService: DispatchService, mediaService: MediaService, locationRequestService: LocationRequestService, routeService: RouteService, timeSeriesService: TimeSeriesService);
    addVehicle(vehicle: Vehicle): Promise<Vehicle>;
    addLocationRequest(request: LocationRequest): Promise<LocationRequest>;
    addLocationResponse(request: LocationResponse): Promise<LocationResponse>;
    addVehicleMediaRequest(request: VehicleMediaRequest): Promise<VehicleMediaRequest>;
    addVehiclePhoto(vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>;
    addVehicleArrival(vehicle: VehicleArrival): Promise<VehicleArrival>;
    importVehiclesFromCSV(file: Express.Multer.File, associationId: string): Promise<Vehicle[]>;
    importVehiclesFromJSON(file: Express.Multer.File, associationId: string): Promise<Vehicle[]>;
    addRouteAssignments(assignments: RouteAssignmentList): Promise<RouteAssignment[]>;
    getPassengerTimeSeries(query: {
        associationId: string;
        routeId: string;
        vehicleId: string;
        startDate: string;
    }): Promise<any[]>;
    getAssociationHeartbeatTimeSeries(query: {
        associationId: string;
        startDate: string;
    }, res: Response): Promise<void>;
    getOwnerVehicles(userId: string): Promise<Vehicle[]>;
    getVehicleRouteAssignments(vehicleId: string): Promise<RouteAssignment[]>;
    getVehicleBag(query: {
        vehicleId: string;
        startDate: string;
    }): Promise<VehicleBag>;
    private sendFile;
}
