import { Module } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ExampleFileSchema } from 'src/data/models/ExampleFile';
import { VehiclePhotoSchema } from 'src/data/models/VehiclePhoto';
import { VehicleVideoSchema } from 'src/data/models/VehicleVideo';
import { VehicleSchema } from 'src/data/models/Vehicle';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExampleFile", schema: ExampleFileSchema },
      { name: "VehicleVideo", schema: VehicleVideoSchema },
      { name: "VehiclePhoto", schema: VehiclePhotoSchema },
      { name: "Vehicle", schema: VehicleSchema },

    ])
  ],
  controllers: [StorageController],
  providers: [CloudStorageUploaderService],
})
export class StorageModule {}