/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserGeofenceEvent } from 'src/data/models/UserGeofenceEvent';

const mm = 'UserGeofenceService';

@Injectable()
export class UserGeofenceService {
  constructor(
    private configService: ConfigService,
    @InjectModel(UserGeofenceEvent.name)
    private userGeofenceEventModel: mongoose.Model<UserGeofenceEvent>,
  ) {}

  public async getUserGeofenceEventsForUser(
    userId: string,
  ): Promise<UserGeofenceEvent[]> {
    return [];
  }
  public async getVehicleGeofenceEventsForLandmark(
    landmarkId: string,
  ): Promise<UserGeofenceEvent[]> {
    return [];
  }
  public async getVehicleGeofenceEventsForAssociation(
    associationId: string,
  ): Promise<UserGeofenceEvent[]> {
    return [];
  }
  public async addUserGeofenceEvent(
    event: UserGeofenceEvent,
  ): Promise<UserGeofenceEvent> {
    return null;
  }
}
