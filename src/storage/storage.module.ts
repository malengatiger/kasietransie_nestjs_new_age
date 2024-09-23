import { Module } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';
import { StorageController } from './storage.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { ExampleFileSchema } from 'src/data/models/ExampleFile';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "ExampleFile", schema: ExampleFileSchema },
    ])
  ],
  controllers: [StorageController],
  providers: [CloudStorageUploaderService],
})
export class StorageModule {}