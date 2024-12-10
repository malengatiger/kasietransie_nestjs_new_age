import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  DeleteUsersResult,
  ListUsersResult,
} from "firebase-admin/lib/auth/base-auth";
import mongoose from "mongoose";
import { Association } from "src/data/models/Association";
import { User } from "src/data/models/User";
import { UserGeofenceEvent } from "src/data/models/UserGeofenceEvent";
import admin from "firebase-admin";
import { Vehicle } from "src/data/models/Vehicle";
import { UserService } from "src/features/user/user.service";
import { Constants } from "src/my-utils/constants";
import { Storage } from "@google-cloud/storage";

const mm = " 🔵 🔵 🔵 🔵 InternalService  🔵 ";

@Injectable()
export class InternalService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Vehicle.name)
    private vehicleModel: mongoose.Model<Vehicle>
  ) {}

  public async deleteCloudStorage(): Promise<any> {
    const bucketName = "kasie-transie-3.appspot.com";
    Logger.debug(`${mm} deleteCloudStorage: starting cloud storage deletes ... for bucket: ${bucketName}`);

    const storage = new Storage();
    const [metadata] = await storage.bucket(bucketName).addLifecycleRule({
      action: {
        type: "Delete",
      },
      condition: { age: 0 },
    });

    Logger.log(
      `${mm} Lifecycle management is enabled for bucket ${bucketName} and the rules are below:`
    );
    Logger.debug(
      `${mm} metadata.lifecycle.rule: ${JSON.stringify(metadata.lifecycle.rule)}`
    );
    const bucket = storage.bucket(bucketName);
    await bucket.deleteFiles({
      prefix: `kasie-transie-3_data`,
    });
    const msg = `🌰 🌰🌰 🌰 Cloud Storage bucket.deleteFiles: ${bucket.name} completed. 🌰 🌰`;
    Logger.debug(`${mm} ${msg}`);
    return msg
  }
  public async addInternalAdminUser(): Promise<User> {
    Logger.log(`\n\n\n${mm} addInternalAdminUser to Atlas ...\n`);

    const user: User = new User();
    user.firstName = "Kenneth";
    user.lastName = "Kaunda";
    user.associationName = "ADMIN";
    user.associationId = "ADMIN";
    user.bucketFileName = "NAY";
    user.cellphone = "+27655918876";
    user.email = "kk@swt.com";
    user.password = "pass123";
    user.countryId = "7a2328bf-915f-4194-82ae-6c220c046cac";
    user.userType = Constants.ADMINISTRATOR_AFTAROBOT;
    user.qrCodeBytes = "NAY";

    const res = await this.userService.createInternalAdminUser(user);
    Logger.debug(
      `${mm} addInternalAdminUser to Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return user;
  }
  public async deleteAllMongoDBusers(): Promise<any> {
    Logger.log(`\n${mm} deleteAllMongoDBusers from Atlas ...`);
    var res = await this.userModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllMongoDBusers from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllVehicles(): Promise<any> {
    Logger.log(`${mm} deleteAllVehicles from Atlas ...`);
    var res = await this.vehicleModel.deleteMany({});
    Logger.debug(
      `${mm} deleteAllVehicles from Atlas: ${JSON.stringify(res, null, 2)}`
    );
    return res;
  }
  public async deleteAllFirebaseUsers(): Promise<DeleteUsersResult> {
    Logger.debug(
      `\n${mm} deleteAllFirebaseUsers: delete all Firebase users ...`
    );
    const res: ListUsersResult = await admin.auth().listUsers();
    const uids = [];
    res.users.forEach((u) => {
      uids.push(u.uid);
      Logger.debug(
        `${mm} deleteAllFirebaseUsers: Firebase user: ${u.displayName} - ${u.email}`
      );
    });

    Logger.debug(
      `${mm} deleteAllFirebaseUsers: deleting ${uids.length} Firebase users ...`
    );

    const result: DeleteUsersResult = await admin.auth().deleteUsers(uids);
    Logger.debug(
      `${mm} deleteAllFirebaseUsers: deleted all Firebase users: ${JSON.stringify(result, null, 2)}`
    );
    return result;
  }
}
