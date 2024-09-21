import { Injectable } from '@nestjs/common';
import { NewMongoService } from 'src/data/new_mongo_service';

@Injectable()
export class AppService {
  constructor(readonly mongoService: NewMongoService) {}

  async shakeKasieUp(): Promise<string> {
    const assocs = await this.mongoService.pingDatabase();
    return `🔵 🔵 🔵 This is KasieTransie!  🍎 Where can I take you today? \n ${JSON.stringify(
      assocs, null, 2,
    )}  🍎 \nI have 😎 ${assocs.length} 😎 associations for you to choose from `;
  }
}
