import {
  Body,
  Controller,
  Logger,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { CloudStorageUploaderService } from "./storage.service";
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from "@nestjs/platform-express";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
const tag = "🔵 🔵 🔵 StorageController 🔵 ";
@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: CloudStorageUploaderService) {}

  @Post("uploadExampleFiles")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "userFile", maxCount: 1 },
      { name: "vehicleFile", maxCount: 1 },
    ])
  )
  @Post("uploadExampleFiles")
  async uploadExampleFiles(
    @UploadedFiles()
    files: {
      userFile: Express.Multer.File[];
      vehicleFile: Express.Multer.File[];
    }
  ): Promise<string> {
    const userFile = files.userFile[0];
    const vehicleFile = files.vehicleFile[0];

    const userTempFile = path.join(os.tmpdir(), userFile.originalname);
    const vehicleTempFile = path.join(os.tmpdir(), vehicleFile.originalname);

    await fs.promises.writeFile(userTempFile, userFile.buffer);
    await fs.promises.writeFile(vehicleTempFile, vehicleFile.buffer);

    Logger.log(`${tag} ${userFile.originalname} 🥦 saved to ${userTempFile}`);
    Logger.log(
      `${tag}${vehicleFile.originalname} 🥦 saved to ${vehicleTempFile}`
    );

    // Use your storageService to upload the files, passing the temporary file paths
    await this.storageService.uploadExampleFiles(userTempFile, vehicleTempFile);

    return `${tag} Files uploaded successfully`;
  }
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imageFile' },
      { name: 'thumbFile'},
    ]),
  )
  
  @Post("uploadVehiclePhoto")
  async uploadVehiclePhotoFiles(
    @UploadedFiles()
    files: {
      imageFile: Express.Multer.File[];
      thumbFile: Express.Multer.File[];
    },
    @Body() data: { vehicleId: string; latitude: number; longitude: number },
  ): Promise<string> {    

    const imageTempFile = path.join(os.tmpdir(), files.imageFile[0].originalname);
    const thumbTempFile = path.join(os.tmpdir(), files.thumbFile[0].originalname);

    await fs.promises.writeFile(imageTempFile, files.imageFile[0].buffer);
    await fs.promises.writeFile(thumbTempFile, files.thumbFile[0].buffer);

    Logger.log(`${tag} ${files.imageFile[0].originalname} 🥦 saved to ${imageTempFile}`);
    Logger.log(`${tag}${files.thumbFile[0].originalname} 🥦 saved to ${thumbTempFile}`);

    const { vehicleId, latitude, longitude } = data; // Access data from body

    await this.storageService.uploadVehiclePhoto(
      vehicleId,
      imageTempFile,
      thumbTempFile,
      latitude,
      longitude
    );

    return `${tag} Files uploaded successfully`;
  }
  // @UseInterceptors(FileInterceptor("file"))
  // @Post("uploadVehiclePhoto")
  // async uploadVehiclePhoto(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() data: { vehicleId: string; latitude: number; longitude: number }
  // ): Promise<any> {
  //   const vehicleImageFile: Express.Multer.File = file;
  //   const { vehicleId, latitude, longitude } = data; // Access data from body
  //   // ... rest of your code ...
  //   const vehicleTempFile: string = path.join(
  //     os.tmpdir(),
  //     "vehicleImageFile_" + new Date().getTime() + ".jpg"
  //   );

  //   Logger.debug(
  //     `${tag} latitude: ${latitude} longitude: ${longitude} vehicleId:${vehicleId}`
  //   );

  //   if (!file) {
  //     throw new Error(
  //       `${tag} 😈😈😈 No file uploaded, please check your request. 😈`
  //     );
  //   }
  //   Logger.debug(
  //     `${tag} vehicleImageFile, buffer length: ${file.buffer.length}`
  //   );

  //   Logger.debug(`${tag} vehicleImageFile, size: ${file.size}`);
  //   Logger.debug(`${tag} vehicleImageFile, originalname: ${file.originalname}`);

  //   await fs.promises.writeFile(vehicleTempFile, file.buffer);

  //   Logger.log(
  //     `${tag} ${vehicleImageFile.originalname} 🥦 saved to ${vehicleTempFile}`
  //   );
  //   const resp = await this.storageService.uploadVehiclePhoto(
  //     vehicleId,
  //     vehicleTempFile,
  //     latitude,
  //     longitude
  //   );

  //   return resp;
  // }
  @UseInterceptors(FileInterceptor("file"))
  @Post("uploadVehicleVideo")
  async uploadVehicleVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: { vehicleId: string; latitude: number; longitude: number }
  ): Promise<any> {
    const { vehicleId, latitude, longitude } = data; // Access data from body
    const vehicleImageFile = file;
    const vehicleTempFile = path.join(
      os.tmpdir(),
      "vehicleImageFile_" + new Date().getTime() + ".mp4"
    );

    await fs.promises.writeFile(vehicleTempFile, vehicleImageFile.buffer);

    Logger.log(
      `${tag} ${vehicleImageFile.originalname} 🥦 saved to ${vehicleTempFile}`
    );
    const resp = await this.storageService.uploadVehicleVideo(
      vehicleId,
      vehicleTempFile,
      latitude,
      longitude
    );

    return resp;
  }
}
