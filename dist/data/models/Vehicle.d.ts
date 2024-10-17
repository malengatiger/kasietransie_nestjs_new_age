import { VehiclePhoto } from "./VehiclePhoto";
import { VehicleVideo } from "./VehicleVideo";
export declare class Vehicle {
    _partitionKey: string;
    _id: string;
    ownerId: string;
    cellphone: string;
    vehicleId: string;
    associationId: string;
    countryId: string;
    ownerName: string;
    associationName: string;
    vehicleReg: string;
    model: string;
    make: string;
    year: string;
    passengerCapacity: number;
    active: number;
    created: string;
    updated: string;
    dateInstalled: string;
    qrCodeUrl: string;
    photos: VehiclePhoto[];
    videos: VehicleVideo[];
}
export declare const VehicleSchema: import("mongoose").Schema<Vehicle, import("mongoose").Model<Vehicle, any, any, any, import("mongoose").Document<unknown, any, Vehicle> & Vehicle & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vehicle, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Vehicle>> & import("mongoose").FlatRecord<Vehicle> & Required<{
    _id: string;
}>>;
