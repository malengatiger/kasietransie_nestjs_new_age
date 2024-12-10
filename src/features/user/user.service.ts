/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/data/models/User";
import * as fs from "fs";
import { parse } from "csv";
import admin from "firebase-admin";

import { randomUUID } from "crypto";
import { Association } from "src/data/models/Association";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import { CloudStorageUploaderService } from "src/storage/storage.service";
import { Constants } from "src/my-utils/constants";
import { FirebaseAdmin } from "src/services/firebase_util";
import * as os from "os";
import * as path from "path";
import { Vehicle } from "src/data/models/Vehicle";
import { KasieErrorHandler } from "src/middleware/errors.interceptor";
import { error } from "console";

const mm = "🏈 🏈 🏈 UserService 🏈 🏈";

@Injectable()
export class UserService {
  constructor(
    readonly storage: CloudStorageUploaderService,
    private readonly firebaseAdmin: FirebaseAdmin,
    private readonly errorHandler: KasieErrorHandler,

    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(UserGeofenceEvent.name)
    private userGeofenceModel: mongoose.Model<UserGeofenceEvent>,
    @InjectModel(Association.name)
    private associationModel: mongoose.Model<Association>
  ) {}
  public convertExpressFileToString(expressFile: Express.Multer.File): string {
    const buffer = fs.readFileSync(expressFile.path);
    const fileString = buffer.toString("utf-8");
    return fileString;
  }

  public async createAssociationAuthUser(associationId: string): Promise<any> {
    Logger.log(
      `${mm} createAssociationAuthUser  .... 🎽 associationId: ${associationId}`
    );
    const email = `${associationId}@kasie.com`;
    const password = `pass${associationId}`;
    const app = this.firebaseAdmin.getFirebaseApp();
    const ass = await this.associationModel.findOne({
      associationId: associationId,
    });
    if (ass) {
      const userRecord = await app.auth().createUser({
        email: email,
        password: password,
        displayName: `${ass.associationName}`,
        uid: associationId,
      });
      if (userRecord) {
        if (userRecord.uid == associationId) {
          Logger.log(
            `${mm} createAssociationAuthUser  is Good!! 🎽 name: ${ass.associationName}`
          );
          return {
            email: email,
            password: password,
          };
        }
      }
    }
    Logger.error(
      `${mm} createAssociationAuthUser failed 😈😈😈 associationId: ${associationId} 😈😈😈`
    );
    throw new HttpException(
      "Unable to authenticate Association",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  public async createUser(user: User): Promise<User> {
    const storedPassword = user.password;
    const app = this.firebaseAdmin.getFirebaseApp();
    Logger.log(
      `\n\n${mm} ........ create user on Firebase Authentication: ${JSON.stringify(user, null, 2)} \n`
    );

    let mUser: User = await this.userModel.findOne({
      email: user.email,
    });

    if (!mUser && user.cellphone) {
      mUser = await this.userModel.findOne({
        cellphone: user.cellphone,
      });
    }
    if (mUser) {
      Logger.log(
        `${mm} ........ User exists on Atlas: ${JSON.stringify(mUser, null, 2)} \n`
      );
      return mUser;
    }

    try {
      Logger.log(`${mm} createUser  .... 🎽 email: ${user.email}`);

      const uid = randomUUID();
      let userRecord = null;
      if (user.cellphone) {
        userRecord = await app.auth().createUser({
          email: user.email,
          password: user.password,
          phoneNumber: user.cellphone,
          displayName: `${user.firstName} ${user.lastName}`,
          uid: uid,
        });
      } else {
        user.bucketFileName = "NAY";
        user.qrCodeBytes = "NAY";
        user.qrCodeBytes = "NAY";

        userRecord = await app.auth().createUser({
          email: user.email,
          password: user.password,
          displayName: `${user.firstName} ${user.lastName}`,
          uid: uid,
        });
      }

      Logger.log(
        `${mm} createUser: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`
      );
      user.dateRegistered = new Date().toISOString();
      user.password = null;
      user.userId = uid;
      Logger.debug(
        `${mm} createUser: ... bucketFileName: ${user.bucketFileName}`
      );
      Logger.debug(
        `${mm} ... adding user to Mongo, user; check bucketFileName: ${JSON.stringify(user)}`
      );
      await this.userModel.create(user);
      user.password = storedPassword;
      Logger.log(
        `\n\n${mm} createUser: 🔵 🔵 🔵 🔵 🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(user, null, 2)} 🥬\n\n`
      );

    } catch (e) {
      Logger.error(`${mm} User creation failed: ${e}`);
      this.errorHandler.handleError(
        `User creation failed: ${e}`,
        user.associationId,
        user.associationName
      );
      throw new HttpException(
        `${mm} User creation failed: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return user;
  }

  public async createInternalAdminUser(user: User): Promise<User> {
    Logger.log(`\n\n${mm} createAdminUser: user: ${JSON.stringify(user)} \n`);
    user.userType = Constants.ADMINISTRATOR_AFTAROBOT;
    user.associationId = "ADMIN";
    user.dateRegistered = new Date().toISOString();
    if (user.password == null) {
      user.password = "pass123";
    }

    try {
      const res = await this.createUser(user);
      Logger.log(
        `${mm} createAdminUser: seems pretty cool,  🔵 🔵 internal admin user has been created\n\n`
      );
      return res;
    } catch (e) {
      this.errorHandler.handleError(e, user.associationId, user.associationName);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateUser(user: User): Promise<User> {
    await this.userModel.updateOne({ userId: user.userId }, user);
    return user;
  }

  public async getUserById(userId: string): Promise<User> {
    Logger.debug(`${mm} getting user by id: ${userId}`);
    const user = await this.userModel.findOne({ userId: userId });
    if (user) {
      Logger.debug(`${mm} getting user found: ${JSON.stringify(user)}`);
    } else {
      Logger.error(`${mm} user not found`);
      this.errorHandler.handleError("getUserById:User not found", "N/A",'nay');
      throw new HttpException("getUserById User fucked!", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  public async getUserByName(
    firstName: string,
    lastName: string
  ): Promise<User | null> {
    const user = await this.userModel.findOne({
      firstName: firstName,
      lastName: lastName,
    });
    if (user) {
      Logger.debug(`$mm user found by name: ${JSON.stringify(user)}`);
    } else {
      Logger.log(
        `${mm} user not found by name: ${user} - ${firstName} ${lastName}`
      );
    }
    return user;
  }

  public async createOwner(user: User): Promise<User> {
    const storedPassword = user.password;
    const app = this.firebaseAdmin.getFirebaseApp();
    Logger.log(
      `\n\n${mm} ........ create user on Firebase Authentication: ${JSON.stringify(user, null, 2)} \n`
    );

    const mUser: User = await this.userModel.findOne({
      firstName: user.firstName,
      lastName: user.lastName,
    });
    if (mUser) {
      Logger.log(
        `${mm} ........  createOwner: User exists on Atlas: ${JSON.stringify(mUser, null, 2)} \n`
      );
      return mUser;
    }

    try {
      Logger.log(
        `${mm} createOwner  .... 🎽 email: ${user.email} ${user.cellphone}`
      );

      const uid = randomUUID();
      const userRecord = await app.auth().createUser({
        email: user.email,
        password: user.password,
        phoneNumber: user.cellphone,
        displayName: `${user.firstName} ${user.lastName}`,
        uid: uid,
      });

      Logger.log(
        `${mm} createOwner: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`
      );
      user.dateRegistered = new Date().toISOString();
      user.password = null;
      user.userId = uid;
      let url = null;

      Logger.debug(
        `${mm} createOwner: ... bucketFileName: ${user.bucketFileName}`
      );
      Logger.debug(
        `${mm} ... adding owner to Mongo, userId: ${user.userId} - ${user.firstName}`
      );
      const mUser = await this.userModel.create(user);
      user.password = storedPassword;
      Logger.log(
        `\n\n${mm} createOwner: 🔵🔵🔵🔵🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(mUser, null, 2)} 🥬\n\n`
      );
    } catch (e) {
      Logger.error(`${mm} owner creation failed: ${e}`);
      this.errorHandler.handleError(
        `owner creation failed: ${e}`,
        user.associationId,
        user.associationName
      );
      throw new HttpException(
        `${mm} Owner creation failed: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return user;
  }

  public async addUserGeofenceEvent(
    userGeofenceEvent: UserGeofenceEvent
  ): Promise<UserGeofenceEvent> {
    return await this.userGeofenceModel.create(userGeofenceEvent);
  }
  public async deleteUser(uid: string) : Promise<number> {
    const app = this.firebaseAdmin.getFirebaseApp();

    const user = await app.auth().getUser(uid);
    if (user) {
      Logger.debug(`${user.displayName} - ${user.email} - to be deleted`)
     await app.auth().deleteUser(uid);
     Logger.debug(`Firebase user deleted`);
     return 0;
    }
    return 9;
  }
}
/**
 * name
 */


export interface AddUsersResponse {
  users: User[];
  errors: any[];
}
