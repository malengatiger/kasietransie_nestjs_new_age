/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const mm = 'DataFileService';

@Injectable()
export class DataFileService {
  constructor(private configService: ConfigService) {}

  public async addToZip(file: File, zipOutputStream: any): Promise<void> {
    return null;
  }
  public async createZippedFile(): Promise<File> {
    return null;
  }
  public async createZippedByteArray(): Promise<any[]> {
    return [];
  }
}
