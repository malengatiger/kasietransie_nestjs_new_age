/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

const mm = 'CloudStorageUploaderService';

@Injectable()
export class CloudStorageUploaderService {
  constructor(
    private configService: ConfigService,
    @InjectModel(File.name)
    private fileModel: mongoose.Model<File>,
  ) {}

  public async uploadFile(objectName: string, file: File): Promise<string> {
    return null;
  }
  public async getSignedUrl(
    objectName: string,
    contentType: string,
  ): Promise<string> {
    return null;
  }
}
