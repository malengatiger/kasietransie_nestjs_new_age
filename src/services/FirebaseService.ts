/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import { Constants } from 'src/my-utils/constants';
import { MyUtils } from 'src/my-utils/my-utils';

const mm = '🍑 🍑 🍑 FirebaseService 🍑 ';

@Injectable()
export class MyFirebaseService {
  public async initializeFirebase(): Promise<void> {
    Logger.log(`${mm} ... Initializing Firebase ...`);
    const app1 = admin.initializeApp({
      credential: applicationDefault(),
    });
    Logger.log(`${mm} ... Firebase initialized: name: ${app1.name}  🔵 🔵 ${JSON.stringify(app1.options, null, 2)}  🔵 🔵`);
  }
  async sendInitializationMessage() {
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
      const response = await admin.messaging().send(message);
      Logger.log(
        `${mm} 🅿️ 🅿️ 🅿️ Successfully sent FCM message: \n🚺 🚺 🚺 ${JSON.stringify(
          message,
        )} \n🚺 🚺 🚺 FCM response: ${response}`,
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
