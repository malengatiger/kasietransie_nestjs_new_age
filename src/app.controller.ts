import { Controller, Get, Ip, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { RealIP } from "nestjs-real-ip";
import { Request } from 'express'; // <-- Add this import

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("")
  async shakeKasieUp(): Promise<string> {
    return this.appService.shakeKasieUp();
  }
  @Get("getAppIPaddress")
  get(@RealIP() ip: string): string {
    return ip;
  }
  @Get('getAppIPaddress2')
  async getAppIPaddress2(@Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const host = req.headers.host; // Get the host from the request headers
    const protocol = req.protocol; // Get the protocol (http or https)

    // Construct the full URL
    const fullUrl = `${protocol}://${host}${req.originalUrl}`;

    console.log(`🌼 IP Address is what? 🌼🌼🌼 ${ip} 🌼🌼🌼`);
    console.log(`🌼 Full URL: 🌼🌼🌼 ${fullUrl} 🌼🌼🌼`);

    return fullUrl; 
  }
}
