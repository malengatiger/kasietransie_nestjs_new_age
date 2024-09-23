import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Association } from './data/models/Association';
import mongoose from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Association.name)
    private assocModel: mongoose.Model<Association>,
  ) {}

  async shakeKasieUp(): Promise<string> {
    const assocs = await this.assocModel.find();
    return `🔵 🔵 🔵 This is KasieTransie!  🍎 Where can I take you today? \n ${JSON.stringify(
      assocs, null, 2,
    )}  🍎 \nI have 😎 ${assocs.length} 😎 associations for you to choose from `;
  }

}
