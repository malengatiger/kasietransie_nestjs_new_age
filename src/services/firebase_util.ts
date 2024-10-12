import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import { Constants } from "src/my-utils/constants";
import { MyUtils } from "src/my-utils/my-utils";

let app: admin.app.App = null;
const tag = "🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ";

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      console.log(
        `\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`
      );
      app = admin.initializeApp({
        credential: applicationDefault(),
      });
      Logger.log(`${tag} ... Firebase initialized: 🥬 name: ${JSON.stringify(app.options)}   🥬`);
      this.sendInitializationMessage(app);
    }
  }

  getFirebaseApp() {
    // Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
    return app;
  }
  async sendInitializationMessage(app: admin.app.App) {
    Logger.log(`${tag} sendInitializationMessage: 🥬 name: ${JSON.stringify(app.name)}   🥬`);
    const date = MyUtils.formatISOStringDate(new Date().toISOString(), 'en');
    const message: admin.messaging.Message = {
      topic: Constants.admin,
      data: {
        message:
          '🍑🍑 Kasie Transie Backend Server (Node/NestJS) started OK! 🅿️ 🅿️ 🅿️',
        date: date,
      },
      notification: {
        title: 'Kasie Transie Backend',
        body: `Kasie Transie is running good! : ${date}
        )}🅿️ 🅿️ 🅿️`,
      },
    };

    try {
      const response = await app.messaging().send(message);
      Logger.log(`${tag} FCM initialization message sent, response: ${JSON.stringify(response)}`);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
