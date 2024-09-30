import * as fs from "fs";
import * as path from "path";
import { Logger } from "@nestjs/common";
import * as os from "os";

const mm = "🥦 🥦 🥦 🥦 MyUtils 🥦🥦";

export abstract class MyUtils {
  static createQRCodeAndUploadToCloudStorage(
    arg0: string,
    arg1: string,
    arg2: number
  ) {
    throw new Error("Method not implemented.");
  }
  public static getDatabaseUrl(): string {
    const env = process.env.NODE_ENV;
    let dbUrl: string;
    if (env === "production") {
      dbUrl = process.env.REMOTE_DB_URI;
    } else {
      dbUrl = process.env.LOCAL_DB_URI;
    }
    if (!dbUrl) {
      dbUrl = process.env.REMOTE_DB_URI;
    }
    Logger.log(`${mm} getDatabaseUrl: 🍷🍷 MONGODB dbUrl: ${dbUrl}`);
    return dbUrl;
  }
  public static getPort(): string {
    let port: string;
    const env = process.env.NODE_ENV;

    if (env === "production") {
      port = process.env.REMOTE_PORT;
    } else {
      port = process.env.LOCAL_PORT;
    }
    Logger.log(`${mm} port: ${port} 🍷🍷 `);
    if (!port) {
      port = process.env.REMOTE_PORT;
    }
    return port;
  }
  public static getStartDate(numberOfHours: number): string {
    const date = new Date();
    date.setHours(date.getHours() - numberOfHours);
    const isoString = date.toISOString();
    return isoString;
  }
  public static formatISOStringDate(
    dateString: string,
    locale: string
  ): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    if (locale) {
      return date.toLocaleString(locale, options);
    } else {
      return date.toLocaleString("en", options);
    }
  }
  public static deleteOldFiles(): void {
    Logger.log(`\n\n${mm} ... Deleting old files ...`);
    const tempZipsDir = path.join(__dirname, "..", "tempZips");
    const files = fs.readdirSync(tempZipsDir);
    const currentTime = Date.now();
    const tenMinutesAgo = currentTime - 10 * 60 * 1000; // 10 minutes in milliseconds

    let cnt = 0;
    for (const file of files) {
      const filePath = path.join(tempZipsDir, file);
      const fileStats = fs.statSync(filePath);
      const fileCreatedTime = fileStats.ctimeMs;
      if (fileCreatedTime < tenMinutesAgo) {
        fs.unlinkSync(filePath);
        cnt++;
      }
    }
    Logger.log(`${mm} ... Deleted: ${cnt} temporary files\n`);
  }
  public static getServerIPaddress() {
    const interfaces = os.networkInterfaces();
    let serverIP = "127.0.0.1"; // Default to localhost

    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          serverIP = iface.address;
          break; // Use the first available external IPv4 address
        }
      }
    }
    return serverIP;
  }
}
