import { Controller, Logger, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CloudStorageUploaderService } from './storage.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const tag = '🔵 🔵 🔵 StorageController 🔵 '
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: CloudStorageUploaderService) {}

  @Post('uploadExampleFiles')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'userFile', maxCount: 1 },
      { name: 'vehicleFile', maxCount: 1 },
    ]),
  )
  async uploadExampleFiles(
    @UploadedFiles()
    files: { userFile: Express.Multer.File[]; vehicleFile: Express.Multer.File[] },
  ): Promise<string> {
    const userFile = files.userFile[0];
    const vehicleFile = files.vehicleFile[0];

    const userTempFile = path.join(os.tmpdir(), userFile.originalname);
    const vehicleTempFile = path.join(os.tmpdir(), vehicleFile.originalname);

    await fs.promises.writeFile(userTempFile, userFile.buffer);
    await fs.promises.writeFile(vehicleTempFile, vehicleFile.buffer);

    Logger.log(`${tag} ${userFile.originalname} 🥦 saved to ${userTempFile}`);
    Logger.log(`${tag}${vehicleFile.originalname} 🥦 saved to ${vehicleTempFile}`);

    // Use your storageService to upload the files, passing the temporary file paths
    await this.storageService.uploadExampleFiles(userTempFile, vehicleTempFile);
    
    return `${tag} Files uploaded successfully`;
  }
}
