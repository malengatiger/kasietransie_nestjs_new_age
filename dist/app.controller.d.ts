import { AppService } from "./app.service";
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    shakeKasieUp(): Promise<string>;
    get(ip: string): string;
    getAppIPaddress2(req: Request): Promise<string>;
}
