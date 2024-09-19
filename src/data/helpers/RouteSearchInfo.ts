import { Route } from 'src/data/models/Route';

export class RouteSearchInfo {
  latitude: number;
  longitude: number;
  routes: Route[];
  routeLandmarks: [];
  distanceFromStartOfRoute: [];
  distanceFromEndOfRoute: [];
}
