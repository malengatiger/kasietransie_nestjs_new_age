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
import { Vehicle } from "src/data/models/Vehicle";
import { User } from "src/data/models/User";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { de } from "date-fns/locale";

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
    private routeModel: mongoose.Model<Route>,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(DispatchRecord.name)
    private dispatchRecordModel: mongoose.Model<DispatchRecord>,

    @InjectModel(CommuterRequest.name)
    private commuterRequestModel: mongoose.Model<CommuterRequest>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  public async deleteExcept(associationId: string): Promise<any> {
    Logger.log(`${mm} deleteExcept: ${associationId}`);

    const assocs = await this.assModel.find({});
    let results = [];
    assocs.forEach(async (a) => {
      if (a.associationId != associationId) {
        results.push(
          await this.deleteAssociationArtifacts(
            a.associationId,
            a.associationName
          )
        );
      }
    });
    results.forEach((c) => {
      Logger.debug(`${mm} association removed: ${JSON.stringify(c, null, 2)}`);
    });
    return results;
  }
  public async deleteAssociationArtifacts(
    associationId: string,
    name: string
  ): Promise<string> {
    Logger.log(`${mm} deleteAssociation: ${associationId} - ${name}`);

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

      var res5 = await this.vehicleModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} vehicles result: ${JSON.stringify(res5)}`);

      var res6 = await this.userModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} users result: ${JSON.stringify(res6)}`);

      var res7a = await this.dispatchRecordModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} dispatch records result: ${JSON.stringify(res7a)}`);

      var res7b = await this.commuterRequestModel.deleteMany({
        associationId: associationId,
      });
      Logger.debug(`${mm} dispatch records result: ${JSON.stringify(res7b)}`);

      var res7 = await this.assModel.deleteOne({
        associationId: associationId,
      });
      Logger.debug(`${mm} association result: ${JSON.stringify(res7)}`);

      return `Association artifacts deleted for associationId: ${associationId}`;
    } catch (e) {
      Logger.error(`${mm} Failed: ${e}`);
    }
  }

  public async copySelectedRoute(
    associationId: string,
    routeId: string
  ): Promise<any> {
    let routeCount = 0;
    const results: any[] = [];

    Logger.log(`\n\n\n${mm} copySelectedRoute starting ...`);
    Logger.log(`associationId: ${associationId};  routeId: ${routeId}`);

    try {
      const ass = await this.assModel.findOne({
        associationId: associationId,
      });
      Logger.log(
        `${mm} copy to association: ${ass.associationName} starting ...`
      );

      Logger.log(`${mm} copy route from database: ${routeId} ...`);
      var rt = await this.routeModel.findOne({ routeId: routeId });
      if (!rt) {
        throw new HttpException(`😈😈😈😈 Route not found: ${routeId}`, HttpStatus.BAD_REQUEST);
      }
      Logger.log(`${mm} route from database: ${JSON.stringify(rt, null, 2)} ...`);

      if (rt) {
        let pointsCount = 0;
        let landmarksCount = 0;
        let cityCount = 0;

        const newRoute = new Route();
        Logger.log(`\n${mm} route to be added: ${rt.name} ...`);
        newRoute.associationId = associationId;
        newRoute.associationName = ass.associationName;
        newRoute.routeId = randomUUID();
        newRoute.name = rt.name;
        newRoute.color = rt.color;
        newRoute.countryId = rt.countryId;
        newRoute.countryName = rt.countryName;
        newRoute.calculatedDistances = null;
        newRoute.created = new Date().toISOString();
        newRoute.routeStartEnd = rt.routeStartEnd;

        const res = await this.routeModel.create(newRoute);
        routeCount++;
        Logger.log(
          `\n${mm} route added to database assoc : ${ass.associationName} - ${res.name}`
        );

        const landmarks = await this.routeLandmarkModel.find({
          routeId: rt.routeId,
        });
        Logger.log(
          `${mm} ${landmarks.length} routeLandmarks to be created ...`
        );
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
          Logger.debug(
            `\n${mm} routeLandmark added to database: ${landmark.landmarkName} total: ${landmarksCount}`
          );
        });

        Logger.debug(
          `\n${mm} ${landmarksCount} routeLandmarks added to ${newRoute.name}`
        );

        const cities = await this.routeCityModel.find({
          routeId: rt.routeId,
        });
        Logger.log(`${mm} ${cities.length} routeCities to be created ...`);
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
          Logger.debug(
            `\n${mm} city added to database: ${routeCity.cityName} total: ${cityCount}`
          );
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
        Logger.log(
          `\n\n${mm} ${pointsCount} route points added to ${newRoute.name} `
        );
        results.push({
          route: rt.name,
          landmarks: landmarksCount,
          cities: cityCount,
          points: pointsCount,
        });
      }
      Logger.log(
        `\n\n${mm} ${routeCount} routes added to ${ass.associationName} `
      );
    } catch (e) {
      Logger.error(`${mm} Routes copy failed: ${e}`);
      throw new HttpException(
        `Routes copy failed: ${e}`,
        HttpStatus.BAD_REQUEST
      );
    }
    const msg = "🥬🥬🥬🥬 route copy complete! 🥬🥬🥬🥬";
    Logger.debug(`${mm} ${JSON.stringify(results, null, 2)} routes copied, msg: ${msg}`);
    for (var r in results) {
      Logger.log(`${mm} result: ${(JSON.stringify(r), null, 2)}`);
    }
    return results;
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
          Logger.log(
            `${mm} ${landmarks.length} routeLandmarks to be created ...`
          );
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
          Logger.log(`${mm} ${cities.length} routeCities to be created ...`);
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
      route.created = new Date().toISOString();
      const url = await this.storage.createQRCode({
        data: JSON.stringify(route),
        prefix: "route",
        size: 2,
        associationId: route.associationId,
      });
      route.qrCodeUrl = url;
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
      const list = await this.routeLandmarkModel
        .find({ routeId: mark.routeId })
        .sort({ index: 1 });
      return list;
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
    const mDate = new Date(vehicleMediaRequest.created);
    vehicleMediaRequest.mDate = mDate;
    return await this.vehicleMediaRequestModel.create(vehicleMediaRequest);
  }
  public async addRouteUpdateRequest(
    routeUpdateRequest: RouteUpdateRequest
  ): Promise<RouteUpdateRequest> {
    const mDate = new Date(routeUpdateRequest.created);
    routeUpdateRequest.mDate = mDate;
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
    Logger.debug(
      `${mm} findRoutesByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} `
    );
    const res = await this.findRoutePointsByLocation(
      latitude,
      longitude,
      radiusInKM
    );
    Logger.debug(`${mm} findRoutesByLocation: points: ${res.length} `);

    // Use a Set to store unique route IDs.
    const uniqueRouteIds = new Set<string>();
    res.forEach((r) => uniqueRouteIds.add(r.routeId));

    Logger.debug(`${mm} distinct routes: ${uniqueRouteIds.size}`);
    const list: Route[] = [];

    // Use Promise.all to wait for all database queries to complete
    await Promise.all(
      Array.from(uniqueRouteIds).map(async (routeId) => {
        const route = await this.routeModel.findOne({ routeId: routeId });
        if (route) {
          Logger.debug(`${mm} distinct route: 🍎 ${route.name}`);
          list.push(route);
        } else {
          Logger.error(`${mm} Route Id: ${routeId} NOT found`);
        }
      })
    );

    Logger.debug(`${mm} findRoutesByLocation: found ${list.length} routes`);
    return list;
  }

  private removeDuplicateRoutes(routes: Route[]): Route[] {
    const uniqueRoutes = new Map<string, Route>();

    routes.forEach((route) => {
      if (!uniqueRoutes.has(route.routeId)) {
        uniqueRoutes.set(route.routeId, route);
      }
    });

    return Array.from(uniqueRoutes.values());
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
    Logger.debug(
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
      `${mm} findRoutePointsByLocation: latitude: ${latitude} longitude: ${longitude} max: ${radiusInKM} km`
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
    const routePoints = await this.routePointModel.find(query);
    Logger.debug(`${mm} route points found by location: ${routePoints.length}`);
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
    if (!associationId) {
      throw new Error(`${mm} association is undefined: 😈😈`);
    }
    const routes = await this.routeModel.find({
      associationId: associationId,
    });
    Logger.log(
      `${mm} getAssociationRouteZippedFile: 🍎🍎 🍎🍎 🍎🍎 routes: ${routes.length} association: ${associationId}`
    );

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
  private async collectShitForRoute(
    route: Route,
    assocData: AssociationRouteData
  ) {
    let landmarkCount = 0;
    let citiesCount = 0;
    let routePointsCount = 0;
    assocData.routeDataList = [];
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
    Logger.log(`${mm} route landmarks: 🍐🍐🍐 ${routeData.landmarks.length}`);
    Logger.log(
      `${mm} route routePoints: 🍐🍐🍐 ${routeData.routePoints.length}\n\n`
    );
    //
    Logger.log(`${mm} Association route data collected 🔷🔷🔷🔷🔷🔷🔷🔷`);
    Logger.log(`${mm} to be packed:   🔷🔷 ${route.name} `);
    Logger.log(`${mm} to be packed::  🔷🔷 ${landmarkCount} landmarks`);
    Logger.log(`${mm} to be packed::  🔷🔷 ${citiesCount} cities`);
    Logger.log(
      `${mm} to be packed::  🔷🔷 ${routePointsCount} route points\n\n`
    );
    return assocData;
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
  public async getSingleRouteData(
    routeId: string
  ): Promise<AssociationRouteData> {
    const route = await this.routeModel.findOne({
      routeId: routeId,
    });
    Logger.log(`${mm} getSingleRouteData: 🍎🍎 🍎🍎 🍎🍎 route: ${routeId} `);

    if (route == null) {
      throw new HttpException("route does not exist", HttpStatus.BAD_REQUEST);
    }
    Logger.log(`${mm} getting all route data for 🔷🔷 ${route.name} `);

    const assocData = new AssociationRouteData();
    assocData.associationId = route.associationId;

    await this.collectShitForRoute(route, assocData);

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
  public async deleteAssociationRoutePoints(
    associationId: string
  ): Promise<any> {
    Logger.log(`${mm} delete routePoints for ass: ${associationId}`);
    const res = await this.routePointModel.deleteMany({
      associationId: associationId,
    });
    Logger.log(`${mm} Route points deleted: ${JSON.stringify(res)} `);
    return res;
  }
  public async deleteRoutePointsWithNoAssociation(): Promise<any> {
    Logger.log(`${mm} delete routePoints with no ass`);
    const res = await this.routePointModel.deleteMany({
      associationId: null,
    });
    Logger.log(`${mm} Route points deleted: ${JSON.stringify(res)} `);
    return res;
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

export interface RoutesToCopy {
  assocId: string;
  routeIds: string[];
}
