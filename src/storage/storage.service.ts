import { Injectable, Logger } from "@nestjs/common";
import {
  Storage,
  Bucket,
  File,
  StorageOptions,
  GetSignedUrlConfig,
} from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import * as qrcode from "qrcode";

const mm = "CloudStorageUploaderService";

@Injectable()
export class CloudStorageUploaderService {
  private bucketName: string;
  private projectId: string;
  private cloudStorageDirectory: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>("BUCKET_NAME");
    this.projectId = this.configService.get<string>("PROJECT_ID");
    this.cloudStorageDirectory = this.configService.get<string>(
      "CLOUD_STORAGE_DIRECTORY"
    );
  }

  private async getSignedUrl(
    objectName: string,
  ): Promise<string> {
    Logger.log(`${mm} getSignedUrl for cloud storage: ${objectName}`);

    const storage: Storage = new Storage({ projectId: this.projectId });
    const bucket: Bucket = storage.bucket(this.bucketName);
    const file: File = bucket.file(
      `${this.cloudStorageDirectory}/${objectName}`
    );

    const signedUrlOptions: GetSignedUrlConfig = {
      action: "read",
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 10, // 1 year
    };

    try {
      const [url] = await file.getSignedUrl(signedUrlOptions);
      Logger.log(`${mm} Signed URL acquired. Cool! ${url}`);
      return url;
    } catch (error) {
      Logger.error(`${mm} Error getting signed URL: ${error}`);
      throw error;
    }
  }

  public async uploadFile(
    objectName: string,
    filePath: string,
    associationId: string
  ): Promise<string> {
    Logger.log(`${mm} uploadFile to cloud storage: ${objectName}`);

    const storage: Storage = new Storage({ projectId: this.projectId });
    const bucket: Bucket = storage.bucket(this.bucketName);
    const file: File = bucket.file(
      `${this.cloudStorageDirectory}/${associationId}/${objectName}`
    );

    try {
      const contentType = this.getFileContentType(filePath);
      Logger.log(
        `${mm} uploadFile to cloud storage, contentType: ${contentType}`
      );

      await file.bucket.upload(filePath, {
        metadata: { contentType, predefinedAcl: "publicRead" },
      });

      const signedUrl = await this.getSignedUrl(objectName);
      Logger.log(`${mm} File uploaded to cloud storage; url = ${signedUrl}`);
      return signedUrl;
    } catch (error) {
      Logger.error(`${mm} Error uploading file: ${error}`);
      throw error;
    }
  }

  private getFileContentType(filePath: string): string {
    try {
      return fs.readFileSync(filePath).toString();
    } catch (error) {
      Logger.warn(
        `${mm} Could not determine content type, using 'application/octet-stream'`
      );
      return "application/octet-stream";
    }
  }

  public async createQRCode(
    data: string,
    prefix: string,
    size: number,
    associationId: string,
    // Add bucketName as a parameter
  ): Promise<string> {
    Logger.log(`${mm} qrcode prefix: ${prefix} - size: ${size}`);

    try {
      const fileName = `qrcode_${prefix}_${new Date().getTime()}.png`;
      const tempDir = path.join(__dirname, "..", "tempFiles");
      const tempFilePath = path.join(tempDir, fileName);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      let version = 15;
      if (size == 1) {
        version = 20;
      }
      if (size == 2) {
        version = 30;
      }
      if (size == 3) {
        version = 40;
      }
      Logger.log(`${mm} qrcode version: ${version}`);
      await qrcode.toFile(tempFilePath, data, {
        version: version,
      });
      Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
      Logger.log(`${mm} qrcode file: ${tempFilePath}`);
      return this.uploadFile(fileName, tempFilePath, associationId);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create QR code and upload to Cloud Storage.");
    }
  }
}
