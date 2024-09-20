/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Landmark } from 'src/data/models/Landmark';

const mm = 'LandmarkService';

@Injectable()
export class LandmarkService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Landmark.name)
    private landmarkModel: mongoose.Model<Landmark>,
  ) {}

  public async addBasicLandmark(landmark: Landmark): Promise<Landmark> {
    return null;
  }
  public async deleteLandmark(landmarkId: string): Promise<number> {
    return null;
  }
  public async findLandmarksByLocation(
    latitude: number,
    longitude: number,
    radiusInKM: number,
  ): Promise<Landmark[]> {
    return [];
  }
}
