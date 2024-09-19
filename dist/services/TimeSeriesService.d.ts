import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { VehicleHeartbeatAggregationResult } from 'src/data/helpers/VehicleHeartbeatAggregationResult';
import { VehicleHeartbeatTimeSeries } from '../data/models/VehicleHeartbeatTimeSeries';
import { FileArchiverService } from '../my-utils/zipper';
import { PassengerTimeSeries } from '../data/models/PassengerTimeSeries';
import { NewMongoService } from 'src/data/db_ping';
export declare class TimeSeriesService {
    private configService;
    private zipService;
    private readonly mongoService;
    private vehicleHeartbeatTimeSeriesModel;
    private passengerTimeSeriesModel;
    constructor(configService: ConfigService, zipService: FileArchiverService, mongoService: NewMongoService, vehicleHeartbeatTimeSeriesModel: mongoose.Model<VehicleHeartbeatTimeSeries>, passengerTimeSeriesModel: mongoose.Model<PassengerTimeSeries>);
    aggregateVehicleHeartbeatData(vehicleId: string, startDate: string): Promise<VehicleHeartbeatAggregationResult[]>;
    aggregateAssociationHeartbeatData(associationId: string, startDate: string): Promise<string>;
    parseDate(year: number, month: number, day: number, hour: number): string;
    getPassengerTimeSeries(associationId: string, routeId: string, startDate: string): Promise<any>;
    buildTimeSeries(collectionName: string, timeField: string, metaField: string): Promise<any>;
    addHeartbeatTimeSeries(associationId: string, vehicleId: string, vehicleReg: string): Promise<any>;
    addPassengerTimeSeries(associationId: string, vehicleId: string, vehicleReg: string, routeId: string, passengers: number): Promise<any>;
}
