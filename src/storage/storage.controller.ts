import {
  Body,
  Controller,
  Logger,
  Post,
  Query,
  Get,
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
import { UserPhoto } from "src/data/models/UserPhoto";
import { User } from "src/data/models/User";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { ExampleFile } from "src/data/models/ExampleFile";

const tag = "🔵 🔵 🔵 StorageController 🔵 ";

@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: CloudStorageUploaderService) {}

  @Get('getExampleFiles')
  async getExampleFiles(): Promise<ExampleFile[]> {
    return this.storageService.getExampleFiles();
  }

  @Post("addUserPhoto")
  async addUserPhoto(@Body() userPhoto: UserPhoto): Promise<any> {
    return await this.storageService.createUserPhoto(userPhoto);
  }
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

  @Post("uploadVehiclePhoto")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "thumbFile", maxCount: 1 },
    ])
  )
  async uploadVehiclePhoto(
    @UploadedFiles()
    files: {
      imageFile: Express.Multer.File[];
      thumbFile: Express.Multer.File[];
    },
    @Query("vehicleId") vehicleId: string,
    @Query("latitude") latitude: string,
    @Query("longitude") longitude: string
  ): Promise<VehiclePhoto> {
    const imageTempFile = path.join(
      os.tmpdir(),
      files.imageFile[0].originalname
    );
    const thumbTempFile = path.join(
      os.tmpdir(),
      files.thumbFile[0].originalname
    );

    await fs.promises.writeFile(imageTempFile, files.imageFile[0].buffer);
    await fs.promises.writeFile(thumbTempFile, files.thumbFile[0].buffer);

    Logger.debug(
      `${tag} ${files.imageFile[0].originalname} 🥦 saved to ${imageTempFile}`
    );
    Logger.debug(
      `${tag}${files.thumbFile[0].originalname} 🥦 saved to ${thumbTempFile}`
    );

    const res = await this.storageService.uploadVehiclePhoto(
      vehicleId,
      imageTempFile,
      thumbTempFile,
      latitude,
      longitude
    );

    return res;
  }

  @Post("uploadUserProfilePicture")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "imageFile", maxCount: 1 },
      { name: "thumbFile", maxCount: 1 },
    ])
  )
  async uploadUserProfilePicture(
    @UploadedFiles()
    files: {
      imageFile: Express.Multer.File[];
      thumbFile: Express.Multer.File[];
    },
    @Query("userId") userId: string
  ): Promise<User> {
    Logger.log(`${tag} imageFile: ${files.imageFile[0].originalname} 🥦 `);
    Logger.log(`${tag} thumbFile: ${files.thumbFile[0].originalname} 🥦 `);

    const imageTempFile = path.join(
      os.tmpdir(),
      files.imageFile[0].originalname
    );
    const thumbTempFile = path.join(
      os.tmpdir(),
      files.thumbFile[0].originalname
    );

    await fs.promises.writeFile(imageTempFile, files.imageFile[0].buffer);
    await fs.promises.writeFile(thumbTempFile, files.thumbFile[0].buffer);

    Logger.log(
      `${tag} ${files.imageFile[0].originalname} 🥦 saved to ${imageTempFile}`
    );
    Logger.log(
      `${tag}${files.thumbFile[0].originalname} 🥦 saved to ${thumbTempFile}`
    );

    const user = await this.storageService.uploadUserProfilePicture(
      userId,
      imageTempFile,
      thumbTempFile
    );

    return user;
  }
  //
  @Post("uploadQrCodeFile")
  @UseInterceptors(FileFieldsInterceptor([{ name: "imageFile", maxCount: 1 }]))
  async uploadQrCodeFile(
    @UploadedFiles()
    files: {
      imageFile: Express.Multer.File[];
    },
    @Query("associationId") associationId: string
  ): Promise<string> {
    Logger.log(
      `${tag} uploadQrCodeFile: imageFile: ${files.imageFile[0].originalname} 🥦 `
    );

    const imageTempFile = path.join(
      os.tmpdir(),
      files.imageFile[0].originalname
    );

    await fs.promises.writeFile(imageTempFile, files.imageFile[0].buffer);
    Logger.log(
      `${tag}  uploadQrCodeFile: : qrcode ${files.imageFile[0].originalname} 🥦 saved to ${imageTempFile}`
    );

    const fileName = await this.storageService.uploadQRCodeFile(
      associationId,
      imageTempFile
    );

    return fileName;
  }
  //
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
