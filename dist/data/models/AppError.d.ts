import { Position } from "./position";
export declare class AppError {
    appErrorId: string;
    associationId: string;
    errorMessage: string;
    manufacturer: string;
    model: string;
    created: string;
    brand: string;
    userId: string;
    userName: string;
    errorPosition: Position;
    iosName: string;
    versionCodeName: string;
    baseOS: string;
    deviceType: string;
    iosSystemName: string;
    userUrl: string;
    uploadedDate: string;
    vehicleId: string;
    vehicleReg: string;
}
export declare const AppErrorSchema: import("mongoose").Schema<AppError, import("mongoose").Model<AppError, any, any, any, import("mongoose").Document<unknown, any, AppError> & AppError & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppError, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AppError>> & import("mongoose").FlatRecord<AppError> & {
    _id: import("mongoose").Types.ObjectId;
}>;
