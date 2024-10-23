/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/data/models/User";
import * as fs from "fs";
import { parse } from "csv";

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

  public async createUser(user: User): Promise<User> {
    const storedPassword = user.password;
    const app = this.firebaseAdmin.getFirebaseApp();
    Logger.log(
      `\n\n${mm} ........ create user: ${JSON.stringify(user, null, 2)} \n`
    );

    try {
      let email = "";
      if (!user.email) {
        const name = `${user.firstName} ${user.lastName}`;
        const mName = name.replace(" ", "").toLowerCase();
        email = `${mName}_${new Date().getTime()}@kasietransie.com`;
        user.email = email;
      } else {
        email = user.email;
      }
      Logger.log(`${mm} createUser  .... 🎽 email: ${email}`);

      const userRecord = await app.auth().createUser({
        email,
        password: user.password,
        phoneNumber: user.cellphone,
        displayName: `${user.firstName} ${user.lastName}`,
      });

      Logger.log(
        `${mm} createUser: Firebase auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`
      );
      const uid = userRecord.uid;
      user.userId = uid;
      user.dateRegistered = new Date().toISOString();
      if (user.qrCodeUrl == null) {
        const url = await this.storage.createQRCode({
          data: JSON.stringify(user),
          prefix: Constants.qrcode_user,
          size: 1,
          associationId: user.associationName ?? "ADMIN",
        });
        Logger.debug(`${mm} createUser: ... qrCode url: ${url}`);
        user.password = null;
        user.qrCodeUrl = url;
      }
      //
      Logger.debug(
        `${mm} ... adding user to Mongo, userId: ${user.userId} - ${user.firstName}`
      );
      const mUser = await this.userModel.create(user);
      user.password = storedPassword;
      Logger.log(
        `\n\n${mm} createUser: 🔵 user created on Mongo Atlas: 🥬🥬🥬 \n🔵 🔵 ${JSON.stringify(mUser, null, 2)} 🥬\n\n`
      );
    } catch (e) {
      Logger.error(`${mm} User creation failed: ${e}`);
      this.errorHandler.handleError(
        `User creation failed: ${e}`,
        user.associationId
      );
      throw new HttpException(`${mm} User creation failed: ${e}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return user;
  }
  public async createAdminUser(user: User): Promise<User> {
    Logger.log(`\n\n${mm} createAdminUser: user: ${JSON.stringify(user)} \n`);
    user.userType = Constants.ADMINISTRATOR_AFTAROBOT;
    user.associationId = "ADMIN";
    user.dateRegistered = new Date().toISOString();

    try {
      const res = await this.createUser(user);
      Logger.log(
        `${mm} createAdminUser: seems pretty cool,  🔵 🔵 internal admin user has been created\n\n`
      );
      return res;
    } catch (e) {
      this.errorHandler.handleError(e, user.associationId);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  public async updateUser(user: User): Promise<User> {
    return null;
  }

  public async importUsersFromCSV(
    file: Express.Multer.File,
    associationId: string
  ): Promise<AddUsersResponse> {
    Logger.log(
      `\n\n${mm} importUsersFromCSV:... 🍎🍎 associationId: ${associationId} 🍎🍎 ... find association ...`
    );
    Logger.debug(
      `${mm} importUsersFromCSV:...  🥦 file size: ${file.buffer.length} bytes;  🥦 originalname: ${file.originalname}`
    );
    const list = await this.associationModel.find({
      associationId: associationId,
    });
    if (list.length == 0) {
      throw new Error("Association not found");
    }
    const ass = list[0];
    Logger.log(
      `${mm} importUsersFromCSV:... association: 🔵 ${JSON.stringify(ass, null, 2)} 🔵\n\n`
    );

    const users: User[] = [];
    const mUsers: User[] = [];
    const errors: any[] = [];
    let response: AddUsersResponse;

    let index = 0;
    const tempFilePath = path.join(os.tmpdir(), file.originalname);
    Logger.log(`${mm} importUsersFromCSV:... 🔵 tempFilePath: ${tempFilePath}`);
    Logger.log(
      `${mm} importUsersFromCSV:... 🔵 read csv file: ${file.originalname}`
    );

    await fs.promises.writeFile(tempFilePath, file.buffer);
    response = await new Promise<AddUsersResponse>((resolve, reject) => {
      fs.createReadStream(tempFilePath)
        .pipe(parse())
        .on("data", async (data: any) => {
          if (index > 0) {
            const user: User = await this.buildUser(data, ass);
            users.push(user);
          }
          index++;
        })
        .on("error", (err) => {
          reject(new Error(`Error processing user CSV file: ${err}`));
        })
        .on("end", async () => {
          Logger.debug(`${mm} CSV parsing completed ......`);
          Logger.log(`${mm} Save the parsed users to the database`);
          for (const user of users) {
            try {
              const u = await this.createUser(user);
              mUsers.push(u);
            } catch (e) {
              errors.push(user);
              Logger.debug(`${mm} ${e} - errors: ${errors.length}`);
            }
          }

          await fs.promises.unlink(tempFilePath);
          resolve({
            users: mUsers,
            errors: errors,
          });
        });
    });
    Logger.log(`${mm} return response: ${JSON.stringify(response, null, 2)}`);
    Logger.log(
      `\n\n${mm} 😎 😎 😎 😎 😎 😎 Work completed! Users from csv file, 🍎 users: ${response.users.length} 🍎 errors: ${response.errors.length}\n\n`
    );
    return response;
  }
  private async buildUser(data: string[], ass: Association): Promise<User> {
    const uu = new User();
    uu.userType = data[0];
    uu.firstName = data[1];
    uu.lastName = data[2];
    uu.email = data[3];
    uu.cellphone = data[4];
    uu.associationId = ass.associationId;
    uu.associationName = ass.associationName;
    uu.password = randomUUID().trim();
    return uu;
  }

  public async getUserById(userId: string): Promise<User> {
    Logger.debug(`${mm} getting user by id: ${userId}`);
    const user = await this.userModel.findOne({ userId: userId });
    if (user) {
      Logger.debug(`${mm} getting user found: ${JSON.stringify(user)}`);
    } else {
      Logger.error(`${mm} user not found`);
      this.errorHandler.handleError("User not found", "N/A");
      throw new HttpException("User fucked!", HttpStatus.BAD_REQUEST);
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

  public async fix() {
    const list = await this.userModel.find({});
    Logger.log(`${mm} fix all users ...`);
    let cnt = 0;
    for (const u of list) {
      if (u.firstName) {
        u.firstName = u.firstName.trim();
      }
      if (u.lastName) {
        u.lastName = u.lastName.trim();
      }
      await u.save();
      cnt++;
    }
    Logger.log(`${mm} fixed ${cnt} users`);
    return cnt;
  }

  public async createOwner(car: Vehicle): Promise<User> {
    var asses = await this.associationModel
      .find({ associationId: car.associationId })
      .limit(1);
    let ass: Association = null;
    const nameParts = car.ownerName.split(" ");
    const firstName = nameParts.slice(0, -1).join(" "); // Join all parts except the last one
    const lastName = nameParts[nameParts.length - 1];

    if (asses.length > 0) {
      ass = asses[0];
      const user = new User();
      user.associationId = car.associationId;
      user.associationName = car.associationName;
      user.firstName = firstName;
      user.lastName = lastName;
      user.userType = Constants.OWNER;

      const emailSuffix = ass.adminEmail.split("@")[1];
      const emailPrefix = car.ownerName.replaceAll(" ", "_").toLowerCase();
      user.email = emailPrefix + "@" + emailSuffix;

      var mUser = await this.createUser(user);
      return mUser;
    }
    return null;
  }

  public async addUserGeofenceEvent(
    userGeofenceEvent: UserGeofenceEvent
  ): Promise<UserGeofenceEvent> {
    return await this.userGeofenceModel.create(userGeofenceEvent);
  }
}

export interface AddUsersResponse {
  users: User[];
  errors: any[];
}
