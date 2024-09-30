import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AppService } from "src/app.service";
export declare class ElapsedTimeMiddleware implements NestMiddleware {
    private readonly appService;
    constructor(appService: AppService);
    use(req: Request, res: Response, next: NextFunction): void;
}
