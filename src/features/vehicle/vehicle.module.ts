import { Module } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { AssociationService } from "../association/association.service";
import { MessagingService } from "../fcm/fcm.service";
import { VehicleSchema } from "src/data/models/Vehicle";
import { MongooseModule } from "@nestjs/mongoose";
import { DispatchRecordSchema } from "src/data/models/DispatchRecord";
import { VehicleArrivalSchema } from "src/data/models/VehicleArrival";
import { VehicleDepartureSchema } from "src/data/models/VehicleDeparture";
import { VehicleHeartbeatSchema } from "src/data/models/VehicleHeartbeat";
import { AmbassadorPassengerCountSchema } from "src/data/models/AmbassadorPassengerCount";
import { AssociationSchema } from "src/data/models/Association";
import { UserSchema } from "src/data/models/User";
import { RouteAssignmentSchema } from "src/data/models/RouteAssignment";
import { RouteSchema } from "src/data/models/Route";
import { FileArchiverService } from "src/my-utils/zipper";
import { UserService } from "../user/user.service";
import { UserGeofenceEventSchema } from "src/data/models/UserGeofenceEvent";
import { CityService } from "../city/city.service";
import { CitySchema } from "src/data/models/City";
import { NewMongoService } from "src/data/db_ping";
import { CommuterSchema } from "src/data/models/Commuter";
import { AppErrorSchema } from "src/data/models/AppError";
import { KasieErrorSchema } from "src/data/models/kasie.error";
import { ExampleFileSchema } from "src/data/models/ExampleFile";
import { CountrySchema } from "src/data/models/Country";
import { AssociationTokenSchema } from "src/data/models/AssociationToken";
import { SettingsModelSchema } from "src/data/models/SettingsModel";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Vehicle", schema: VehicleSchema },
      { name: "DispatchRecord", schema: DispatchRecordSchema },
      { name: "VehicleArrival", schema: VehicleArrivalSchema },
      { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      { name: "Association", schema: AssociationSchema },
      { name: "RouteAssignment", schema: RouteAssignmentSchema },
      { name: "User", schema: UserSchema },
      { name: "Route", schema: RouteSchema },
      { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      { name: "City", schema: CitySchema },
      { name: "Commuter", schema: CommuterSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "Country", schema: CountrySchema },
      { name: "AssociationToken", schema: AssociationTokenSchema },
      { name: "SettingsModel", schema: SettingsModelSchema },
      { name: "KasieError", schema: KasieErrorSchema },

      { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],
  controllers: [VehicleController],
  providers: [VehicleService, UserService, 
    CityService, NewMongoService,
    AssociationService, MessagingService, FileArchiverService],
})
export class VehicleModule {}
