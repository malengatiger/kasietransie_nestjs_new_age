/* eslint-disable @typescript-eslint/no-unused-vars */
////////////////////////////////////////////////////////////////////////
import {
  Controller,
  Query,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/data/models/User";
import { MyUtils } from "src/my-utils/my-utils";
import { AddUsersResponse, UserService } from "src/features/user/user.service";

const mm = " 🚼 🚼 🚼 UserController  🚼";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post("addUser")
  async addUser(@Body() user: User): Promise<any> {
    return await this.userService.createUser(user);
  }

  @Post("addAdminUser")
  async addAdminUser(@Body() user: User): Promise<any> {
    return await this.userService.createAdminUser(user);
  }
  @Get("getUserById")
  async getUserById(@Query("userId") userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Post("importUsersFromCSV")
  @UseInterceptors(FileInterceptor("file"))
  async importUsersFromCSV(
    @UploadedFile() file: Express.Multer.File,
    @Query("associationId") associationId: string
  ): Promise<AddUsersResponse> {
    const res = await this.userService.importUsersFromCSV(file, associationId);

    return res;
  }
  @Get("getUserByName")
  async getUserByName(
    @Query("firstName") firstName: string,
    @Query("lastName") lastName: string
  ): Promise<User> {
    const res = await this.userService.getUserByName(firstName, lastName);
    if (res == null) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return res;
  }
  @Get('fix')
  async fix(): Promise<any> {
    return await this.userService.fix();
  }

  private sendFile(fileName: string, res: Response) {
    this.logger.log("Sending file: " + fileName);
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", `attachment; filename=route.zip`);
    MyUtils.deleteOldFiles();
    res.sendFile(fileName);
  }
}
