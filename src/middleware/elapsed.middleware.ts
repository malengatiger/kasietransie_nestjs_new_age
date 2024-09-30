import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
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
      Logger.log(
        `${mm} request took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`
      );
    });

    next();
  }
}
