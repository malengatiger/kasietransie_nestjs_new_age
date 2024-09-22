import { Module } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';
import { StorageController } from './storage.controller';

@Module({
  controllers: [StorageController],
  providers: [CloudStorageUploaderService],
})
export class StorageModule {}
