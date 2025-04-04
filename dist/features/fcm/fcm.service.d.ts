import { VehicleArrival } from "src/data/models/VehicleArrival";
import { DispatchRecord } from "src/data/models/DispatchRecord";
import { VehicleHeartbeat } from "src/data/models/VehicleHeartbeat";
import { AmbassadorPassengerCount } from "src/data/models/AmbassadorPassengerCount";
import { RouteUpdateRequest } from "src/data/models/RouteUpdateRequest";
import mongoose from "mongoose";
import { AppErrors } from "src/data/helpers/AppErrors";
import { AppError } from "src/data/models/AppError";
import { CommuterRequest } from "src/data/models/CommuterRequest";
import { CommuterResponse } from "src/data/models/CommuterResponse";
import { LocationRequest } from "src/data/models/LocationRequest";
import { LocationResponse } from "src/data/models/LocationResponse";
import { VehicleDeparture } from "src/data/models/VehicleDeparture";
import { KasieError } from "src/data/models/kasie.error";
import { Association } from "src/data/models/Association";
import { AssociationToken } from "src/data/models/AssociationToken";
import { VehicleTelemetry } from "src/data/models/VehicleTelemetry";
import { CommuterCashPayment } from "src/data/models/CommuterCashPayment";
import { CommuterCashCheckIn } from "src/data/models/CommuterCashCheckIn";
import { RankFeeCashPayment } from "src/data/models/RankFeeCashPayment";
import { RankFeeCashCheckIn } from "src/data/models/RankFeeCashCheckIn";
import { Trip } from "src/data/models/Trip";
import { LocationResponseError } from "src/data/models/LocationResponseError";
import { CommuterPickup } from "src/data/models/CommuterPickup";
import { FirebaseAdmin } from "src/services/firebase_util";
export declare class MessagingService {
    private readonly firebaseAdmin;
    private associationTokenModel;
    private kasieModel;
    constructor(firebaseAdmin: FirebaseAdmin, associationTokenModel: mongoose.Model<AssociationToken>, kasieModel: mongoose.Model<KasieError>);
    sendAppErrorMessages(appErrors: AppErrors): Promise<void>;
    sendAppErrorMessage(appError: AppError): Promise<void>;
    sendKasieErrorMessage(kasieError: KasieError): Promise<void>;
    sendLocationRequestMessage(locationRequest: LocationRequest): Promise<void>;
    sendLocationRequestMessageToDevice(locationRequest: LocationRequest): Promise<void>;
    sendLocationResponseMessage(locationResponse: LocationResponse): Promise<void>;
    sendLocationResponseErrorMessage(locationResponse: LocationResponseError): Promise<void>;
    sendLocationResponseErrorMessageToDevice(locationResponseError: LocationResponseError): Promise<void>;
    sendVehicleArrivalMessage(arrival: VehicleArrival): Promise<void>;
    sendVehicleDepartureMessage(departure: VehicleDeparture): Promise<void>;
    sendDispatchMessage(dispatch: DispatchRecord): Promise<void>;
    sendRouteDispatchMessage(dispatch: DispatchRecord): Promise<void>;
    sendCommuterCashMessage(payment: CommuterCashPayment): Promise<void>;
    sendCommuterCashCheckInMessage(checkIn: CommuterCashCheckIn): Promise<void>;
    sendCommuterPickupMessage(pickup: CommuterPickup): Promise<void>;
    sendRankFeeCashMessage(payment: RankFeeCashPayment): Promise<void>;
    sendRankFeeCashCheckInMessage(checkIn: RankFeeCashCheckIn): Promise<void>;
    sendHeartbeatMessage(heartbeat: VehicleHeartbeat): Promise<void>;
    sendTelemetryMessage(telemetry: VehicleTelemetry): Promise<void>;
    sendTripMessage(trip: Trip): Promise<void>;
    sendPassengerCountMessage(count: AmbassadorPassengerCount): Promise<void>;
    sendRouteUpdateMessage(req: RouteUpdateRequest): Promise<void>;
    sendCommuterRequestMessage(req: CommuterRequest): Promise<void>;
    sendInitialCommuterRequestResponseMessage(response: CommuterResponse): Promise<void>;
    sendLocationResponseMessageToDevice(response: LocationResponse): Promise<void>;
    sendCommuterResponseMessageToTopic(response: CommuterResponse): Promise<void>;
    sendAssociationRegisteredMessage(assoc: Association): Promise<void>;
    sendToTopic(topic: string, title: string, body: string, type: string, data: string, associationId: string): Promise<void>;
    sendToDevice(fcmToken: string, title: string, body: string, type: string, data: string): Promise<void>;
    sendToPossibleAssociationDevices(associationId: string, title: string, body: string, type: string, data: string): Promise<void>;
    checkIfValid(token: string): Promise<boolean>;
    subscribeToEveryThing(): Promise<any>;
}
