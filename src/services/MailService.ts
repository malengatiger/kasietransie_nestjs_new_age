/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const mm = 'MailService';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  public async sendHtmlEmail(
    to: string,
    message: string,
    subject: string,
  ): Promise<void> {
    return null;
  }
}
