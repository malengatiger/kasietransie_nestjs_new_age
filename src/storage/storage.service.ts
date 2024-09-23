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

  private async getSignedUrl(file: File): Promise<string> {
    Logger.log(`${mm} getSignedUrl for cloud storage: ${file.name}`);

    const signedUrlOptions: GetSignedUrlConfig = {
      action: "read",
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000 * 10, // 1 year
    };

    try {
      const [url] = await file.getSignedUrl(signedUrlOptions);
      Logger.log(`\n${mm} Signed URL acquired. Cool! \n 🤟🏽 🤟🏽 ${url}  🤟🏽 🤟🏽\n\n`);
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
    Logger.log(
      `${mm} uploadFile to cloud storage: ${objectName} in associationId: ${associationId}}`
    );

    const storage: Storage = new Storage({ projectId: this.projectId });
    const bucket: Bucket = storage.bucket(this.bucketName);
    const bucketFileName = `${this.cloudStorageDirectory}/${associationId}/${objectName}`;
    Logger.log(`${mm} .... bucketFileName: ${bucketFileName}`);
    const file: File = bucket.file(bucketFileName);

    try {
      const contentType = this.getFileContentType(filePath);
      Logger.log(
        `${mm} uploadFile to cloud storage, contentType: ${contentType}`
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
        `${mm} File uploaded to cloud storage; \n🍐🍐 metadata = ${JSON.stringify(response[0].metadata)} 🍐🍐\n`
      );
      const signedUrl = await this.getSignedUrl(file);
      Logger.log(`${mm} File uploaded to cloud storage; url: \n🍐🍐 ${signedUrl} 🍐🍐\n`);
      return signedUrl;
    } catch (error) {
      Logger.error(`${mm} Error uploading file: ${error}`);
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
    Logger.log(`${mm} qrcode prefix: ${data.prefix} - size: ${data.size}`);

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
      Logger.log(`${mm} qrcode version: ${version}`);
      await qrcode.toFile(tempFilePath, data.data, {
        version: version,
      });
      Logger.log(`${mm} tempFilePath.length: ${tempFilePath.length} bytes`);
      Logger.log(
        `${mm} qrcode file: ${tempFilePath} to be uploaded to ${fileName}`
      );
      return this.uploadFile(fileName, tempFilePath, data.associationId);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create QR code and upload to Cloud Storage.");
    }
  }
}
