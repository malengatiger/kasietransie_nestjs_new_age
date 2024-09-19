import { HttpException } from '@nestjs/common';
export declare class KasieError extends HttpException {
    _partitionKey: string;
    _id: string;
    statusCode: number;
    message: string;
    date: string;
    request: string;
    constructor(statusCode: number, message: string, request: string);
}
export declare const KasieErrorSchema: import("mongoose").Schema<KasieError, import("mongoose").Model<KasieError, any, any, any, import("mongoose").Document<unknown, any, KasieError> & KasieError & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, KasieError, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<KasieError>> & import("mongoose").FlatRecord<KasieError> & Required<{
    _id: string;
}>>;
