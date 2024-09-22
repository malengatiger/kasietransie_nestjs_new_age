import { Controller } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: CloudStorageUploaderService) {}
}
