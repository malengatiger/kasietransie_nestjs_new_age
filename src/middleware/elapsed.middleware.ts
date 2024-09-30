import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AppService } from "src/app.service";
import { QueryElapsedTime } from "src/data/models/QueryElapsedTime";

const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  constructor(private readonly appService: AppService){}
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on("finish", async () => {
      const elapsed = (Date.now() - start) / 1000;
      Logger.log(
        `${mm} ${req.originalUrl} `
      );
      let tag = "🥬🥬🥬";
      if (res.statusCode > 201) {
        tag = "😈😈😈";
      }
      const qel = new QueryElapsedTime();
      qel
      Logger.log(
        `${mm} request took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`
      );
    });

    next();
  }
}
