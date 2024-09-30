import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppService } from "src/app.service";
import { QueryElapsedTime } from "src/data/models/QueryElapsedTime";
export declare class ElapsedTimeMiddleware implements NestMiddleware {
    private readonly appService;
    private qelModel;
    constructor(appService: AppService, qelModel: mongoose.Model<QueryElapsedTime>);
    use(req: Request, res: Response, next: NextFunction): void;
}
