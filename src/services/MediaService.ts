/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { VehicleMediaRequest } from 'src/data/models/VehicleMediaRequest';
import { VehiclePhoto } from 'src/data/models/VehiclePhoto';
import { VehicleVideo } from 'src/data/models/VehicleVideo';

const mm = 'MediaService';

@Injectable()
export class MediaService {
  constructor(
    private configService: ConfigService,
    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleMediaRequest.name)
    private vehicleMediaRequestModel: mongoose.Model<VehicleMediaRequest>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,
  ) {}

  public async getAssociationVehicleMediaRequests(
    associationId: string,
    startDate: string,
  ): Promise<VehicleMediaRequest[]> {
    return await this.vehicleMediaRequestModel.find({
      associationId: associationId,
      startDate: startDate,
    });
  }
  public async addVehiclePhoto(
    vehiclePhoto: VehiclePhoto,
  ): Promise<VehiclePhoto> {
    return await this.vehiclePhotoModel.create(vehiclePhoto);
  }
  public async getVehicleMediaRequests(
    vehicleId: string,
  ): Promise<VehicleMediaRequest[]> {
    return [];
  }
  public async addVehicleVideo(
    vehicleVideo: VehicleVideo,
  ): Promise<VehicleVideo> {
    return null;
  }
  public async getVehiclePhotos(vehicleId: string): Promise<VehiclePhoto[]> {
    return [];
  }
  public async getVehicleVideos(vehicleId: string): Promise<VehicleVideo[]> {
    return [];
  }
}
