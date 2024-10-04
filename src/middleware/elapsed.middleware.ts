import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AppService } from "src/app.service";
import { QueryElapsedTime } from "src/data/models/QueryElapsedTime";

const mm = " 🔇 🔇 🔇 ElapsedTimeMiddleware 🌸";
@Injectable()
export class ElapsedTimeMiddleware implements NestMiddleware {
  constructor(
    private readonly appService: AppService,
    @InjectModel(QueryElapsedTime.name)
    private qelModel: mongoose.Model<QueryElapsedTime>
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    Logger.debug(`${mm} User IP Address: ${req.ip}`);
    res.on("finish", async () => {
      const elapsed = (Date.now() - start) / 1000;
      Logger.log(`${mm} ${req.originalUrl} `);
      let tag = "🥬🥬🥬";
      if (res.statusCode > 201) {
        tag = "😈😈😈";
      }
      const yes = process.env.ADD_ELAPSED_TIME;
      if (yes === "yes") {
        const qel = new QueryElapsedTime();
        qel.created = new Date().toISOString();
        qel.elapsedSeconds = elapsed;
        qel.statusCode = res.statusCode;
        qel.queryParameters = JSON.stringify(req.query);
        qel.url = req.url;
        qel.longDate = new Date().getTime();
        qel.queryId = `${new Date().getTime()}${Math.random() * 100}`;

        await this.qelModel.create(qel);

        Logger.debug(
          `${mm} QueryElapsedTime added to MongoDB Atlas 🔶 🔶 🔶 \n🔶 🔶 🔶 QueryElapsedTime: ${JSON.stringify(qel, null, 2)}`
        );
      }
      Logger.debug(
        `${mm} request took 💦 ${elapsed} seconds; ${tag} statusCode: ${res.statusCode} ${tag}`
      );
    });

    next();
  }
}
