import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { User } from 'src/data/models/User';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { DispatchRecord } from 'src/data/models/DispatchRecord';
import { Vehicle } from 'src/data/models/Vehicle';
import { VehicleArrival } from 'src/data/models/VehicleArrival';
import { AmbassadorPassengerCount } from 'src/data/models/AmbassadorPassengerCount';
import { VehicleDeparture } from 'src/data/models/VehicleDeparture';
import { Route } from 'src/data/models/Route';
import { AssociationBag } from 'src/data/helpers/AssociationBag';
import { AssociationCounts } from 'src/data/helpers/AssociationCounts';
import { BigBag } from 'src/data/helpers/BigBag';
import { CounterBag } from 'src/data/helpers/CounterBag';
import { DispatchRecordList } from 'src/data/helpers/DispatchRecordList';
import { CommuterRequest } from 'src/data/models/CommuterRequest';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { VehicleHeartbeat } from 'src/data/models/VehicleHeartbeat';
import { MessagingService } from 'src/messaging/messaging.service';
import { FileArchiverService } from '../my-utils/zipper';
export declare class DispatchService {
    private configService;
    private messagingService;
    private zipService;
    private userModel;
    private routeLandmarkModel;
    private dispatchRecordModel;
    private vehicleModel;
    private vehicleArrivalModel;
    private vehicleHeartbeatModel;
    private ambassadorPassengerCountModel;
    private vehicleDepartureModel;
    private commuterRequestModel;
    private routeModel;
    constructor(configService: ConfigService, messagingService: MessagingService, zipService: FileArchiverService, userModel: mongoose.Model<User>, routeLandmarkModel: mongoose.Model<RouteLandmark>, dispatchRecordModel: mongoose.Model<DispatchRecord>, vehicleModel: mongoose.Model<Vehicle>, vehicleArrivalModel: mongoose.Model<VehicleArrival>, vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>, ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>, vehicleDepartureModel: mongoose.Model<VehicleDeparture>, commuterRequestModel: mongoose.Model<CommuterRequest>, routeModel: mongoose.Model<Route>);
    getAmbassadorPassengerCount(vehicle: Vehicle, minutesAgo: number, mark: RouteLandmark, user: User, passengers: number): Promise<AmbassadorPassengerCount>;
    countVehicleDeparturesByDate(vehicleId: string, startDate: string): Promise<number>;
    countVehicleHeartbeatsByDate(vehicleId: string, startDate: string): Promise<number>;
    countVehiclePassengerCounts(vehicleId: string): Promise<number>;
    getAssociationVehicleDepartures(associationId: string, startDate: string): Promise<VehicleDeparture[]>;
    getAssociationDispatchRecords(associationId: string): Promise<DispatchRecord[]>;
    getAssociationDispatchRecordsByDate(associationId: string, startDate: string): Promise<DispatchRecord[]>;
    getAssociationVehicleArrivals(associationId: string): Promise<VehicleArrival[]>;
    getAssociationVehicleArrivalsByDate(associationId: string, startDate: string): Promise<VehicleArrival[]>;
    getAssociationCommuterRequests(associationId: string, startDate: string): Promise<CommuterRequest[]>;
    generateAmbassadorPassengerCount(vehicle: Vehicle, routeLandmarks: RouteLandmark[], users: User[], minutesAgo: number, previousAPC: AmbassadorPassengerCount, mark: RouteLandmark): Promise<AmbassadorPassengerCount>;
    generateHeartbeatBetweenLandmarks(vehicle: Vehicle, mark: RouteLandmark, next: RouteLandmark, minutesAgo: number): Promise<void>;
    countMarshalDispatchRecords(userId: string): Promise<number>;
    findVehicleArrivalsByLocation(associationId: string, latitude: number, longitude: number, radiusInKM: number, minutes: number, limit: number): Promise<VehicleArrival[]>;
    findVehicleDeparturesByLocation(associationId: string, latitude: number, longitude: number, radiusInKM: number, minutes: number, limit: number): Promise<VehicleDeparture[]>;
    getLandmarkVehicleDepartures(landmarkId: string): Promise<VehicleDeparture[]>;
    getAssociationBagZippedFile(associationId: string, startDate: string): Promise<string>;
    generateRouteDispatchRecords(route: Route, vehicle: Vehicle, routeLandmarks: RouteLandmark[], users: User[], intervalInSeconds: number): Promise<void>;
    addDispatchRecord(dispatchRecord: DispatchRecord): Promise<DispatchRecord>;
    getVehicleArrivalsByDate(vehicleId: string, startDate: string): Promise<VehicleArrival[]>;
    getVehicleArrivals(vehicleId: string): Promise<VehicleArrival[]>;
    getVehicleHeartbeats(vehicleId: string, startDate: string): Promise<VehicleHeartbeat[]>;
    getVehicleDispatchRecords(vehicleId: string, startDate: string): Promise<DispatchRecord[]>;
    getVehiclePassengerCounts(vehicleId: string, startDate: string): Promise<AmbassadorPassengerCount[]>;
    getVehicleDepartures(vehicleId: string): Promise<VehicleDeparture[]>;
    getVehicleDeparturesByDate(vehicleId: string, startDate: string): Promise<VehicleDeparture[]>;
    countDispatchesByDate(vehicleId: string, startDate: string): Promise<number>;
    countVehicleArrivalsByDate(vehicleId: string, startDate: string): Promise<number>;
    countPassengerCountsByDate(vehicleId: string, startDate: string): Promise<number>;
    countVehicleDepartures(vehicleId: string): Promise<number>;
    countVehicleDispatches(vehicleId: string): Promise<number>;
    countVehicleArrivals(vehicleId: string): Promise<number>;
    getOwnerDispatchRecords(userId: string, startDate: string): Promise<DispatchRecord[]>;
    getOwnerVehicleArrivals(userId: string, startDate: string): Promise<VehicleArrival[]>;
    getOwnerVehicleDepartures(userId: string, startDate: string): Promise<VehicleDeparture[]>;
    getOwnerVehicleHeartbeats(userId: string, startDate: string): Promise<VehicleHeartbeat[]>;
    getOwnerPassengerCounts(userId: string, startDate: string): Promise<AmbassadorPassengerCount[]>;
    getAssociationBag(associationId: string, startDate: string): Promise<AssociationBag>;
    handleArrivalAndDispatch(users: User[], vehicle: Vehicle, minutesAgo: number, mark: RouteLandmark): Promise<void>;
    handleDateAndSleep(minutesAgo: number, intervalInSeconds: number): Promise<number>;
    generateDeparture(vehicle: Vehicle, mark: RouteLandmark, minutesAgo: number): Promise<void>;
    writeHeartbeatBetween(vehicle: Vehicle, minutesAgo: number, rp: RoutePoint): Promise<void>;
    addVehicleDeparture(vehicleDeparture: VehicleDeparture): Promise<VehicleDeparture>;
    handleArrival(vehicle: Vehicle, minutesAgo: number, mark: RouteLandmark): Promise<void>;
    writeHeartbeat(vehicle: Vehicle, minutesAgo: number, mark: RouteLandmark): Promise<void>;
    addVehicleArrival(vehicleArrival: VehicleArrival): Promise<VehicleArrival>;
    getRouteDispatchRecords(routeId: string, startDate: string): Promise<DispatchRecord[]>;
    getRouteVehicleArrivals(routeId: string, startDate: string): Promise<VehicleArrival[]>;
    addDispatchRecords(dispatchRecordList: DispatchRecordList): Promise<DispatchRecord[]>;
    getLandmarkDispatchRecords(landmarkId: string): Promise<DispatchRecord[]>;
    getMarshalDispatchRecords(marshalId: string, startDate: string): Promise<DispatchRecord[]>;
    getLandmarkVehicleArrivals(landmarkId: string): Promise<VehicleArrival[]>;
    getVehicleCountsByDate(vehicleId: string, startDate: string): Promise<CounterBag[]>;
    getVehicleCounts(vehicleId: string): Promise<CounterBag[]>;
    getOwnersBag(userId: string, startDate: string): Promise<BigBag>;
    getAssociationCounts(associationId: string, startDate: string): Promise<AssociationCounts>;
    fixOwnerToPassengerCounts(userId: string, ownerId: string, ownerName: string): Promise<string>;
}
