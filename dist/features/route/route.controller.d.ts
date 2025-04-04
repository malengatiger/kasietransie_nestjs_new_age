import { Response } from "express";
import { CalculatedDistanceList } from "src/data/helpers/CalculatedDistanceList";
import { CalculatedDistance } from "src/data/models/CalculatedDistance";
import { Route } from "src/data/models/Route";
import { RouteCity } from "src/data/models/RouteCity";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { RoutePoint } from "src/data/models/RoutePoint";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import { RoutePointList } from "src/data/models/RoutePointList";
import { RouteService } from "src/features/route/route.service";
import { AssociationRouteData } from "src/data/models/RouteData";
export declare class RouteController {
    private readonly routeService;
    private readonly logger;
    constructor(routeService: RouteService);
    addRoute(route: Route): Promise<Route>;
    addRouteLandmark(routeLandmark: RouteLandmark): Promise<RouteLandmark[]>;
    addRouteUpdateRequest(routeUpdateRequest: RouteUpdateRequest): Promise<RouteUpdateRequest>;
    addRouteCity(routeCity: RouteCity): Promise<RouteCity>;
    addRouteCities(routeCities: RouteCity[]): Promise<RouteCity[]>;
    addCalculatedDistances(distanceList: CalculatedDistanceList): Promise<CalculatedDistance[]>;
    addRoutePoints(routePoints: RoutePointList): Promise<number>;
    deleteRoutePointList(routePointList: RoutePointList): Promise<RoutePoint[]>;
    deleteRoutePointsFromIndex(query: {
        routeId: string;
        index: number;
    }): Promise<RoutePoint[]>;
    copyRoutes(query: {
        assocIdFrom: string;
        assocIdTo: string;
    }): Promise<string>;
    copySelectedRoute(associationId: string, routeId: string): Promise<any>;
    deleteCopiedRoutes(query: {
        associationId: string;
    }): Promise<string>;
    deleteRoutePoint(routePointId: string): Promise<any>;
    updateRouteColor(query: {
        routeId: string;
        color: string;
    }): Promise<Route>;
    findRouteLandmarksByLocation(query: {
        latitude: number;
        longitude: number;
        radiusInKM: number;
    }): Promise<RouteLandmark[]>;
    getRouteById(query: {
        routeId: string;
    }): Promise<Route>;
    findRoutesByLocation(query: {
        latitude: number;
        longitude: number;
        radiusInKM: number;
    }): Promise<Route[]>;
    findRoutePointsByLocation(query: {
        latitude: number;
        longitude: number;
        radiusInKM: number;
    }): Promise<RoutePoint[]>;
    deleteRouteLandmark(query: {
        routeLandmarkId: string;
    }): Promise<RouteLandmark[]>;
    removeAllDuplicateRoutePoints(): Promise<any[]>;
    getAssociationRoutes(query: {
        associationId: string;
    }): Promise<Route[]>;
    getAssociationRouteData(query: {
        associationId: string;
    }): Promise<AssociationRouteData>;
    getSingleRouteData(query: {
        routeId: string;
    }): Promise<AssociationRouteData>;
    getAssociationRouteLandmarks(query: {
        associationId: string;
    }): Promise<RouteLandmark[]>;
    getCalculatedDistances(query: {
        routeId: string;
    }): Promise<CalculatedDistance[]>;
    getRoutePointsZipped(routeId: string, res: Response): Promise<void>;
    deleteRoutePoints(query: {
        routeId: string;
    }, res: Response): Promise<void>;
    refreshRoute(routeId: string, res: Response): Promise<void>;
    getAssociationRouteZippedFile(associationId: string, res: Response): Promise<void>;
    getRouteLandmarks(routeId: string): Promise<RouteLandmark[]>;
    getRoutePoints(routeId: string): Promise<RoutePoint[]>;
    private sendFile;
    deleteExcept(query: {
        associationId: string;
    }): Promise<any>;
    deleteAssociationRoutePoints(query: {
        associationId: string;
    }): Promise<any>;
    deleteRoutePointsWithNoAssociation(): Promise<any>;
}
