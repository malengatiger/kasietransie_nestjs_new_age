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
exports.VehicleMediaRequestSchema = exports.VehicleMediaRequest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let VehicleMediaRequest = class VehicleMediaRequest {
};
exports.VehicleMediaRequest = VehicleMediaRequest;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "vehicleId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "vehicleReg", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "created", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "requesterId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "associationId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], VehicleMediaRequest.prototype, "requesterName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], VehicleMediaRequest.prototype, "addVideo", void 0);
exports.VehicleMediaRequest = VehicleMediaRequest = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: 'VehicleMediaRequest',
    })
], VehicleMediaRequest);
exports.VehicleMediaRequestSchema = mongoose_1.SchemaFactory.createForClass(VehicleMediaRequest);
//# sourceMappingURL=VehicleMediaRequest.js.map