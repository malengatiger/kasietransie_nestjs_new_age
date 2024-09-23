import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { VehicleHeartbeatAggregationResult } from 'src/data/helpers/VehicleHeartbeatAggregationResult';
import { PassengerTimeSeries } from 'src/data/models/PassengerTimeSeries';
import { VehicleHeartbeatTimeSeries } from 'src/data/models/VehicleHeartbeatTimeSeries';
import { FileArchiverService } from 'src/my-utils/zipper';
export declare class TimeSeriesService {
    private configService;
    private zipService;
    private vehicleHeartbeatTimeSeriesModel;
    private passengerTimeSeriesModel;
    constructor(configService: ConfigService, zipService: FileArchiverService, vehicleHeartbeatTimeSeriesModel: mongoose.Model<VehicleHeartbeatTimeSeries>, passengerTimeSeriesModel: mongoose.Model<PassengerTimeSeries>);
    aggregateVehicleHeartbeatData(vehicleId: string, startDate: string): Promise<VehicleHeartbeatAggregationResult[]>;
    aggregateAssociationHeartbeatData(associationId: string, startDate: string): Promise<string>;
    parseDate(year: number, month: number, day: number, hour: number): string;
    getPassengerTimeSeries(associationId: string, routeId: string, startDate: string): Promise<any>;
    buildTimeSeries(collectionName: string, timeField: string, metaField: string): Promise<any>;
    addHeartbeatTimeSeries(associationId: string, vehicleId: string, vehicleReg: string): Promise<any>;
    addPassengerTimeSeries(associationId: string, vehicleId: string, vehicleReg: string, routeId: string, passengers: number): Promise<any>;
}
