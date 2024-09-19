/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RouteUpdateRequest } from 'src/data/models/RouteUpdateRequest';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { RouteLandmark } from 'src/data/models/RouteLandmark';
import { RouteCity } from 'src/data/models/RouteCity';
import { Route } from 'src/data/models/Route';
import { RouteBag } from 'src/data/helpers/RouteBag';
import { CalculatedDistance } from 'src/data/models/CalculatedDistance';
import { RoutePoint } from 'src/data/models/RoutePoint';
import { MyUtils } from 'src/my-utils/my-utils';
import { FileArchiverService } from 'src/my-utils/zipper';
import { MessagingService } from 'src/messaging/messaging.service';
import { RoutePointList } from 'src/data/models/RoutePointList';
import { City } from 'src/data/models/City';
import { CityService } from './CityService';

const mm = 'RouteService';

@Injectable()
export class RouteService {
  constructor(
    // private configService: ConfigService,
    private readonly archiveService: FileArchiverService,
    private readonly messagingService: MessagingService,
    private readonly cityService: CityService,

    @InjectModel(RouteUpdateRequest.name)
    private routeUpdateRequestModel: mongoose.Model<RouteUpdateRequest>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(RouteLandmark.name)
    private routeLandmarkModel: mongoose.Model<RouteLandmark>,

    @InjectModel(RouteCity.name)
    private routeCityModel: mongoose.Model<RouteCity>,

    @InjectModel(City.name)
    private cityModel: mongoose.Model<City>,

    @InjectModel(RoutePoint.name)
    private routePointModel: mongoose.Model<RoutePoint>,

    @InjectModel(CalculatedDistance.name)
    private calculatedDistanceModel: mongoose.Model<CalculatedDistance>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>,
  ) {}

  public async findAssociationRouteLandmarksByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async findRouteLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RouteLandmark[]> {
    return [];
  }
  public async findAssociationRoutesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<Route[]> {
    return [];
  }
  public async getAssociationRouteLandmarks(
    associationId: string,
  ): Promise<RouteLandmark[]> {
    const routeLandmarks = await this.routeLandmarkModel.find({
      associationId: associationId,
    });
    return routeLandmarks;
  }

  public async addRoute(route: Route): Promise<Route> {
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(route),
      'route',
      3,
    );
    route.qrCodeUrl = url;
    return await this.routeModel.create(route);
  }
  public async createRouteQRCode(route: Route): Promise<Route> {
    const url = await MyUtils.createQRCodeAndUploadToCloudStorage(
      JSON.stringify(route),
      'route',
      3,
    );
    route.qrCodeUrl = url;
    await this.routeModel.updateOne(route);
    return route;
  }
  public async getCalculatedDistances(
    routeId: string,
  ): Promise<CalculatedDistance[]> {
    return await this.calculatedDistanceModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
  }
  public async getRouteUpdateRequests(
    routeId: string,
  ): Promise<RouteUpdateRequest[]> {
    return [];
  }
  public async refreshRoute(routeId: string): Promise<string> {
    const route = await this.routeModel.findOne({ routeId: routeId });
    const marks = await this.routeLandmarkModel.find({ routeId: routeId });
    const points = await this.routePointModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
    const cities = await this.routeCityModel
      .find({ routeId: routeId })
      .sort({ name: 1 });
    const bag = new RouteBag();
    bag.route = route;
    bag.routeLandmarks = marks;
    bag.routePoints = points;
    bag.routeCities = cities;
    const jsonString = JSON.stringify(bag);
    const fileName = await this.archiveService.zip([{ content: jsonString }]);
    return fileName;
  }
  // public async updateRouteColor(
  //   routeId: string,
  //   color: string,
  // ): Promise<Route> {
  //   const r = await this.routeModel.findOne({ routeId: routeId });
  //   r.color = color;
  //   await this.routeModel.updateOne(r);
  //   return r;
  // }
  async updateRouteColor(routeId: string, color: string): Promise<Route> {
    const filter = { routeId: routeId };
    const update = { color: color };
    const options = { new: true };

    const updatedRoute = await this.routeModel.findOneAndUpdate(
      filter,
      update,
      options,
    );

    return updatedRoute;
  }

  public async addRoutePoints(list: RoutePointList): Promise<number> {
    Logger.log(
      `${mm} addRoutePoints adding ${list.routePoints.length} points ...`,
    );

    const pp = await this.routePointModel.insertMany(list.routePoints);
    Logger.log(`${mm} addRoutePoints insertMany result: ${pp.length}`);
    return pp.length;
  }
  public async deleteRoutePointsFromIndex(
    routeId: string,
    index: number,
  ): Promise<RoutePoint[]> {
    const list = await this.routePointModel.deleteMany({
      routeId: routeId,
      index: { $gte: index },
    });
    Logger.log(`deleteRoutePoints deleted: ${list.deletedCount}`);
    return await this.routePointModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
  }
  public async addCalculatedDistances(
    list: CalculatedDistance[],
  ): Promise<CalculatedDistance[]> {
    const routeId = list[0].routeId;
    await this.calculatedDistanceModel.deleteMany({
      routeId: routeId,
    });
    return await this.calculatedDistanceModel.insertMany(list);
  }
  public async addRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark[]> {
    //get nearest cities; within 5 km
    const cities = await this.cityService.getCitiesNear(
      routeLandmark.position.coordinates.at(1),
      routeLandmark.position.coordinates.at(0),
      5 * 1000,
    );
    const routeCities: RouteCity[] = [];
    cities.forEach((c) => {
      const routeCity = new RouteCity();
      routeCity.routeId = routeLandmark.routeId;
      routeCity.associationId = routeLandmark.associationId;
      routeCity.cityId = c.cityId;
      routeCity.cityName = c.name;
      routeCity.position = c.position;
      routeCity.created = new Date().toISOString();
      routeCity.routeName = routeLandmark.routeName;
      routeCity.routeLandmarkId = routeLandmark.landmarkId;
      routeCity.routeLandmarkName = routeLandmark.landmarkName;
      routeCities.push(routeCity);
    });
    const rc = await this.routeCityModel.insertMany(routeCities);
    Logger.log(
      `${mm} route cities added: ${rc.length} for landmark: ${routeLandmark.landmarkName}`,
    );
    const mark = await this.routeLandmarkModel.create(routeLandmark);
    Logger.log(`${mm} route landmark added: ${mark.landmarkName}`);
    const rem = await this.routeLandmarkModel
      .find({ routeId: mark.routeId })
      .sort({ index: 1 });
    return rem;
  }
  public async deleteRouteLandmark(
    routeLandmarkId: string,
  ): Promise<RouteLandmark[]> {
    const mark = await this.routeLandmarkModel.findOne({
      landmarkId: routeLandmarkId,
    });
    //delete cities
    const list = await this.routeCityModel.find({
      routeLandmarkId: routeLandmarkId,
    });
    Logger.log(`${mm} Route Cities to delete: ${list.length}`);
    if (list.length > 0) {
      await this.routeCityModel.deleteMany({
        routeLandmarkId: routeLandmarkId,
      });
    }
    await this.routeLandmarkModel.deleteOne({
      landmarkId: routeLandmarkId,
    });
    const res = await this.routeLandmarkModel
      .find({ routeId: mark.routeId })
      .sort({ index: 1 });
    Logger.log(
      `${mm} routeLandmark deleted successfully, returning ${res.length}`,
    );

    return res;
  }
  public async addVehicleMediaRequest(
    vehicleMediaRequest: VehicleMediaRequest,
  ): Promise<VehicleMediaRequest> {
    return await this.vehicleMediaRequestModel.create(vehicleMediaRequest);
  }
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest,
  ): Promise<RouteUpdateRequest> {
    const res = await this.routeUpdateRequestModel.create(routeUpdateRequest);
    await this.messagingService.sendRouteUpdateMessage(routeUpdateRequest);
    return res;
  }
  public async updateRouteLandmark(
    routeLandmark: RouteLandmark,
  ): Promise<RouteLandmark> {
    return await this.routeLandmarkModel.create(routeLandmark);
  }
  public async addRouteCity(routeCity: RouteCity): Promise<RouteCity> {
    return await this.routeCityModel.create(routeCity);
  }
  public async addRouteCities(routeCities: RouteCity[]): Promise<RouteCity[]> {
    return await this.routeCityModel.create(routeCities);
  }
  public async getRouteCities(routeId: string): Promise<RouteCity[]> {
    return await this.routeCityModel.find({ routeId: routeId });
  }
  public async getRouteLandmarks(routeId: string): Promise<RouteLandmark[]> {
    return await this.routeLandmarkModel.find({ routeId: routeId });
  }
  public async findRoutesByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<Route[]> {
    return [];
  }
  public async findRoutePointsByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<RoutePoint[]> {
    return [];
  }
  public async getAssociationRoutePoints(
    associationId: string,
  ): Promise<string> {
    const routePoints = await this.routePointModel.find({
      associationId: associationId,
    });
    const fileName = this.archiveService.zip([
      {
        content: JSON.stringify(routePoints),
      },
    ]);
    return fileName;
  }
  public async getAssociationRouteZippedFile(
    associationId: string,
  ): Promise<string> {
    const routes = await this.routeModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} `,
    );

    const points: any[] = [];
    const landmarks: any[] = [];
    const cities: any[] = [];

    await Promise.all(
      routes.map(async (route) => {
        const list = await this.routePointModel.find({
          routeId: route.routeId,
        });
        points.push(list);

        const list1 = await this.routeLandmarkModel.find({
          routeId: route.routeId,
        });

        landmarks.push(list1);

        const list2 = await this.routeCityModel.find({
          routeId: route.routeId,
        });
        cities.push(list2);
      }),
    );
    //
    Logger.debug(`${mm} data.route:   🔷🔷 ${routes.length} routes`);
    Logger.debug(`${mm} data.marks:   🔷🔷 ${landmarks.length} marks`);
    Logger.debug(`${mm} data.cities:  🔷🔷 ${cities.length} cities`);
    Logger.debug(`${mm} data.points:  🔷🔷 ${points.length} points`);

    const data = {
      routes: routes,
      points: points,
      landmarks: landmarks,
      cities: cities,
    };
    const mString = JSON.stringify(data);
    Logger.debug(`${mm} string to archive: ${mString.length} bytes`);
    return this.archiveService.zip([
      {
        content: mString,
      },
    ]);
  }
  public async getAssociationRouteCities(
    associationId: string,
  ): Promise<RouteCity[]> {
    return [];
  }
  public async putRouteLandmarksInOrder(
    routeId: string,
  ): Promise<RouteLandmark[]> {
    return [];
  }

  public async getAssociationRoutes(associationId: string): Promise<Route[]> {
    return this.routeModel.find({ associationId: associationId });
  }
  public async getRoutePoints(routeId: string): Promise<RoutePoint[]> {
    return this.routePointModel.find({ routeId: routeId }).sort({ index: 1 });
  }

  public async getRoutePointsZipped(routeId: string): Promise<string> {
    const points = await this.routePointModel.find({ routeId: routeId });
    const json = JSON.stringify(points);
    return this.archiveService.zip([{ content: json }]);
  }
  public async getRoute(routeId: string): Promise<Route> {
    return this.routeModel.findOne({ routeId: routeId });
  }
  /**
   * Delete route points starting nearest to supplied location and return remaining points
   * @param routeId
   * @param latitude
   * @param longitude
   * @returns RoutePoint[]
   */
  public async deleteRoutePoints(
    routeId: string,
    latitude: number,
    longitude: number,
  ): Promise<string> {
    const distance = 100;
    Logger.log(
      `${mm} latitude: ${latitude}, longitude: ${longitude} route: ${routeId}`,
    );
    const query = {
      routeId: routeId,
      position: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: distance,
        },
      },
    };
    // Find documents based on our query
    const points = await this.routePointModel.find(query);

    if (points.length == 0) {
      throw new Error('Nearest routePoints not found');
    }
    const point = points[0];
    //delete points
    const res = await this.routePointModel.deleteMany({
      routeId: point.routeId,
      index: { $gte: point.index },
    });
    //get remaining points
    const list = await this.routePointModel
      .find({
        routeId: point.routeId,
      })
      .sort({ index: 1 });
    const json = JSON.stringify(list);
    Logger.debug(
      `${mm} Nearest points found: ${points.length} deletion result: ${res}
      total points remaining: ${list.length} raw json string size: ${json.length} bytes`,
    );

    return await this.archiveService.zip([{ content: json }]);
  }
  async removeAllDuplicateRoutePoints(): Promise<any> {
    const list = await this.routeModel.find({});
    list.forEach((route) => {
      Logger.log(`${mm} Removing routePoints from ${route.name}`);
      this.removeDuplicateRoutePoints(route.routeId);
    });
    return { message: 'removeAllDuplicateRoutePoints done' };
  }
  async removeDuplicateRoutePoints(routeId: string): Promise<any> {
    let cnt = 0;
    try {
      // Find duplicate route points
      const duplicateRoutePoints = await this.routePointModel.aggregate([
        {
          $match: {
            routeId: routeId,
          },
        },
        {
          $group: {
            _id: { index: '$index' },
            count: { $sum: 1 },
            ids: { $push: '$_id' },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]);

      Logger.log(
        `${mm} Duplicate route points found: ${duplicateRoutePoints.length}`,
      );

      // Remove duplicates
      for (const duplicate of duplicateRoutePoints) {
        const idsToRemove = duplicate.ids.slice(1); // Keep the first record, remove the rest
        const res = await this.routePointModel.deleteMany({
          _id: { $in: idsToRemove },
        });
        cnt += res.deletedCount;
      }

      Logger.log(
        `${mm} Duplicate route points removed successfully. ${cnt} routePoints`,
      );
    } catch (error) {
      Logger.error('Error removing duplicate route points:', error);
    }
    return {
      message: `${mm} Duplicate route points removed successfully`,
      count: cnt,
    };
  }
}
