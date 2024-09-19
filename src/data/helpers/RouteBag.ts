import { Route } from 'src/data/models/Route';
import { RouteCity } from 'src/data/models/RouteCity';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { RoutePoint } from 'src/data/models/RoutePoint';

export class RouteBag {
  route: Route;
  routeLandmarks: RouteLandmark[];
  routePoints: RoutePoint[];
  routeCities: RouteCity[];
}
