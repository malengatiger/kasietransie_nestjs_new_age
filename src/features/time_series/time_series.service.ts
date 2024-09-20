/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Aggregate, Document, PipelineStage } from 'mongoose';
import { VehicleHeartbeatAggregationResult } from 'src/data/helpers/VehicleHeartbeatAggregationResult';

import * as moment from 'moment';
import { NewMongoService } from 'src/data/db_ping';
import { AssociationHeartbeatAggregationResult } from 'src/data/helpers/AssociationHeartbeatAggregationResult';
import { HeartbeatMeta } from 'src/data/models/HeartbeatMeta';
import { PassengerTimeSeries } from 'src/data/models/PassengerTimeSeries';
import { VehicleHeartbeatTimeSeries } from 'src/data/models/VehicleHeartbeatTimeSeries';
import { FileArchiverService } from 'src/my-utils/zipper';
const mm = 'TimeSeriesService';

@Injectable()
export class TimeSeriesService {
  constructor(
    private configService: ConfigService,
    private zipService: FileArchiverService,
    private readonly mongoService: NewMongoService,
    @InjectModel(VehicleHeartbeatTimeSeries.name)
    private vehicleHeartbeatTimeSeriesModel: mongoose.Model<VehicleHeartbeatTimeSeries>,
    @InjectModel(PassengerTimeSeries.name)
    private passengerTimeSeriesModel: mongoose.Model<PassengerTimeSeries>,
  ) {}

  public async aggregateVehicleHeartbeatData(
    vehicleId: string,
    startDate: string,
  ): Promise<VehicleHeartbeatAggregationResult[]> {
    return [];
  }
  public async aggregateAssociationHeartbeatData(
    associationId: string,
    startDate: string,
  ): Promise<string> {
    // Perform the aggregation using Mongoose
    const mDate = Date.parse(startDate); // Replace with the actual start date

    const result = await this.vehicleHeartbeatTimeSeriesModel.aggregate([
      {
        $match: {
          associationId: associationId, // Replace with the desired associationId
          timestamp: { $gte: new Date(startDate) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d-%H',
              date: '$timestamp',
              timezone: 'UTC',
            },
          },
          total: { $sum: '$count' },
        },
      },
    ]);
    // const results =
    //   await this.vehicleHeartbeatTimeSeriesModel.aggregate(aggregationPipeline);
    Logger.debug(`aggregation results: ${result.length}`);
    let sortedResults: AssociationHeartbeatAggregationResult[] = [];
    try {
      sortedResults = result.sort((a, b) => {
        const dt1 = this.parseDate(a.id.year, a.id.month, a.id.day, a.id.hour);
        const dt2 = this.parseDate(b.id.year, b.id.month, b.id.day, b.id.hour);
        return dt1.localeCompare(dt2);
      });

      Logger.log(
        `Total aggregates, sorted, to be zipped: ${sortedResults.length}`,
      );
    } catch (e) {
      Logger.error(e);
    }
    const mString: string = JSON.stringify(sortedResults);
    return await this.zipService.zip([{ content: mString }]);
  }
  parseDate(year: number, month: number, day: number, hour: number): string {
    const formattedYear = year.toString();
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();
    const formattedHour = hour < 10 ? `0${hour}` : hour.toString();

    return `${formattedYear}-${formattedMonth}-${formattedDay}-${formattedHour}`;
  }
  public async getPassengerTimeSeries(
    associationId: string,
    routeId: string,
    startDate: string,
  ): Promise<any> {
    const result = await this.passengerTimeSeriesModel
      .aggregate([
        {
          $match: {
            associationId: associationId,
            routeId: routeId,
            timestamp: {
              $gte: new Date(startDate),
            },
          },
        },
        {
          $addFields: {
            hour: {
              $dateToString: {
                format: '%Y-%m-%d %H:00:00',
                date: '$timestamp',
                timezone: 'UTC',
              },
            },
          },
        },
        {
          $group: {
            _id: '$hour',
            totalPassengers: { $sum: '$passengers' },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ])
      .exec();
    Logger.log(
      `Aggregation complete: ${result.length} passenger aggregates created`,
    );
    return result;
  }
  public async buildTimeSeries(
    collectionName: string,
    timeField: string,
    metaField: string,
  ): Promise<any> {
    //CustomResponse
    return null;
  }
  public async addHeartbeatTimeSeries(
    associationId: string,
    vehicleId: string,
    vehicleReg: string,
  ): Promise<any> {
    const hbm: HeartbeatMeta = new HeartbeatMeta();
    hbm.associationId = associationId;
    hbm.vehicleId = vehicleId;
    hbm.vehicleReg = vehicleReg;

    const series: VehicleHeartbeatTimeSeries = new VehicleHeartbeatTimeSeries();
    series.count = 1;
    series.metaData = hbm;
    series.timestamp = new Date();
    series.associationId = associationId;
    series.vehicleId = vehicleId;

    return await this.vehicleHeartbeatTimeSeriesModel.create(series);
  }
  public async addPassengerTimeSeries(
    associationId: string,
    vehicleId: string,
    vehicleReg: string,
    routeId: string,
    passengers: number,
  ): Promise<any> {
    const hbm: HeartbeatMeta = new HeartbeatMeta();
    hbm.associationId = associationId;
    hbm.vehicleId = vehicleId;
    hbm.vehicleReg = vehicleReg;

    const series: PassengerTimeSeries = new PassengerTimeSeries();
    series.passengers = passengers;
    series.metaData = hbm;
    series.timestamp = new Date();
    series.associationId = associationId;
    series.vehicleId = vehicleId;
    series.routeId = routeId;

    return await this.passengerTimeSeriesModel.create(series);
  }
}
