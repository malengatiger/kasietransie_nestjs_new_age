"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchModule = void 0;
const common_1 = require("@nestjs/common");
const dispatch_service_1 = require("./dispatch.service");
const dispatch_controller_1 = require("./dispatch.controller");
const zipper_1 = require("../../my-utils/zipper");
const fcm_service_1 = require("../fcm/fcm.service");
const kasie_error_1 = require("../../data/models/kasie.error");
const mongoose_1 = require("@nestjs/mongoose");
const AppError_1 = require("../../data/models/AppError");
const AmbassadorPassengerCount_1 = require("../../data/models/AmbassadorPassengerCount");
const DispatchRecord_1 = require("../../data/models/DispatchRecord");
let DispatchModule = class DispatchModule {
};
exports.DispatchModule = DispatchModule;
exports.DispatchModule = DispatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: "AppError", schema: AppError_1.AppErrorSchema },
                { name: "KasieError", schema: kasie_error_1.KasieErrorSchema },
                { name: "DispatchRecord", schema: DispatchRecord_1.DispatchRecordSchema },
                {
                    name: "AmbassadorPassengerCount",
                    schema: AmbassadorPassengerCount_1.AmbassadorPassengerCountSchema,
                },
            ]),
        ],
        controllers: [dispatch_controller_1.DispatchController],
        providers: [dispatch_service_1.DispatchService, fcm_service_1.MessagingService, zipper_1.FileArchiverService],
    })
], DispatchModule);
//# sourceMappingURL=dispatch.module.js.map