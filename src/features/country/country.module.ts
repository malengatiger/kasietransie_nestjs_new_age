import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DataModule } from 'src/data/data.module';
import { MessagingService } from '../fcm/fcm.service';
import { Country, CountrySchema } from 'src/data/models/Country';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema } from 'src/data/models/City';
import { AppErrorSchema } from 'src/data/models/AppError';
import { KasieErrorSchema } from 'src/data/models/kasie.error';

@Module({
  imports: [
    MongooseModule.forFeature([
      
      { name: "City", schema: CitySchema },
      { name: "AppError", schema: AppErrorSchema },
      { name: "KasieError", schema: KasieErrorSchema },
      { name: "Country", schema: CountrySchema },
      
    ]),
  ],  
  
  controllers: [CountryController],
  providers: [CountryService, MessagingService],
})
export class CountryModule {}
