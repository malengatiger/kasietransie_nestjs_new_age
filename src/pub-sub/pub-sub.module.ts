import { Module } from '@nestjs/common';
import { PubSubService } from './pub-sub.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AmbassadorPassengerCountSchema } from 'src/data/models/AmbassadorPassengerCount';
import { AppErrorSchema } from 'src/data/models/AppError';
import { AssociationSchema } from 'src/data/models/Association';
import { AssociationTokenSchema } from 'src/data/models/AssociationToken';
import { CitySchema } from 'src/data/models/City';
import { CommuterSchema } from 'src/data/models/Commuter';
import { CommuterCashCheckInSchema } from 'src/data/models/CommuterCashCheckIn';
import { CommuterCashPaymentSchema } from 'src/data/models/CommuterCashPayment';
import { CommuterRequestSchema } from 'src/data/models/CommuterRequest';
import { CountrySchema } from 'src/data/models/Country';
import { DispatchRecordSchema } from 'src/data/models/DispatchRecord';
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { FuelBrandSchema } from 'src/data/models/FuelBrand';
import { FuelTopUpSchema } from 'src/data/models/FuelTopUp';
import { KasieErrorSchema } from 'src/data/models/kasie.error';
import { RankFeeCashCheckInSchema } from 'src/data/models/RankFeeCashCheckIn';
import { RankFeeCashPaymentSchema } from 'src/data/models/RankFeeCashPayment';
import { RouteSchema } from 'src/data/models/Route';
import { RouteAssignmentSchema } from 'src/data/models/RouteAssignment';
import { SettingsModelSchema } from 'src/data/models/SettingsModel';
import { TripSchema } from 'src/data/models/Trip';
import { UserSchema } from 'src/data/models/User';
import { UserGeofenceEventSchema } from 'src/data/models/UserGeofenceEvent';
import { UserPhotoSchema } from 'src/data/models/UserPhoto';
import { VehicleSchema } from 'src/data/models/Vehicle';
import { VehicleArrivalSchema } from 'src/data/models/VehicleArrival';
import { VehicleDepartureSchema } from 'src/data/models/VehicleDeparture';
import { VehicleHeartbeatSchema } from 'src/data/models/VehicleHeartbeat';
import { VehicleMediaRequestSchema } from 'src/data/models/VehicleMediaRequest';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleTelemetrySchema } from 'src/data/models/VehicleTelemetry';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { CarSummaryController } from 'src/pub-sub/pub-sub.controller';
import { AssociationController } from 'src/features/association/association.controller';
import { AssociationService } from 'src/features/association/association.service';
import { CityService } from 'src/features/city/city.service';
import { DispatchService } from 'src/features/dispatch/dispatch.service';
import { MessagingService } from 'src/features/fcm/fcm.service';
import { UserService } from 'src/features/user/user.service';
import { VehicleService } from 'src/features/vehicle/vehicle.service';
import { KasieErrorHandler } from 'src/middleware/errors.interceptor';
import { FileArchiverService } from 'src/my-utils/zipper';
import { FirebaseAdmin } from 'src/services/firebase_util';
import { CloudStorageUploaderService } from 'src/storage/storage.service';

@Module({
  imports: [
    
      MongooseModule.forFeature([
        { name: "Vehicle", schema: VehicleSchema },
        { name: "DispatchRecord", schema: DispatchRecordSchema },
        { name: "VehicleArrival", schema: VehicleArrivalSchema },
        { name: "VehicleVideo", schema: VehicleVideoSchema },
        { name: "VehiclePhoto", schema: VehiclePhotoSchema },
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
        { name: "UserPhoto", schema: UserPhotoSchema },
        { name: "CommuterCashPayment", schema: CommuterCashPaymentSchema },
        { name: "CommuterCashCheckIn", schema: CommuterCashCheckInSchema },
        { name: "RankFeeCashPayment", schema: RankFeeCashPaymentSchema },
        { name: "RankFeeCashCheckIn", schema: RankFeeCashCheckInSchema },
        
        { name: "Trip", schema: TripSchema },
        { name: "VehicleTelemetry", schema: VehicleTelemetrySchema },
        { name: "CommuterRequest", schema: CommuterRequestSchema },
  
        { name: "FuelTopUp", schema: FuelTopUpSchema },
        { name: "FuelBrand", schema: FuelBrandSchema },
  
        { name: "VehicleMediaRequest", schema: VehicleMediaRequestSchema },
  
        { name: "AmbassadorPassengerCount", schema: AmbassadorPassengerCountSchema },
      ]),
    ],
    
  controllers: [CarSummaryController],
  providers: [PubSubService, 
    KasieErrorHandler, FirebaseAdmin,
    DispatchService,
    AssociationService, FileArchiverService,
    UserService, CityService, MessagingService,
    VehicleService, CloudStorageUploaderService],
})

export class PubSubModule {}
