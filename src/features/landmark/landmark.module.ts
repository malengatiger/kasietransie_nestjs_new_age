import { Module } from "@nestjs/common";
import { LandmarkService } from "./landmark.service";
import { LandmarkController } from "./landmark.controller";
import { LandmarkSchema } from "src/data/models/Landmark";
import { MongooseModule } from "@nestjs/mongoose";
import { FirebaseAdmin } from "src/services/firebase_util";

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
