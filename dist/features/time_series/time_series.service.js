"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSeriesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const HeartbeatMeta_1 = require("../../data/models/HeartbeatMeta");
const PassengerTimeSeries_1 = require("../../data/models/PassengerTimeSeries");
const VehicleHeartbeatTimeSeries_1 = require("../../data/models/VehicleHeartbeatTimeSeries");
const zipper_1 = require("../../my-utils/zipper");
const mm = 'TimeSeriesService';
let TimeSeriesService = class TimeSeriesService {
    constructor(configService, zipService, vehicleHeartbeatTimeSeriesModel, passengerTimeSeriesModel) {
        this.configService = configService;
        this.zipService = zipService;
        this.vehicleHeartbeatTimeSeriesModel = vehicleHeartbeatTimeSeriesModel;
        this.passengerTimeSeriesModel = passengerTimeSeriesModel;
    }
    async aggregateVehicleHeartbeatData(vehicleId, startDate) {
        return [];
    }
    async aggregateAssociationHeartbeatData(associationId, startDate) {
        const mDate = Date.parse(startDate);
        const result = await this.vehicleHeartbeatTimeSeriesModel.aggregate([
            {
                $match: {
                    associationId: associationId,
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
        common_1.Logger.debug(`aggregation results: ${result.length}`);
        let sortedResults = [];
        try {
            sortedResults = result.sort((a, b) => {
                const dt1 = this.parseDate(a.id.year, a.id.month, a.id.day, a.id.hour);
                const dt2 = this.parseDate(b.id.year, b.id.month, b.id.day, b.id.hour);
                return dt1.localeCompare(dt2);
            });
            common_1.Logger.log(`Total aggregates, sorted, to be zipped: ${sortedResults.length}`);
        }
        catch (e) {
            common_1.Logger.error(e);
        }
        const mString = JSON.stringify(sortedResults);
        return await this.zipService.zip([{ contentString: mString }]);
    }
    parseDate(year, month, day, hour) {
        const formattedYear = year.toString();
        const formattedMonth = month < 10 ? `0${month}` : month.toString();
        const formattedDay = day < 10 ? `0${day}` : day.toString();
        const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
        return `${formattedYear}-${formattedMonth}-${formattedDay}-${formattedHour}`;
    }
    async getPassengerTimeSeries(associationId, routeId, startDate) {
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
        common_1.Logger.log(`Aggregation complete: ${result.length} passenger aggregates created`);
        return result;
    }
    async buildTimeSeries(collectionName, timeField, metaField) {
        return null;
    }
    async addHeartbeatTimeSeries(associationId, vehicleId, vehicleReg) {
        const hbm = new HeartbeatMeta_1.HeartbeatMeta();
        hbm.associationId = associationId;
        hbm.vehicleId = vehicleId;
        hbm.vehicleReg = vehicleReg;
        const series = new VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeries();
        series.count = 1;
        series.metaData = hbm;
        series.timestamp = new Date();
        series.associationId = associationId;
        series.vehicleId = vehicleId;
        return await this.vehicleHeartbeatTimeSeriesModel.create(series);
    }
    async addPassengerTimeSeries(associationId, vehicleId, vehicleReg, routeId, passengers) {
        const hbm = new HeartbeatMeta_1.HeartbeatMeta();
        hbm.associationId = associationId;
        hbm.vehicleId = vehicleId;
        hbm.vehicleReg = vehicleReg;
        const series = new PassengerTimeSeries_1.PassengerTimeSeries();
        series.passengers = passengers;
        series.metaData = hbm;
        series.timestamp = new Date();
        series.associationId = associationId;
        series.vehicleId = vehicleId;
        series.routeId = routeId;
        return await this.passengerTimeSeriesModel.create(series);
    }
};
exports.TimeSeriesService = TimeSeriesService;
exports.TimeSeriesService = TimeSeriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(VehicleHeartbeatTimeSeries_1.VehicleHeartbeatTimeSeries.name)),
    __param(3, (0, mongoose_1.InjectModel)(PassengerTimeSeries_1.PassengerTimeSeries.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        zipper_1.FileArchiverService, mongoose_2.default.Model, mongoose_2.default.Model])
], TimeSeriesService);
//# sourceMappingURL=time_series.service.js.map