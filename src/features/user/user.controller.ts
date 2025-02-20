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
import { UserPhoto } from "src/data/models/UserPhoto";

const mm = " 🚼 🚼 🚼 UserController  🚼";

@Controller("user")
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post("addUser")
  async addUser(@Body() user: User): Promise<any> {
    Logger.log(
      `${mm} addUser; check bucketFileName: ${JSON.stringify(user, null, 2)}`
    );
    
    return await this.userService.createUser(user);

  }


  @Post("createVehicleUser")
  async createVehicleUser(@Body() user: User): Promise<any> {
    
    return await this.userService.createVehicleUser(user);
  }

  @Post("createOwner")
  async createOwner(@Body() user: User): Promise<any> {
    return await this.userService.createOwner(user);
  }
  @Post("addAdminUser")
  async addAdminUser(@Body() user: User): Promise<any> {
    return await this.userService.createInternalAdminUser(user);
  }
  @Get("getUserById")
  async getUserById(@Query("userId") userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

@Get("getUserById")
async deleteFirebaseUser(@Query("uid") uid: string): Promise<number> {
  return await this.userService.deleteUser(uid);
}
  @Get("createAssociationAuthUser")
  async createAssociationAuthUser(
    @Query("associationId") associationId: string
  ): Promise<any> {
    return await this.userService.createAssociationAuthUser(associationId);
  }

  @Get("getUserByName")
  async getUserByName(
    @Query("firstName") firstName: string,
    @Query("lastName") lastName: string
  ): Promise<User> {
    const res = await this.userService.getUserByName(firstName, lastName);
    if (res == null) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }
    return res;
  }
}
