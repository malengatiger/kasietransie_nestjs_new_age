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
exports.DispatchAsyncHelperService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Vehicle_1 = require("../data/models/Vehicle");
const Route_1 = require("../data/models/Route");
const mm = 'DispatchAsyncHelperService';
let DispatchAsyncHelperService = class DispatchAsyncHelperService {
    constructor(configService, vehicleModel, routeModel) {
        this.configService = configService;
        this.vehicleModel = vehicleModel;
        this.routeModel = routeModel;
    }
    async lambda$generateRouteDispatchRecordsInParallel$0(arg0, arg1, arg2, arg3, arg4) {
        return null;
    }
    async generateRouteDispatchRecordsInParallel(request) {
        return null;
    }
    async generateCommuterRequestsInParallel(associationId) {
        return [];
    }
};
exports.DispatchAsyncHelperService = DispatchAsyncHelperService;
exports.DispatchAsyncHelperService = DispatchAsyncHelperService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(Vehicle_1.Vehicle.name)),
    __param(2, (0, mongoose_1.InjectModel)(Route_1.Route.name)),
    __metadata("design:paramtypes", [config_1.ConfigService, mongoose_2.default.Model, mongoose_2.default.Model])
], DispatchAsyncHelperService);
//# sourceMappingURL=DispatchAsyncHelperService.js.map