import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AmbassadorCheckIn,
  AmbassadorCheckInSchema,
} from './models/AmbassadorCheckIn';
import {
  AmbassadorPassengerCount,
  AmbassadorPassengerCountSchema,
} from './models/AmbassadorPassengerCount';
import { AppError, AppErrorSchema } from './models/AppError';
import { Association, AssociationSchema } from './models/Association';
import {
  AssociationToken,
  AssociationTokenSchema,
} from './models/AssociationToken';
import {
  CalculatedDistance,
  CalculatedDistanceSchema,
} from './models/CalculatedDistance';
import { City, CitySchema } from './models/City';
import { Commuter, CommuterSchema } from './models/Commuter';
import {
  CommuterRequest,
  CommuterRequestSchema,
} from './models/CommuterRequest';
import {
  CommuterResponse,
  CommuterResponseSchema,
} from './models/CommuterResponse';
import { Country, CountrySchema } from './models/Country';
import { DispatchRecord, DispatchRecordSchema } from './models/DispatchRecord';
import { ExampleFile, ExampleFileSchema } from './models/ExampleFile';
import { Landmark, LandmarkSchema } from './models/Landmark';
import {
  LocationRequest,
  LocationRequestSchema,
} from './models/LocationRequest';
import {
  LocationResponse,
  LocationResponseSchema,
} from './models/LocationResponse';
import {
  PassengerTimeSeries,
  PassengerTimeSeriesSchema,
} from './models/PassengerTimeSeries';
import { Route, RouteSchema } from './models/Route';
import { RoutePoint, RoutePointSchema } from './models/RoutePoint';
import {
  RouteUpdateRequest,
  RouteUpdateRequestSchema,
} from './models/RouteUpdateRequest';
import { SettingsModel, SettingsModelSchema } from './models/SettingsModel';
import { User, UserSchema } from './models/User';
import {
  UserGeofenceEvent,
  UserGeofenceEventSchema,
} from './models/UserGeofenceEvent';
import { Vehicle, VehicleSchema } from './models/Vehicle';
import { VehicleArrival, VehicleArrivalSchema } from './models/VehicleArrival';
import {
  VehicleDeparture,
  VehicleDepartureSchema,
} from './models/VehicleDeparture';
import {
  VehicleHeartbeat,
  VehicleHeartbeatSchema,
} from './models/VehicleHeartbeat';
import {
  VehicleHeartbeatTimeSeries,
  VehicleHeartbeatTimeSeriesSchema,
} from './models/VehicleHeartbeatTimeSeries';
import {
  VehicleMediaRequest,
  VehicleMediaRequestSchema,
} from './models/VehicleMediaRequest';
import { VehiclePhoto, VehiclePhotoSchema } from './models/VehiclePhoto';
import { VehicleVideo, VehicleVideoSchema } from './models/VehicleVideo';
import {
  RouteAssignment,
  RouteAssignmentSchema,
} from './models/RouteAssignment';
import { StateProvince, StateProvinceSchema } from './models/StateProvince';
import { CountryService } from 'src/features/country/country.service';
import { CountryController } from 'src/features/country/country.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AmbassadorCheckIn.name, schema: AmbassadorCheckInSchema },
      {
        name: AmbassadorPassengerCount.name,
        schema: AmbassadorPassengerCountSchema,
      },
      {
        name: AppError.name,
        schema: AppErrorSchema,
      },
      {
        name: Association.name,
        schema: AssociationSchema,
      },
      {
        name: AssociationToken.name,
        schema: AssociationTokenSchema,
      },
      {
        name: CalculatedDistance.name,
        schema: CalculatedDistanceSchema,
      },
      {
        name: City.name,
        schema: CitySchema,
      },
      {
        name: Commuter.name,
        schema: CommuterSchema,
      },
      {
        name: CommuterRequest.name,
        schema: CommuterRequestSchema,
      },
      {
        name: CommuterRequest.name,
        schema: CommuterRequestSchema,
      },
      {
        name: CommuterResponse.name,
        schema: CommuterResponseSchema,
      },
      {
        name: Country.name,
        schema: CountrySchema,
      },
      {
        name: DispatchRecord.name,
        schema: DispatchRecordSchema,
      },

      {
        name: ExampleFile.name,
        schema: ExampleFileSchema,
      },
      {
        name: Landmark.name,
        schema: LandmarkSchema,
      },
      {
        name: LocationRequest.name,
        schema: LocationRequestSchema,
      },
      {
        name: LocationResponse.name,
        schema: LocationResponseSchema,
      },
      {
        name: PassengerTimeSeries.name,
        schema: PassengerTimeSeriesSchema,
      },
      {
        name: Route.name,
        schema: RouteSchema,
      },
      {
        name: RoutePoint.name,
        schema: RoutePointSchema,
      },
      {
        name: RouteUpdateRequest.name,
        schema: RouteUpdateRequestSchema,
      },
      {
        name: SettingsModel.name,
        schema: SettingsModelSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserGeofenceEvent.name,
        schema: UserGeofenceEventSchema,
      },
      {
        name: RouteUpdateRequest.name,
        schema: RouteUpdateRequestSchema,
      },
      {
        name: SettingsModel.name,
        schema: SettingsModelSchema,
      },
      {
        name: Vehicle.name,
        schema: VehicleSchema,
      },
      {
        name: VehicleArrival.name,
        schema: VehicleArrivalSchema,
      },
      {
        name: VehicleDeparture.name,
        schema: VehicleDepartureSchema,
      },
      {
        name: VehicleHeartbeat.name,
        schema: VehicleHeartbeatSchema,
      },
      {
        name: VehicleHeartbeatTimeSeries.name,
        schema: VehicleHeartbeatTimeSeriesSchema,
      },
      {
        name: VehicleMediaRequest.name,
        schema: VehicleMediaRequestSchema,
      },
      {
        name: VehiclePhoto.name,
        schema: VehiclePhotoSchema,
      },
      {
        name: VehicleVideo.name,
        schema: VehicleVideoSchema,
      },
      {
        name: RouteAssignment.name,
        schema: RouteAssignmentSchema,
      },
      {
        name: StateProvince.name,
        schema: StateProvinceSchema,
      },
    ]),
  ],
  controllers: [DataController, CountryController],
  providers: [DataService, CountryService],
})
export class DataModule {}
