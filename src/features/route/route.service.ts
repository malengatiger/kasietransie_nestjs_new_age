/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import { VehicleMediaRequest } from "src/data/models/VehicleMediaRequest";
import { RouteLandmark } from "src/data/models/RouteLandmark";
import { RouteCity } from "src/data/models/RouteCity";
import { Route } from "src/data/models/Route";
import { RouteBag } from "src/data/helpers/RouteBag";
import { CalculatedDistance } from "src/data/models/CalculatedDistance";
import { RoutePoint } from "src/data/models/RoutePoint";
import { FileArchiverService } from "src/my-utils/zipper";
import { RoutePointList } from "src/data/models/RoutePointList";
import { City } from "src/data/models/City";
import { CityService } from "../city/city.service";
import { MessagingService } from "../fcm/fcm.service";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { AssociationRouteData, RouteData } from "src/data/models/RouteData";
import { Association } from "src/data/models/Association";
import { randomUUID } from "crypto";

const mm = "🌿🌿🌿 RouteService 🌿";

@Injectable()
export class RouteService {
  constructor(
    private storage: CloudStorageUploaderService,

    private readonly archiveService: FileArchiverService,
    private readonly messagingService: MessagingService,
    private readonly cityService: CityService,
    private readonly errorHandler: KasieErrorHandler,

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

    @InjectModel(Association.name)
    private assModel: mongoose.Model<Association>,

    @InjectModel(Route.name)
    private routeModel: mongoose.Model<Route>
  ) {}

  public async deleteCopiedRoutes(associationId: string): Promise<string> {
    try {
      const res1 = await this.routePointModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} routePoints result: ${JSON.stringify(res1)}`);
      var res2 = await this.routeLandmarkModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} routeLandmarks result: ${JSON.stringify(res2)}`);
      var res3 = await this.routeCityModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} routeCities result: ${JSON.stringify(res3)}`);
      var res4 = await this.routeModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} routes result: ${JSON.stringify(res4)}`);
      return `Copied routes deleted`;
    } catch (e) {
      Logger.error(`${mm} Failed: ${e}`);
    }
  }

  public async copyRoutes(
    assocIdFrom: string,
    assocIdTo: string
  ): Promise<string> {
    let routeCount = 0;
    Logger.log(`\n\n\n${mm} copyRoutes starting ...`);

    try {
      const routes: Route[] = await this.routeModel.find({
        associationId: assocIdFrom,
      });
      const ass = await this.assModel.findOne({ associationId: assocIdTo });
      routes.forEach(async (rt) => {
        if (ass) {
          const newRoute = new Route();
          Logger.log(
            `\n${mm} ${routes.length} routes to be added to ${ass.associationName} ...`
          );
          newRoute.associationId = assocIdTo;
          newRoute.associationName = ass.associationName;
          newRoute.routeId = randomUUID();
          newRoute.name = rt.name;
          newRoute.color = rt.color;
          newRoute.countryId = rt.countryId;
          newRoute.countryName = rt.countryName;
          newRoute.calculatedDistances = null;
          newRoute.created = new Date().toISOString();
          newRoute.routeStartEnd = rt.routeStartEnd;

          await this.routeModel.create(newRoute);
          routeCount++;
          Logger.log(
            `\n${mm} route added to ${ass.associationName} - ${newRoute.name}`
          );

          const landmarks = await this.routeLandmarkModel.find({
            routeId: rt.routeId,
          });
          Logger.log(`${mm} ${landmarks.length} routeLandmarks to be created ...`);
          let landmarksCount = 0;
          landmarks.forEach(async (lm) => {
            const landmark = new RouteLandmark();
            landmark.landmarkId = randomUUID();
            landmark.landmarkName = lm.landmarkName;
            landmark.position = lm.position;
            landmark.routeId = newRoute.routeId;
            landmark.routeName = newRoute.name;
            landmark.routePointIndex = lm.routePointIndex;
            landmark.routePointId = lm.routePointId;
            landmark.created = new Date().toISOString();
            landmark.index = lm.index;
            landmark.associationId = ass.associationId;

            await this.routeLandmarkModel.create(landmark);
            landmarksCount++;
          });
          Logger.debug(
            `\n${mm} ${landmarksCount} routeLandmarks added to ${newRoute.name}`
          );

          const cities = await this.routeCityModel.find({
            routeId: rt.routeId,
          });
          Logger.log(
            `${mm} ${cities.length} routeCities to be created ...`
          );
          let cityCount = 0;
          cities.forEach(async (c) => {
            const routeCity = new RouteCity();
            routeCity.routeId = newRoute.routeId;
            routeCity.routeName = rt.name;
            routeCity.cityId = c.cityId;
            routeCity.cityName = c.cityId;
            routeCity.position = c.position;
            routeCity.created = new Date().toISOString();
            routeCity.associationId = newRoute.associationId;
            await this.routeCityModel.create(routeCity);
            cityCount++;
          });
          Logger.debug(
            `\n${mm} ${cityCount} routeCities added to ${newRoute.name} `
          );

          const points = await this.routePointModel.find({
            routeId: rt.routeId,
          });
          Logger.log(
            `${mm} ${points.length} routePoints to be created for route: ${newRoute.name}`
          );
          let pointsCount = 0;
          points.forEach(async (c) => {
            const routePoint = new RoutePoint();
            routePoint.routeId = newRoute.routeId;
            routePoint.routeName = newRoute.name;
            routePoint.position = c.position;
            routePoint.index = c.index;
            routePoint.latitude = c.latitude;
            routePoint.longitude = c.longitude;
            routePoint.routePointId = randomUUID();
            routePoint.associationId = newRoute.associationId;
            routePoint.heading = c.heading;
            routePoint.created = new Date().toISOString();
            await this.routePointModel.create(routePoint);
            pointsCount++;
          });
          Logger.debug(
            `\n${mm}  ${pointsCount} routePoints added to ${newRoute.name} `
          );
        }
      });
      Logger.log(
        `\n\n${mm} ${routeCount} routes added to ${ass.associationName} `
      );
      const msg = "🥬🥬🥬🥬 route copy complete! 🥬🥬🥬🥬";
      Logger.log(`\n\n ${mm} ${msg} \n\n`);
      return msg;
    } catch (e) {
      Logger.error(`${mm} Routes copy failed: ${e}`);
      throw new HttpException(
        `Routes copy failed: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async findAssociationRouteLandmarksByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number
  ): Promise<RouteLandmark[]> {
    return [];
  }

  public async findAssociationRoutesByLocation(
    associationId: string,
    latitude: number,
    longitude: number,
    radiusInKM: number
  ): Promise<Route[]> {
    return [];
  }
  public async getAssociationRouteLandmarks(
    associationId: string
  ): Promise<RouteLandmark[]> {
    const routeLandmarks = await this.routeLandmarkModel.find({
      associationId: associationId,
    });
    return routeLandmarks;
  }

  public async addRoute(route: Route): Promise<Route> {
    try {
      const res = await this.routeModel.create(route);
      Logger.log(
        `\n\n${mm} route ${route.name} has been added to Atlas\n ${JSON.stringify(res, null, 2)}`
      );
      return res; // Return the result from the database
    } catch (e) {
      this.errorHandler.handleError(
        e,
        route.associationId,
        route.associationName
      );
      throw new HttpException(`addRoute failed: ${e}`, HttpStatus.BAD_REQUEST);
    }
  }

  public async createRouteQRCode(route: Route): Promise<Route> {
    await this.routeModel.updateOne(route);
    return route;
  }
  public async getCalculatedDistances(
    routeId: string
  ): Promise<CalculatedDistance[]> {
    return await this.calculatedDistanceModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
  }
  public async getRouteUpdateRequests(
    routeId: string
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
    const fileName = await this.archiveService.zip([
      { contentString: jsonString },
    ]);
    return fileName;
  }
 
  async updateRouteColor(routeId: string, color: string): Promise<Route> {
    const filter = { routeId: routeId };
    const update = { color: color };
    const options = { new: true };

    const updatedRoute = await this.routeModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    return updatedRoute;
  }

  public async addRoutePoints(list: RoutePointList): Promise<number> {
    Logger.log(
      `${mm} addRoutePoints adding ${list.routePoints.length} points ...`
    );

    const pp = await this.routePointModel.insertMany(list.routePoints);
    Logger.log(`${mm} addRoutePoints insertMany result: ${pp.length}`);
    return pp.length;
  }
  public async deleteRoutePointsFromIndex(
    routeId: string,
    index: number
  ): Promise<RoutePoint[]> {
    const points = await this.routePointModel.find({ routeId: routeId });
    let count = 0;
    points.forEach(async (doc) => {
      if (doc.index >= index) {
        await doc.deleteOne();
        count++;
      }
    });

    Logger.log(`${mm} deleteRoutePoints deleted: ${count}`);

    const resultPoints = await this.routePointModel
      .find({ routeId: routeId })
      .sort({ index: 1 });
    Logger.log(
      `${mm} updated RoutePoints after delete: ${resultPoints.length}`
    );

    return resultPoints;
  }
  public async addCalculatedDistances(
    list: CalculatedDistance[]
  ): Promise<CalculatedDistance[]> {
    const routeId = list[0].routeId;
    await this.calculatedDistanceModel.deleteMany({
      routeId: routeId,
    });
    return await this.calculatedDistanceModel.insertMany(list);
  }

  public async addRouteLandmark(
    routeLandmark: RouteLandmark
  ): Promise<RouteLandmark[]> {
    //get nearest cities; within 5 km
    try {
      const cities = await this.cityService.findCitiesByLocation(
        routeLandmark.position.coordinates.at(1),
        routeLandmark.position.coordinates.at(0),
        5 * 1000,
        200
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
        `${mm} route cities added: ${rc.length} for landmark: ${routeLandmark.landmarkName}`
      );
      const mark = await this.routeLandmarkModel.create(routeLandmark);
      Logger.log(`${mm} route landmark added: ${mark.landmarkName}`);
      const rem = await this.routeLandmarkModel
        .find({ routeId: mark.routeId })
        .sort({ index: 1 });
      return rem;
    } catch (e) {
      this.errorHandler.handleError(
        e,
        routeLandmark.associationId,
        routeLandmark.landmarkName
      );
      throw new HttpException(
        `addRouteLandmark failed: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public async deleteRouteLandmark(
    routeLandmarkId: string
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
      const res = await this.routeCityModel.deleteMany({
        routeLandmarkId: routeLandmarkId,
      });
      Logger.debug(`${mm} route city delete: ${JSON.stringify(res)}`);
    }
    const res2 = await this.routeLandmarkModel.deleteOne({
      landmarkId: routeLandmarkId,
    });
    Logger.debug(`${mm} route landmark delete: ${JSON.stringify(res2)}`);

    const res = await this.routeLandmarkModel
      .find({ routeId: mark.routeId })
      .sort({ index: 1 });

    Logger.log(
      `${mm} routeLandmark deleted successfully, returning remaining landmarks: ${res.length}`
    );

    return res;
  }
  public async deleteRoutePoint(routePointId: string): Promise<any> {
    const mark = await this.routePointModel.deleteOne({
      routePointId: routePointId,
    });

    Logger.log(`${mm} deleteRoutePoint successful: ${JSON.stringify(mark)}, }`);

    return mark;
  }
  public async addVehicleMediaRequest(
    vehicleMediaRequest: VehicleMediaRequest
  ): Promise<VehicleMediaRequest> {
    return await this.vehicleMediaRequestModel.create(vehicleMediaRequest);
  }
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest
  ): Promise<RouteUpdateRequest> {
    const res = await this.routeUpdateRequestModel.create(routeUpdateRequest);
    await this.messagingService.sendRouteUpdateMessage(routeUpdateRequest);
    return res;
  }
  public async updateRouteLandmark(
    routeLandmark: RouteLandmark
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
    radiusInKM: number
  ): Promise<Route[]> {
    return [];
  }
  public async findRouteLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number
  ): Promise<RouteLandmark[]> {
    Logger.debug(
      `${mm} findRouteLandmarksByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} limit: 5`
    );

    const query = {
      position: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: radiusInKM * 1000,
        },
      },
    };
    // Find documents based on our query
    const routeLandmarks = await this.routeLandmarkModel.find(query).limit(1);
    Logger.log(
      `${mm} route landmarks found by location: ${routeLandmarks.length}`
    );
    return routeLandmarks;
  }
  public async findRoutePointsByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number
  ): Promise<RoutePoint[]> {
    Logger.debug(
      `${mm} findRoutePointsByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} limit: 5`
    );

    const query = {
      position: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: radiusInKM * 1000,
        },
      },
    };
    // Find documents based on our query
    const routePoints = await this.routePointModel.find(query).limit(1);
    Logger.log(`${mm} route points found by location: ${routePoints.length}`);
    return routePoints;
  }
  public async getAssociationRoutePoints(
    associationId: string
  ): Promise<string> {
    const routePoints = await this.routePointModel.find({
      associationId: associationId,
    });
    const fileName = this.archiveService.zip([
      {
        contentString: JSON.stringify(routePoints),
      },
    ]);
    return fileName;
  }

  public async getAssociationRouteZippedFile(
    associationId: string
  ): Promise<string> {
    const routes = await this.routeModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} association: ${associationId}`
    );
    if (!associationId) {
      throw new Error(`${mm} association is undefined: 😈😈`);
    }
    if (routes.length == 0) {
      throw new Error(
        `${mm} association routes do not exist yet: 😈😈 ${associationId}`
      );
    }

    Logger.log(`${mm} getting all route data for 🔷🔷 ${routes.length} routes`);

    const assocData = new AssociationRouteData();
    assocData.associationId = associationId;
    assocData.routeDataList = [];
    await this.collectShit(routes, assocData);

    const mString = JSON.stringify(assocData);
    Logger.log(`${mm} ... string to archive: 🔷🔷 ${mString.length} bytes`);
    return this.archiveService.zip([
      {
        contentString: mString,
      },
    ]);
  }

  private async collectShit(routes: Route[], assocData: AssociationRouteData) {
    let landmarkCount = 0;
    let citiesCount = 0;
    let routePointsCount = 0;
    assocData.routeDataList = [];
    await Promise.all(
      routes.map(async (route) => {
        const routePoints = await this.routePointModel.find({
          routeId: route.routeId,
        });
        routePointsCount += routePoints.length;
        const marks = await this.routeLandmarkModel.find({
          routeId: route.routeId,
        });

        landmarkCount += marks.length;
        const cityList = await this.routeCityModel.find({
          routeId: route.routeId,
        });
        citiesCount += cityList.length;

        const routeData = new RouteData();
        routeData.route = route;
        routeData.cities =
          cityList.length > 1 ? this.removeDuplicates(cityList) : cityList;
        routeData.landmarks = marks;
        routeData.routePoints = routePoints;
        routeData.routeId = route.routeId;

        assocData.routeDataList.push(routeData);

        Logger.log(`${mm} route processed: 🍐🍐🍐 ${route.name}`);
        Logger.log(`${mm} route cities: 🍐🍐🍐 ${routeData.cities.length}`);
        Logger.log(
          `${mm} route landmarks: 🍐🍐🍐 ${routeData.landmarks.length}`
        );
        Logger.log(
          `${mm} route routePoints: 🍐🍐🍐 ${routeData.routePoints.length}\n\n`
        );
      })
    );
    //
    Logger.log(`${mm} Association route data collected 🔷🔷🔷🔷🔷🔷🔷🔷`);
    Logger.log(`${mm} to be packed:   🔷🔷 ${routes.length} routes`);
    Logger.log(`${mm} to be packed::  🔷🔷 ${landmarkCount} landmarks`);
    Logger.log(`${mm} to be packed::  🔷🔷 ${citiesCount} cities`);
    Logger.log(
      `${mm} to be packed::  🔷🔷 ${routePointsCount} route points\n\n`
    );
  }

  private removeDuplicates(cities: RouteCity[]): RouteCity[] {
    const uniqueCities = new Map<string, RouteCity>();
    cities.forEach((city) => {
      if (!uniqueCities.has(city.cityId)) {
        uniqueCities.set(city.cityId, city);
      }
    });

    Logger.debug(
      `${mm} deDuplicated cities: ${cities.length} to 🌼 ${Array.from(uniqueCities.values()).length}`
    );
    return Array.from(uniqueCities.values());
  }

  public async getAssociationRouteData(
    associationId: string
  ): Promise<AssociationRouteData> {
    const routes = await this.routeModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} getAssociationRouteData: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} association: ${associationId}`
    );
    if (!associationId) {
      throw new Error(`${mm} association is undefined: 😈😈`);
    }
    if (routes.length == 0) {
      throw new Error(
        `${mm} association routes do not exist yet: 😈😈 ${associationId}`
      );
    }
    Logger.log(`${mm} getting all route data for 🔷🔷 ${routes.length} routes`);

    const assocData = new AssociationRouteData();
    assocData.associationId = associationId;

    await this.collectShit(routes, assocData);

    const mLength = JSON.stringify(assocData).length;
    Logger.log(
      `\n\n ${mm} The size of the AssociationRouteData object is approximately ${mLength / 1024 / 1024} MB`
    );

    return assocData;
  }

  public async getAssociationRouteCities(
    associationId: string
  ): Promise<RouteCity[]> {
    return [];
  }
  public async putRouteLandmarksInOrder(
    routeId: string
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
    return this.archiveService.zip([{ contentString: json }]);
  }
  public async getRoute(routeId: string): Promise<Route> {
    return this.routeModel.findOne({ routeId: routeId });
  }
  /**
   * Delete route points starting nearest to supplied location and return remaining points
   * @param routeId
   * @returns string
   */
  public async deleteRoutePoints(routeId: string): Promise<any> {
    Logger.log(`${mm} delete routePoints for route: ${routeId}`);
    const query = {
      routeId: routeId,
    };
    // Find documents based on our query
    const points = await this.routePointModel.find(query);

    if (points.length == 0) {
      throw new Error("RoutePoints not found");
    }
    const point = points[0];
    //delete points
    const res = await this.routePointModel.deleteMany({
      routeId: point.routeId,
    });
    Logger.log(`${mm} Route points deleted: ${JSON.stringify(res)} `);

    //get remaining points
    const list = await this.routePointModel
      .find({
        routeId: point.routeId,
      })
      .sort({ index: 1 });

    Logger.debug(`${mm} Route points remaining: ${list.length} `);

    return list;
  }

  public async deleteRoutePointList(
    routePointList: RoutePointList
  ): Promise<RoutePoint[]> {
    Logger.log(
      `\n\n${mm} delete these RoutePoints: ${routePointList.routePoints.length} \n`
    );

    if (routePointList.routePoints.length == 0) {
      throw new HttpException("No route points", HttpStatus.BAD_REQUEST);
    }
    var resp = [];

    const routeId = routePointList.routePoints[0].routeId;
    for (const rp of routePointList.routePoints) {
      const b = await this.routePointModel.deleteOne({
        routePointId: rp.routePointId,
      });
      Logger.debug(`${mm} route point delete result: ${JSON.stringify(b)}`);
      resp.push(b);
    }
    Logger.log(`${mm} Route points deleted, results: ${JSON.stringify(resp)} `);
    //get remaining points
    const mList = await this.routePointModel
      .find({
        routeId: routeId,
      })
      .sort({ index: 1 });

    Logger.debug(
      `${mm} Route points remaining, returning: ${mList.length} points`
    );

    return mList;
  }
  async removeAllDuplicateRoutePoints(): Promise<any> {
    const list = await this.routeModel.find({});
    list.forEach((route) => {
      Logger.log(`${mm} Removing routePoints from ${route.name}`);
      this.removeDuplicateRoutePoints(route.routeId);
    });
    return { message: "removeAllDuplicateRoutePoints done" };
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
            _id: { index: "$index" },
            count: { $sum: 1 },
            ids: { $push: "$_id" },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]);

      Logger.log(
        `${mm} Duplicate route points found: ${duplicateRoutePoints.length}`
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
        `${mm} Duplicate route points removed successfully. ${cnt} routePoints`
      );
    } catch (error) {
      Logger.error("Error removing duplicate route points:", error);
    }
    return {
      message: `${mm} Duplicate route points removed successfully`,
      count: cnt,
    };
  }
}
function rt(value: Route, index: number, array: Route[]): void {
  throw new Error("Function not implemented.");
}
