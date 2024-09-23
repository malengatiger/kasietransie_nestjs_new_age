"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const storage_controller_1 = require("./storage.controller");
const mongoose_1 = require("@nestjs/mongoose");
const ExampleFile_1 = require("../data/models/ExampleFile");
const VehiclePhoto_1 = require("../data/models/VehiclePhoto");
const VehicleVideo_1 = require("../data/models/VehicleVideo");
const Vehicle_1 = require("../data/models/Vehicle");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "ExampleFile", schema: ExampleFile_1.ExampleFileSchema },
                { name: "VehicleVideo", schema: VehicleVideo_1.VehicleVideoSchema },
                { name: "VehiclePhoto", schema: VehiclePhoto_1.VehiclePhotoSchema },
                { name: "Vehicle", schema: Vehicle_1.VehicleSchema },
            ])
        ],
        controllers: [storage_controller_1.StorageController],
        providers: [storage_service_1.CloudStorageUploaderService],
    })
], StorageModule);
//# sourceMappingURL=storage.module.js.map