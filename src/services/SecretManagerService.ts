/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const mm = 'SecretManagerService';

@Injectable()
export class SecretManagerService {
  constructor(private configService: ConfigService) {}

  public async getPlacesAPIKey(): Promise<string> {
    return null;
  }
  public async getMongoString(): Promise<string> {
    return null;
  }
}
