import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import {
  Storage,
  Bucket,
  File,
  StorageOptions,
  GetSignedUrlConfig,
  UploadResponse,
  GetSignedUrlResponse,
  UploadOptions,
  GetBucketSignedUrlConfig,
} from "@google-cloud/storage";
import { getStorage, getDownloadURL } from "firebase-admin/storage";

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
import { User } from "src/data/models/User";
import { UserPhoto } from "src/data/models/UserPhoto";
import { randomUUID } from "crypto";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { Association } from "src/data/models/Association";

console.log(`${typeof sharp} - Should output "function"`); //
const mm = "🔶🔶🔶 StorageService 🔶 ";

@Injectable()
export class CloudStorageUploaderService {
  private bucketName: string;
  private projectId: string;
  private cloudStorageDirectory: string;
  private storage: Storage;
  constructor(
    private configService: ConfigService,
    private readonly errorHandler: KasieErrorHandler,

    @InjectModel(ExampleFile.name)
    private exampleFileModel: mongoose.Model<ExampleFile>,

    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,

    @InjectModel(UserPhoto.name)
    private userPhotoModel: mongoose.Model<UserPhoto>,

    @InjectModel(VehiclePhoto.name)
    private vehiclePhotoModel: mongoose.Model<VehiclePhoto>,

    @InjectModel(VehicleVideo.name)
    private vehicleVideoModel: mongoose.Model<VehicleVideo>,

    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>
  ) {
    this.bucketName = "kasie-transie-3.appspot.com";
    this.projectId = "kasie-transie-3";
    this.cloudStorageDirectory = "kasie-transie-3_data";
    this.storage = new Storage({ projectId: "kasie-transie-3" });
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

      const p = new VehicleVideo();
      p.associationId = car.associationId;
      p.vehicleVideoId = `${vehicleId}_${dt}`;
      p.url = url;
      p.thumbNailUrl = "tbd";
      p.vehicleId = car.vehicleId;
      p.vehicleReg = car.vehicleReg;
      const pos = new Position("Point", [longitude, latitude]);
      p.position = pos;
      p.created = new Date().toISOString();
      const mDate = new Date(p.created);
      p.mDate = mDate;
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
    latitude: string,
    longitude: string
  ): Promise<VehiclePhoto> {
    Logger.log(
      `\n\n${mm} uploadVehiclePhoto: getting vehicle from Atlas, 🔵 vehicleId: ${vehicleId} 🔵 latitude: ${latitude} 🔵 longitude: ${longitude}`
    );
    // Convert latitude and longitude to numbers
    const latitudeNum = parseFloat(latitude);
    const longitudeNum = parseFloat(longitude);
    const cars = await this.vehicleModel
      .find({ vehicleId: vehicleId })
      .limit(1);
    console.log(cars);
    const dt = new Date().getTime();
    if (cars.length > 0) {
      const car = cars[0];
      Logger.debug(
        `${mm} ...... uploading vehicle photo, 🔵 car: ${car.vehicleReg}`
      );
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

      try {
        const photo = new VehiclePhoto();
        photo.associationId = car.associationId;
        photo.vehiclePhotoId = `${vehicleId}_${dt}`;
        photo.url = url["url"];
        photo.thumbNailUrl = thumbUrl["url"];
        photo.vehicleId = car.vehicleId;
        photo.vehicleReg = car.vehicleReg;

        const pos = new Position("Point", [longitudeNum, latitudeNum]);
        photo.position = pos;
        photo.created = new Date().toISOString();

        Logger.debug(
          `${mm} vehicle photo about to be added: 🔵 ${JSON.stringify(photo, null, 2)}🔵`
        );
        const mDate = new Date(photo.created);
        photo.mDate = mDate;
        const resp = await this.vehiclePhotoModel.create(photo);
        Logger.log(
          `\n${mm} 🍎 🍎 vehicle photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`
        );
        return resp;
      } catch (e) {
        this.errorHandler.handleError(
          e,
          car.associationId,
          car.associationName
        );
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      }
    }
  }

  public async createUserPhoto(userPhoto: UserPhoto): Promise<User> {
    userPhoto.userPhotoId = randomUUID();
    userPhoto.created = new Date().toISOString();
    const users = await this.userModel
      .find({ userId: userPhoto.userId })
      .limit(1);
    console.log(users);
    const dt = new Date().getTime();
    if (users.length > 0) {
      const user = users[0];
      user.profileUrl = userPhoto.url;
      user.profileThumbnail = userPhoto.thumbNailUrl;
      await this.userModel.updateOne(
        {
          userId: userPhoto.userId,
        },
        user
      );
      Logger.log(
        `\n${mm} 🍎 🍎 user profile url updated 🍎 🍎 ${JSON.stringify(user)} 🍎 🍎`
      );
      
      const resp = await this.userPhotoModel.create(userPhoto);
      Logger.log(
        `\n${mm} 🍎 🍎 user photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`
      );
      return user;
    }
    Logger.error(`${mm} .. user photo upload failed`);
    const msg = `Failed to upload user photo`;
    await this.errorHandler.handleError(
      msg,
      userPhoto.associationId,
      userPhoto.associationName
    );
    throw new HttpException(msg, HttpStatus.BAD_REQUEST);
  }
  public async uploadUserProfilePicture(
    userId: string,
    filePath: string,
    thumbFilePath: string
  ): Promise<any> {
    Logger.log(
      `${mm} uploadUserProfilePicture: getting user from Atlas, 🔵 userId: ${userId}`
    );
    const users = await this.userModel.find({ userId: userId }).limit(1);
    console.log(users);
    const dt = new Date().getTime();
    if (users.length > 0) {
      const user = users[0];
      Logger.log(`${mm} uploading user photo, 🔵 user: ${user.firstName}`);
      const url = await this.uploadFile(
        `photo_${userId}_${dt}`,
        filePath,
        user.associationName
      );
      const thumbUrl = await this.uploadFile(
        `thumbnail_${userId}_${dt}`,
        thumbFilePath,
        user.associationName
      );

      const p = new UserPhoto();
      p.associationId = user.associationId;
      p.userPhotoId = `${userId}_${dt}`;
      p.url = url;
      p.thumbNailUrl = thumbUrl;
      p.userId = user.userId;
      p.userName = user.firstName + " " + user.lastName;
      p.associationName = user.associationName;
      p.created = new Date().toISOString();

      user.profileUrl = url;
      user.profileThumbnail = thumbUrl;

      await this.userModel.updateOne(
        {
          userId: userId,
        },
        user
      );
      Logger.log(
        `\n${mm} 🍎 🍎 user profile url updated 🍎 🍎 ${JSON.stringify(user)} 🍎 🍎`
      );
      const mDate = new Date(p.created);
      p.mDate = mDate;
      const resp = await this.userPhotoModel.create(p);
      Logger.log(
        `\n${mm} 🍎 🍎 user photo uploaded and added to Atlas:🍎 🍎 🍎 🍎 \n\n🍎 🍎 ${JSON.stringify(resp)} 🍎 🍎 \n\n`
      );
      return resp;
    } else {
      throw new Error("User not found");
    }
  }

  public async uploadQRCodeFile(
    associationId: string,
    filePath: string
  ): Promise<any> {
    Logger.log(
      `${mm} uploadQRCodeFile: creating qrcode 🔵 associationId: ${associationId}`
    );

    const objectName = `qrCode_${randomUUID()}.png`;

    let name = "General";
    try {
      if (associationId) {
        const ass = await this.associationModel
          .findOne({ associationId: associationId })
          .limit(1);
        Logger.debug(
          `${mm} uploadQRCodeFile: association from Atlas 🔵 name: ${ass.associationName}`
        );

        if (ass == null) {
          throw new HttpException(
            "Association not found",
            HttpStatus.BAD_REQUEST
          );
        }
        name = ass.associationName;
      }

      const uploadResult: any = await this.uploadFile(
        `${objectName}`,
        filePath,
        name
      );

      Logger.log(
        `${mm} uploadQRCodeFile: returning fileName: 🔵  ${JSON.stringify(uploadResult)}`
      );
      if (!uploadResult) {
        this.errorHandler.handleError("url is blank", associationId, "nay");
        throw new HttpException(
          "url is blank",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return uploadResult;
    } catch (e) {
      const msg = `QRCode file upload failed: ${e}`;
      Logger.error(`${mm} ${msg}: ${e}`);
      this.errorHandler.handleError(msg, associationId, "nay");
      throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
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
    //
    const u = new ExampleFile();
    u.bucketFileName = userUrl;
    u.fileName = "users.csv";
    u.type = "csv";
    await this.exampleFileModel.create(u);

    const v = new ExampleFile();
    v.bucketFileName = vehicleUrl;
    v.fileName = "vehicles.csv";
    v.type = "csv";
    await this.exampleFileModel.create(v);
    Logger.log(`${mm} Example files uploaded and written to Atlas ✅ `);
  }

  public async getExampleFiles(): Promise<ExampleFile[]> {
    const list = await this.exampleFileModel.find({});
    return list;
  }

  //
  public async uploadFile(
    objectName: string,
    filePath: string,
    folder: string
  ): Promise<any> {
    Logger.log(`uploadFile : ${filePath} bucket: ${this.bucketName} `);

    const bucketFileName = `${this.cloudStorageDirectory}/${folder}/${objectName}`;

    Logger.log(
      `${mm} uploadFile : ${filePath} bucketFileName: ${bucketFileName} to ${this.bucketName}`
    );

    await this.storage.bucket(this.bucketName).setCorsConfiguration([
      {
        method: ["*"],
        origin: ["*"],
      },
    ]);

    Logger.log(`${mm} Bucket ${this.bucketName} was updated with a CORS config
        to allow all requests from any origin`);
    try {
      const contentType = this.getFileContentType(filePath);
      const options: UploadOptions = {
        destination: bucketFileName,
        preconditionOpts: {},
        metadata: {
          contentType: contentType,
          predefinedAcl: "publicRead",
        },
      };
      Logger.log(
        `${mm} upload ${filePath} to cloud: await storage.bucket ${this.bucketName}...`
      );

      const response: UploadResponse = await this.storage
        .bucket(this.bucketName)
        .upload(filePath, options);
      Logger.log(
        `${mm} UploadResponse: ${response[0].name}  ${response[0].baseUrl}  ${response[0].cloudStorageURI} ...`
      );

      const fileRef = this.storage.bucket(this.bucketName).file(bucketFileName);
      const downloadURL = await getDownloadURL(fileRef);
      var mFile = response[0];
      var prop = response[1];
      Logger.log(
        `\n\n${mm} UploadResponse mFile: ${mFile.name} ✅ downloadURL: \n ✅  ${downloadURL} ✅ ...\n\n`
      );

      if (mFile) {
        const resp = {
          fileName: mFile.name,
          url: downloadURL,
        };
        Logger.debug(`${mm} upload response ${JSON.stringify(resp, null, 2)}}`);
        return resp;
      }
    } catch (error) {
      Logger.error(`\n\n${mm} Error uploading file to cloud storage: ${error}`);
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
    Logger.log(
      `${mm} createQRCode: 🌀 qrcode prefix: ${data.prefix} - size: ${data.size}`
    );

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

      return await this.uploadFile(fileName, tempFilePath, data.associationId);
    } catch (error) {
      Logger.error(error);
      throw new Error("Failed to create QR code and upload to Cloud Storage.");
    }
  }
}
