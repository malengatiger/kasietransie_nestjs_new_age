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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchRecordSchema = exports.DispatchRecord = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_1 = require("./position");
let DispatchRecord = class DispatchRecord {
};
exports.DispatchRecord = DispatchRecord;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "dispatchRecordId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "routeLandmarkId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "marshalId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], DispatchRecord.prototype, "passengers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "ownerId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", position_1.Position)
], DispatchRecord.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "landmarkName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "marshalName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "routeName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "routeId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "vehicleArrivalId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "vehicleReg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], DispatchRecord.prototype, "associationName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], DispatchRecord.prototype, "dispatched", void 0);
exports.DispatchRecord = DispatchRecord = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'DispatchRecord',
    })
], DispatchRecord);
exports.DispatchRecordSchema = mongoose_1.SchemaFactory.createForClass(DispatchRecord);
//# sourceMappingURL=DispatchRecord.js.map