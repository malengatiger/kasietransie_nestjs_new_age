import mongoose from "mongoose";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import { VehicleMediaRequest } from "src/data/models/VehicleMediaRequest";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { RouteCity } from "src/data/models/RouteCity";
import { Route } from "src/data/models/Route";
import { CalculatedDistance } from "src/data/models/CalculatedDistance";
import { RoutePoint } from "src/data/models/RoutePoint";
import { FileArchiverService } from "src/my-utils/zipper";
import { RoutePointList } from "src/data/models/RoutePointList";
import { City } from "src/data/models/City";
import { CityService } from "../city/city.service";
import { MessagingService } from "../fcm/fcm.service";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { AssociationRouteData } from "src/data/models/RouteData";
import { Association } from "src/data/models/Association";
import { Vehicle } from "src/data/models/Vehicle";
import { User } from "src/data/models/User";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { CommuterRequest } from "src/data/models/CommuterRequest";
export declare class RouteService {
    private storage;
    private readonly archiveService;
    private readonly messagingService;
    private readonly cityService;
    private readonly errorHandler;
    private routeUpdateRequestModel;
    private vehicleMediaRequestModel;
    private routeLandmarkModel;
    private routeCityModel;
    private cityModel;
    private routePointModel;
    private calculatedDistanceModel;
    private assModel;
    private routeModel;
    private vehicleModel;
    private dispatchRecordModel;
    private commuterRequestModel;
    private userModel;
    constructor(storage: CloudStorageUploaderService, archiveService: FileArchiverService, messagingService: MessagingService, cityService: CityService, errorHandler: KasieErrorHandler, routeUpdateRequestModel: mongoose.Model<RouteUpdateRequest>, vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>, routeLandmarkModel: mongoose.Model<RouteLandmark>, routeCityModel: mongoose.Model<RouteCity>, cityModel: mongoose.Model<City>, routePointModel: mongoose.Model<RoutePoint>, calculatedDistanceModel: mongoose.Model<CalculatedDistance>, assModel: mongoose.Model<Association>, routeModel: mongoose.Model<Route>, vehicleModel: mongoose.Model<Vehicle>, dispatchRecordModel: mongoose.Model<DispatchRecord>, commuterRequestModel: mongoose.Model<CommuterRequest>, userModel: mongoose.Model<User>);
    deleteExcept(associationId: string): Promise<any>;
    deleteAssociationArtifacts(associationId: string, name: string): Promise<string>;
    copySelectedRoute(associationId: string, routeId: string): Promise<any>;
    copyRoutes(assocIdFrom: string, assocIdTo: string): Promise<string>;
    findAssociationRouteLandmarksByLocation(associationId: string, latitude: number, longitude: number, radiusInKM: number): Promise<RouteLandmark[]>;
    findAssociationRoutesByLocation(associationId: string, latitude: number, longitude: number, radiusInKM: number): Promise<Route[]>;
    getAssociationRouteLandmarks(associationId: string): Promise<RouteLandmark[]>;
    addRoute(route: Route): Promise<Route>;
    createRouteQRCode(route: Route): Promise<Route>;
    getCalculatedDistances(routeId: string): Promise<CalculatedDistance[]>;
    getRouteUpdateRequests(routeId: string): Promise<RouteUpdateRequest[]>;
    refreshRoute(routeId: string): Promise<string>;
    updateRouteColor(routeId: string, color: string): Promise<Route>;
    addRoutePoints(list: RoutePointList): Promise<number>;
    deleteRoutePointsFromIndex(routeId: string, index: number): Promise<RoutePoint[]>;
    addCalculatedDistances(list: CalculatedDistance[]): Promise<CalculatedDistance[]>;
    addRouteLandmark(routeLandmark: RouteLandmark): Promise<RouteLandmark[]>;
    deleteRouteLandmark(routeLandmarkId: string): Promise<RouteLandmark[]>;
    deleteRoutePoint(routePointId: string): Promise<any>;
    addVehicleMediaRequest(vehicleMediaRequest: VehicleMediaRequest): Promise<VehicleMediaRequest>;
    addRouteUpdateRequest(routeUpdateRequest: RouteUpdateRequest): Promise<RouteUpdateRequest>;
    updateRouteLandmark(routeLandmark: RouteLandmark): Promise<RouteLandmark>;
    addRouteCity(routeCity: RouteCity): Promise<RouteCity>;
    addRouteCities(routeCities: RouteCity[]): Promise<RouteCity[]>;
    getRouteCities(routeId: string): Promise<RouteCity[]>;
    getRouteLandmarks(routeId: string): Promise<RouteLandmark[]>;
    findRoutesByLocation(latitude: number, longitude: number, radiusInKM: number): Promise<Route[]>;
    private removeDuplicateRoutes;
    findRouteLandmarksByLocation(latitude: number, longitude: number, radiusInKM: number): Promise<RouteLandmark[]>;
    findRoutePointsByLocation(latitude: number, longitude: number, radiusInKM: number): Promise<RoutePoint[]>;
    getAssociationRoutePoints(associationId: string): Promise<string>;
    getAssociationRouteZippedFile(associationId: string): Promise<string>;
    private collectShitForRoute;
    private collectShit;
    private removeDuplicates;
    getAssociationRouteData(associationId: string): Promise<AssociationRouteData>;
    getSingleRouteData(routeId: string): Promise<AssociationRouteData>;
    getAssociationRouteCities(associationId: string): Promise<RouteCity[]>;
    putRouteLandmarksInOrder(routeId: string): Promise<RouteLandmark[]>;
    getAssociationRoutes(associationId: string): Promise<Route[]>;
    getRoutePoints(routeId: string): Promise<RoutePoint[]>;
    getRoutePointsZipped(routeId: string): Promise<string>;
    getRoute(routeId: string): Promise<Route>;
    deleteRoutePoints(routeId: string): Promise<any>;
    deleteAssociationRoutePoints(associationId: string): Promise<any>;
    deleteRoutePointsWithNoAssociation(): Promise<any>;
    deleteRoutePointList(routePointList: RoutePointList): Promise<RoutePoint[]>;
    removeAllDuplicateRoutePoints(): Promise<any>;
    removeDuplicateRoutePoints(routeId: string): Promise<any>;
}
export interface RoutesToCopy {
    assocId: string;
    routeIds: string[];
}
