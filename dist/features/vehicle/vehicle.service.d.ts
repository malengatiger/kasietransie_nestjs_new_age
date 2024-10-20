import mongoose from "mongoose";
import { Vehicle } from "src/data/models/Vehicle";
import { Association } from "src/data/models/Association";
import { User } from "src/data/models/User";
import { Route } from "src/data/models/Route";
import { RouteAssignmentList } from "src/data/helpers/RouteAssignmentList";
import { RouteAssignment } from "src/data/models/RouteAssignment";
import { RoutePoint } from "src/data/models/RoutePoint";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { VehicleBag } from "src/data/helpers/VehicleBag";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleArrival } from "src/data/models/VehicleArrival";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { AssociationService } from "../association/association.service";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { VehicleMediaRequest } from "src/data/models/VehicleMediaRequest";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { UserService } from "../user/user.service";
export declare class VehicleService {
    private storage;
    private associationService;
    private userService;
    private readonly errorHandler;
    private vehicleModel;
    private dispatchRecordModel;
    private vehicleArrivalModel;
    private vehicleHeartbeatModel;
    private ambassadorPassengerCountModel;
    private vehicleDepartureModel;
    private associationModel;
    private userModel;
    private assignModel;
    private routeModel;
    private vehicleMediaRequestModel;
    private vehiclePhotoModel;
    private vehicleVideoModel;
    constructor(storage: CloudStorageUploaderService, associationService: AssociationService, userService: UserService, errorHandler: KasieErrorHandler, vehicleModel: mongoose.Model<Vehicle>, dispatchRecordModel: mongoose.Model<DispatchRecord>, vehicleArrivalModel: mongoose.Model<VehicleArrival>, vehicleHeartbeatModel: mongoose.Model<VehicleHeartbeat>, ambassadorPassengerCountModel: mongoose.Model<AmbassadorPassengerCount>, vehicleDepartureModel: mongoose.Model<VehicleDeparture>, associationModel: mongoose.Model<Association>, userModel: mongoose.Model<User>, assignModel: mongoose.Model<RouteAssignment>, routeModel: mongoose.Model<Route>, vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>, vehiclePhotoModel: mongoose.Model<VehiclePhoto>, vehicleVideoModel: mongoose.Model<VehicleVideo>);
    getAssociationVehicleMediaRequests(associationId: string, startDate: string): Promise<VehicleMediaRequest[]>;
    addVehiclePhoto(vehiclePhoto: VehiclePhoto): Promise<VehiclePhoto>;
    getVehicleMediaRequests(vehicleId: string): Promise<VehicleMediaRequest[]>;
    addVehicleVideo(vehicleVideo: VehicleVideo): Promise<VehicleVideo>;
    getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]>;
    getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]>;
    findOwnerVehiclesByLocationAndTime(userId: string, latitude: number, longitude: number, minutes: number): Promise<VehicleHeartbeat[]>;
    findAssociationVehiclesByLocationAndTime(associationId: string, latitude: number, longitude: number, minutes: number): Promise<VehicleHeartbeat[]>;
    generateFakeVehiclesFromFile(associationId: string): Promise<Vehicle[]>;
    getPoints(route: Route): Promise<RoutePoint[]>;
    buildUser(cellphone: string, lastName: string, firstName: string, ass: Association, responses: []): Promise<User>;
    insertCar(resultVehicles: Vehicle[], responses: [], existingUser: User, vehicle: Vehicle, result: number): Promise<void>;
    addVehicle(vehicle: Vehicle): Promise<Vehicle>;
    getVehicleBag(vehicleId: string, startDate: string): Promise<VehicleBag>;
    addRouteAssignments(list: RouteAssignmentList): Promise<RouteAssignment[]>;
    getVehicleRouteAssignments(vehicleId: string): Promise<RouteAssignment[]>;
    getRouteAssignments(routeId: string): Promise<RouteAssignment[]>;
    generateHeartbeats(associationId: string, numberOfCars: number, intervalInSeconds: number): Promise<VehicleHeartbeat[]>;
    generateRouteHeartbeats(routeId: string, numberOfCars: number, intervalInSeconds: number): Promise<VehicleHeartbeat[]>;
    updateVehicle(vehicle: Vehicle): Promise<Vehicle>;
    getOwnerVehicles(userId: string, page: number): Promise<Vehicle[]>;
    updateVehicleQRCode(vehicle: Vehicle): Promise<number>;
    private addCarsToDatabase;
    importVehiclesFromCSV(file: Express.Multer.File, associationId: string): Promise<AddCarsResponse>;
    private handleExtractedCars;
    private buildCar;
    createOwnerIfNotExists(car: Vehicle): Promise<number>;
}
export interface AddCarsResponse {
    cars: Vehicle[];
    errors: any[];
}
