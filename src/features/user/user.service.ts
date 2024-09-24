/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from "@nestjs/common";
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

const mm = "🏈 🏈 🏈 UserService 🏈 🏈";

@Injectable()
export class UserService {
  constructor(
    readonly storage: CloudStorageUploaderService,
    private readonly firebaseAdmin: FirebaseAdmin,
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

  async createUser(user: User): Promise<User> {
    const storedPassword = user.password;
    const app = this.firebaseAdmin.getFirebaseApp();
    console.log(
      `\n\n${mm} create user: ${JSON.stringify(user)} \n`
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
      console.log(`${mm} createUserAsync  .... 🎽 email: ${email}`);

      const userRecord = await app.auth().createUser({
        email,
        password: user.password,
        displayName: `${user.firstName} ${user.lastName}`,
      });

      console.log(
        `${mm} auth user created. userRecord from Firebase : 🎽 ${JSON.stringify(userRecord, null, 2)}`
      );
      if (userRecord.uid) {
        const uid = userRecord.uid;
        user.userId = uid;
        const url = await this.storage.createQRCode({
          data: JSON.stringify(user),
          prefix: Constants.qrcode_user,
          size: 1,
          associationId: user.associationName,
        });
        user.password = null;
        user.qrCodeUrl = url;
        const mUser = await this.userModel.create(user);
        //
        user.password = storedPassword;
        await app.auth().setCustomUserClaims(uid, {});
        Logger.log(
          `\n\n${mm} KasieTransie user created. 🥬🥬🥬 ${JSON.stringify(mUser)} 🥬\n\n`
        );
      } else {
        throw new Error(
          "userRecord.uid == null. We have a problem with Firebase, Jack!"
        );
      }
    } catch (e) {
      console.error(e);
      throw new Error(`User creation failed: ${e}`);
    }

    return user;
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
    Logger.log(`\n\n${mm} 😎 😎 😎 😎 😎 😎 Work completed! Users from csv file, 🍎 users: ${response.users.length} 🍎 errors: ${response.errors.length}\n\n`);
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
    const user = await this.userModel.findOne({ userId: userId });
    return user;
  }
  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
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
