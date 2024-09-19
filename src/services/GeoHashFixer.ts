/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const mm = 'GeoHashFixer';

@Injectable()
export class GeoHashFixer {
  constructor(private configService: ConfigService) {}
}
