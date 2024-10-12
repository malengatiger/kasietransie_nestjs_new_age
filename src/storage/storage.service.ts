import { Injectable, Logger } from "@nestjs/common";
import {
  Storage,
  Bucket,
  File,
  StorageOptions,
  GetSignedUrlConfig,
  UploadResponse,
} from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import * as qrcode from "qrcode";
import { KasieQRCode } from "src/data/helpers/kasie_qr_code";
import * as mime from "mime-types";
import { StorageControlClient } from "@google-cloud/storage-control";
import mongoose from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ExampleFile } from "src/data/models/ExampleFile";
import { VehicleVideo } from "src/data/models/VehicleVideo";
import { VehiclePhoto } from "src/data/models/VehiclePhoto";
import { Vehicle } from "src/data/models/Vehicle";
import sharp from "sharp";
import { Position } from "src/data/models/position";

console.log(`${typeof sharp} - Should output "function"`); // 
const mm = "🔶🔶🔶 CloudStorageUploaderService 🔶 ";

@Injectable()
export class CloudStorageUploaderService {
  private bucketName: string;
  private projectId: string;
  private cloudStorageDirectory: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(ExampleFile.name)
    private exampleFileModel: mongoose.Model<ExampleFile>,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>
  ) {
    this.bucketName = this.configService.get<string>("BUCKET_NAME");
    this.projectId = this.configService.get<string>("PROJECT_ID");
    this.cloudStorageDirectory = this.configService.get<string>(
      "CLOUD_STORAGE_DIRECTORY"
    );
  }

  public async uploadVehicleVideo(
    vehicleId: string,
    filePath: string,
    latitude: number,
    longitude: number
  ): Promise<any> {
    Logger.log(`${mm} getting vehicle from Atlas, car: ${vehicleId}`);
    const cars = await this.vehicleModel
      .find({ vehicleId: vehicleId })
      .limit(1);
    console.log(cars);
    const dt = new Date().getTime();

    if (cars.length > 0) {
      const car = cars[0];
      Logger.log(`${mm} uploading vehicle video, car: ${car.vehicleReg}`);
      const url = await this.uploadFile(
        `${vehicleId}_${dt}`,
        filePath,
        car.associationId
      );
      // const thumbnailPath = await this.createThumbnail(filePath);
      // const thumbUrl = await this.uploadFile(
      //   `thumbnail_${vehicleId}_${dt}`,
      //   thumbnailPath,
      //   car.associationId
      // );

      const p = new VehicleVideo();
      p.associationId = car.associationId;
      p.vehicleVideoId = `${vehicleId}_${dt}`;
      p.url = url;
      p.thumbNailUrl = 'tbd';
      p.vehicleId = car.vehicleId;
      p.vehicleReg = car.vehicleReg;
      const pos = new Position();
      pos.type = "Point";
      pos.coordinates = [longitude, latitude];
      p.position = pos;
      p.created = new Date().toISOString();
      const resp = await this.vehicleVideoModel.create(p);
      Logger.log(
        `${mm} vehicle video uploaded and added to Atlas: ${JSON.stringify(resp)}}\n\n`
      );
      return resp;
    } else {
      throw new Error("Vehicle not found");
    }
  }

  public async uploadVehiclePhoto(
    vehicleId: string,
    filePath: string,
    thumbFilePath: string,
    latitude: number,
    longitude: number
  ): Promise<any> {
    Logger.log(`${mm} uploadVehiclePhoto: getting vehicle from Atlas, 🔵 car: ${vehicleId}`);
    const cars = await this.vehicleModel
      .find({ vehicleId: vehicleId })
      .limit(1);
    console.log(cars);
    const dt = new Date().getTime();
    if (cars.length > 0) {
      const car = cars[0];
      Logger.log(`${mm} uploading vehicle photo, 🔵 car: ${car.vehicleReg}`);
      const url = await this.uploadFile(
        `photo_${vehicleId}_${dt}`,
        filePath,
        car.associationName
      );
      const thumbUrl = await this.uploadFile(
        `thumbnail_${vehicleId}_${dt}`,
        thumbFilePath,
        car.associationName
      );

      const p = new VehiclePhoto();
      p.associationId = car.associationId;
      p.vehiclePhotoId = `${vehicleId}_${dt}`;
      p.url = url;
      p.thumbNailUrl = thumbUrl;
      p.vehicleId = car.vehicleId;
      p.vehicleReg = car.vehicleReg;
    
      const pos = new Position();
      pos.type = "Point";
      pos.coordinates = [longitude, latitude];
      p.position = pos;
      p.created = new Date().toISOString();

      const resp = await this.vehiclePhotoModel.create(p);
      Logger.log(
        `\n${mm} 🍎 🍎 vehicle photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`
      );
      return resp;
    } else {
      throw new Error("Vehicle not found");
    }
  }

  public async uploadExampleFiles(
    userFilePath: string,
    vehicleFilePath: string
  ): Promise<void> {
    Logger.log(
      `${mm} ... upload example files ... 🍐 users: ${userFilePath} 🍐 cars: ${vehicleFilePath}`
    );
    const userUrl = await this.uploadFile("users.csv", userFilePath, "admin");
    const vehicleUrl = await this.uploadFile(
      "vehicles.csv",
      vehicleFilePath,
      "admin"
    );
    const u = new ExampleFile();
    u.downloadUrl = userUrl;
    u.fileName = "users.csv";
    u.type = "csv";
    await this.exampleFileModel.create(u);

    const v = new ExampleFile();
    v.downloadUrl = vehicleUrl;
    v.fileName = "vehicles.csv";
    v.type = "csv";
    await this.exampleFileModel.create(v);
    Logger.log(`${mm} Example files uploaded and written to Atlas ✅ `);
  }
  private async getSignedUrl(file: File): Promise<string> {
    Logger.log(`${mm} getSignedUrl for cloud storage: ${file.name}`);

    const signedUrlOptions: GetSignedUrlConfig = {
      action: "read",
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 30, // 30 years
    };

    try {
      const [url] = await file.getSignedUrl(signedUrlOptions);
      return url;
    } catch (error) {
      Logger.error(`${mm} Error getting signed URL: ${error}`);
      throw error;
    }
  }

  public async uploadFile(
    objectName: string,
    filePath: string,
    folder: string
  ): Promise<string> {
    Logger.log(
      `${mm} uploadFile to cloud storage: 🔵 ${objectName} in associationId: 🔵 ${folder}}`
    );

    const storage: Storage = new Storage({ projectId: this.projectId });
    const bucket: Bucket = storage.bucket(this.bucketName);
    const bucketFileName = `${this.cloudStorageDirectory}/${folder}/${objectName}`;
    Logger.log(`\n\n${mm} .... bucketFileName: ${bucketFileName}\n\n`);
    const file: File = bucket.file(bucketFileName);

    try {
      const contentType = this.getFileContentType(filePath);
      Logger.log(
        `${mm} uploadFile to cloud storage, contentType: 🔵 ${contentType}`
      );
      const options = {
        destination: bucketFileName,
        preconditionOpts: {},
        metadata: {
          contentType: contentType,
          predefinedAcl: "publicRead",
        },
      };
      const response = await storage
        .bucket(this.bucketName)
        .upload(filePath, options);
      Logger.log(
        `${mm} File uploaded to cloud storage; \n\n🔵 🍐🍐 metadata = ${JSON.stringify(response[0].metadata)} 🍐🍐\n`
      );
      const signedUrl = await this.getSignedUrl(file);
      Logger.log(
        `${mm} File uploaded to cloud storage; ✅ url: \n\n 🍐🍐 ${signedUrl} 🍐🍐\n`
      );
      return signedUrl;
    } catch (error) {
      Logger.error(`${mm} Error uploading file to cloud storage: ${error}`);
      throw error;
    }
  }

  private getFileContentType(filePath: string): string {
    const mimeType = mime.lookup(filePath);
    return mimeType || "application/octet-stream";
  }

  public async createQRCode(
    data: KasieQRCode // Add bucketName as a parameter
  ): Promise<string> {
    Logger.log(`${mm} createQRCode: 🌀 qrcode prefix: ${data.prefix} - size: ${data.size}`);

    try {
      const fileName = `qrcode_${data.prefix}_${new Date().getTime()}.png`;
      const tempDir = path.join(__dirname, "..", "tempFiles");
      const tempFilePath = path.join(tempDir, fileName);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      let version = 15;
      if (data.size == 1) {
        version = 20;
      }
      if (data.size == 2) {
        version = 30;
      }
      if (data.size == 3) {
        version = 40;
      }
     
      await qrcode.toFile(tempFilePath, data.data, {
        version: version,
      });
      Logger.log(
        `${mm} qrcode file: ${tempFilePath} 🌀🌀 to be uploaded to ${fileName}`
      );
      return await this.uploadFile(fileName, tempFilePath, data.associationId);
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to create QR code and upload to Cloud Storage.");
    }
  }
}
