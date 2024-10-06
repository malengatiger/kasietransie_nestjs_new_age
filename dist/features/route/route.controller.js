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
var RouteController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteController = void 0;
const common_1 = require("@nestjs/common");
const CalculatedDistanceList_1 = require("../../data/helpers/CalculatedDistanceList");
const Route_1 = require("../../data/models/Route");
const RouteCity_1 = require("../../data/models/RouteCity");
const RouteLandmark_1 = require("../../data/models/RouteLandmark");
const RouteUpdateRequest_1 = require("../../data/models/RouteUpdateRequest");
const RoutePointList_1 = require("../../data/models/RoutePointList");
const route_service_1 = require("./route.service");
const mm = ' 🚼 🚼 🚼 RouteController  🚼';
let RouteController = RouteController_1 = class RouteController {
    constructor(routeService) {
        this.routeService = routeService;
        this.logger = new common_1.Logger(RouteController_1.name);
    }
    async addRoute(route) {
        return await this.routeService.addRoute(route);
    }
    async addRouteLandmark(routeLandmark) {
        return await this.routeService.addRouteLandmark(routeLandmark);
    }
    async addRouteUpdateRequest(routeUpdateRequest) {
        return await this.routeService.addRouteUpdateRequest(routeUpdateRequest);
    }
    async addRouteCity(routeCity) {
        return await this.routeService.addRouteCity(routeCity);
    }
    async addRouteCities(routeCities) {
        return await this.routeService.addRouteCities(routeCities);
    }
    async addCalculatedDistances(distanceList) {
        return await this.routeService.addCalculatedDistances(distanceList.calculatedDistances);
    }
    async addRoutePoints(routePoints) {
        const res = await this.routeService.addRoutePoints(routePoints);
        common_1.Logger.log(`${mm} ... addRoutePoints result: ${res}`);
        return res;
    }
    async deleteRoutePointsFromIndex(query) {
        const list = await this.routeService.deleteRoutePointsFromIndex(query.routeId, query.index);
        return list;
    }
    async updateRouteColor(query) {
        const route = await this.routeService.updateRouteColor(query.routeId, query.color);
        return route;
    }
    async deleteRouteLandmark(query) {
        const result = await this.routeService.deleteRouteLandmark(query.routeLandmarkId);
        return result;
    }
    async removeAllDuplicateRoutePoints() {
        const result = await this.routeService.removeAllDuplicateRoutePoints();
        return result;
    }
    async getAssociationRoutes(query) {
        const list = await this.routeService.getAssociationRoutes(query.associationId);
        this.logger.log(`${mm} association routes found: ${list.length}`);
        return list;
    }
    async getAssociationRouteLandmarks(query) {
        const list = await this.routeService.getAssociationRouteLandmarks(query.associationId);
        this.logger.log(`${mm} routeLandmarks found: ${list.length}`);
        return list;
    }
    async getCalculatedDistances(query) {
        const list = await this.routeService.getCalculatedDistances(query.routeId);
        return list;
    }
    async getRoutePointsZipped(routeId, res) {
        try {
            const fileName = await this.routeService.getRoutePointsZipped(routeId);
            this.sendFile(fileName, res);
        }
        catch (error) {
            this.logger.error('Error getting route zipped file:', error);
            res.status(500).send('Error downloading file: ' + error.message);
        }
    }
    async deleteRoutePoints(query, res) {
        try {
            const fileName = await this.routeService.deleteRoutePoints(query.routeId);
            res.status(200).send(fileName);
        }
        catch (error) {
            this.logger.error('Error getting routePoint zipped file:', error);
            res.status(500).send('Error deleting RoutePoints: ' + error.message);
        }
    }
    async refreshRoute(routeId, res) {
        try {
            const fileName = await this.routeService.refreshRoute(routeId);
            this.sendFile(fileName, res);
        }
        catch (error) {
            this.logger.error('Error getting route zipped file:', error);
            res.status(500).send('Error downloading file: ' + error.message);
        }
    }
    async getAssociationRouteZippedFile(associationId, res) {
        try {
            const filePath = await this.routeService.getAssociationRouteZippedFile(associationId);
            this.sendFile(filePath, res);
        }
        catch (error) {
            this.logger.error('Error getting route zipped file:', error);
            res.status(500).send('Error downloading file: ' + error.message);
        }
    }
    async getRoutePointLandmarks(routeId) {
        try {
            const list = await this.routeService.getRouteLandmarks(routeId);
            return list;
        }
        catch (error) {
            this.logger.error('Error getting route landmarks:', error);
            throw error;
        }
    }
    async fix(routeId) {
        return await this.routeService.fix(routeId);
    }
    async getRoutePoints(routeId) {
        try {
            const list = await this.routeService.getRoutePoints(routeId);
            return list;
        }
        catch (error) {
            this.logger.error('Error getting route points:', error);
            throw error;
        }
    }
    sendFile(fileName, res) {
        this.logger.debug(`\n\n${mm} .... 💦💦💦💦💦 sending file ....\n💦💦 path:` + fileName);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=route.zip`);
        res.sendFile(fileName);
    }
};
exports.RouteController = RouteController;
__decorate([
    (0, common_1.Post)('addRoute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Route_1.Route]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRoute", null);
__decorate([
    (0, common_1.Post)('addRouteLandmark'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteLandmark_1.RouteLandmark]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRouteLandmark", null);
__decorate([
    (0, common_1.Post)('addRouteUpdateRequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteUpdateRequest_1.RouteUpdateRequest]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRouteUpdateRequest", null);
__decorate([
    (0, common_1.Post)('addRouteCity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RouteCity_1.RouteCity]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRouteCity", null);
__decorate([
    (0, common_1.Post)('addRouteCities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRouteCities", null);
__decorate([
    (0, common_1.Post)('addCalculatedDistances'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CalculatedDistanceList_1.CalculatedDistanceList]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addCalculatedDistances", null);
__decorate([
    (0, common_1.Post)('addRoutePoints'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RoutePointList_1.RoutePointList]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "addRoutePoints", null);
__decorate([
    (0, common_1.Get)('deleteRoutePointsFromIndex'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "deleteRoutePointsFromIndex", null);
__decorate([
    (0, common_1.Get)('updateRouteColor'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "updateRouteColor", null);
__decorate([
    (0, common_1.Get)('deleteRouteLandmark'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "deleteRouteLandmark", null);
__decorate([
    (0, common_1.Get)('removeAllDuplicateRoutePoints'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "removeAllDuplicateRoutePoints", null);
__decorate([
    (0, common_1.Get)('getAssociationRoutes'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getAssociationRoutes", null);
__decorate([
    (0, common_1.Get)('getAssociationRouteLandmarks'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getAssociationRouteLandmarks", null);
__decorate([
    (0, common_1.Get)('getCalculatedDistances'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getCalculatedDistances", null);
__decorate([
    (0, common_1.Get)('getRoutePointsZipped'),
    __param(0, (0, common_1.Query)('routeId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRoutePointsZipped", null);
__decorate([
    (0, common_1.Get)('deleteRoutePoints'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "deleteRoutePoints", null);
__decorate([
    (0, common_1.Get)('refreshRoute'),
    __param(0, (0, common_1.Query)('routeId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "refreshRoute", null);
__decorate([
    (0, common_1.Get)('getAssociationRouteZippedFile'),
    __param(0, (0, common_1.Query)('associationId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getAssociationRouteZippedFile", null);
__decorate([
    (0, common_1.Get)('getRouteLandmarks'),
    __param(0, (0, common_1.Query)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRoutePointLandmarks", null);
__decorate([
    (0, common_1.Get)('fix'),
    __param(0, (0, common_1.Query)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "fix", null);
__decorate([
    (0, common_1.Get)('getRoutePoints'),
    __param(0, (0, common_1.Query)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RouteController.prototype, "getRoutePoints", null);
exports.RouteController = RouteController = RouteController_1 = __decorate([
    (0, common_1.Controller)('routes'),
    __metadata("design:paramtypes", [route_service_1.RouteService])
], RouteController);
//# sourceMappingURL=route.controller.js.map