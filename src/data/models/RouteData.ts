import { ApiProperty } from "@nestjs/swagger";
import { Route } from "./Route";
import { RouteLandmark } from "./RouteLandmark";
import { RouteCity } from "./RouteCity";
import { RoutePoint } from "./RoutePoint";

export class AssociationRouteData {
    
    @ApiProperty()
    routeDataList: RouteData[];
   
    @ApiProperty()
    associationId: string;

  }

  export class RouteData {
    @ApiProperty()
    routeId: string;

    @ApiProperty()
    route: Route;

    @ApiProperty()
    landmarks: RouteLandmark[];
   
    @ApiProperty()
    cities: RouteCity[];
   
    @ApiProperty()
    routePoints: RoutePoint[];


  }
  
  