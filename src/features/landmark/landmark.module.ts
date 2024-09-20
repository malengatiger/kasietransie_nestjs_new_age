import { Module } from "@nestjs/common";
import { LandmarkService } from "./landmark.service";
import { LandmarkController } from "./landmark.controller";
import { DataModule } from "src/data/data.module";
import { Landmark, LandmarkSchema } from "src/data/models/Landmark";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Landmark", schema: LandmarkSchema },
    ]),
  ],
  controllers: [LandmarkController],
  providers: [LandmarkService],
})
export class LandmarkModule {}
