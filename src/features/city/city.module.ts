import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { DataModule } from 'src/data/data.module';
import { City, CitySchema } from 'src/data/models/City';
import { MongooseModule } from '@nestjs/mongoose';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "City", schema: CitySchema },
     
    ]),
  ],    controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
