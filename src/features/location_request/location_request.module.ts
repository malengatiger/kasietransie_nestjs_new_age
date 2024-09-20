import { Module } from '@nestjs/common';
import { LocationRequestService } from './location_request.service';
import { LocationRequestController } from './location_request.controller';
import { MessagingService } from '../fcm/fcm.service';
import { DataModule } from 'src/data/data.module';
import { LocationRequest, LocationRequestSchema } from 'src/data/models/LocationRequest';
import { MongooseModule } from '@nestjs/mongoose';
import { AmbassadorPassengerCountSchema } from 'src/data/models/AmbassadorPassengerCount';
import { AppErrorSchema } from 'src/data/models/AppError';
import { AssociationSchema } from 'src/data/models/Association';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { CitySchema } from 'src/data/models/City';
import { CommuterSchema } from 'src/data/models/Commuter';
import { CountrySchema } from 'src/data/models/Country';
import { DispatchRecordSchema } from 'src/data/models/DispatchRecord';
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { RouteSchema } from 'src/data/models/Route';
import { RouteAssignmentSchema } from 'src/data/models/RouteAssignment';
import { SettingsModelSchema } from 'src/data/models/SettingsModel';
import { UserSchema } from 'src/data/models/User';
import { UserGeofenceEventSchema } from 'src/data/models/UserGeofenceEvent';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { VehicleArrivalSchema } from 'src/data/models/VehicleArrival';
import { VehicleDepartureSchema } from 'src/data/models/VehicleDeparture';
import { VehicleHeartbeatSchema } from 'src/data/models/VehicleHeartbeat';
import { LocationResponseSchema } from 'src/data/models/LocationResponse';

@Module({
  imports: [
    MongooseModule.forFeature([
      // { name: "Vehicle", schema: VehicleSchema },
      // { name: "DispatchRecord", schema: DispatchRecordSchema },
      // { name: "VehicleArrival", schema: VehicleArrivalSchema },
      // { name: "VehicleDeparture", schema: VehicleDepartureSchema },
      // { name: "VehicleHeartbeat", schema: VehicleHeartbeatSchema },
      // { name: "Association", schema: AssociationSchema },
      // { name: "RouteAssignment", schema: RouteAssignmentSchema },
      // { name: "User", schema: UserSchema },
      // { name: "Route", schema: RouteSchema },
      // { name: "UserGeofenceEvent", schema: UserGeofenceEventSchema },
      // { name: "City", schema: CitySchema },
      // { name: "Commuter", schema: CommuterSchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      // { name: "ExampleFile", schema: ExampleFileSchema },
      // { name: "Country", schema: CountrySchema },
      // { name: "AssociationToken", schema: AssociationTokenSchema },
      // { name: "SettingsModel", schema: SettingsModelSchema },
      { name: "LocationRequest", schema: LocationRequestSchema },
      { name: "LocationResponse", schema: LocationResponseSchema },

      { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
    ]),
  ],
  controllers: [LocationRequestController],
  providers: [LocationRequestService, MessagingService],
})
export class LocationRequestModule {}
