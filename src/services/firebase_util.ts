import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { readFile } from "fs/promises";
import * as admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
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
        projectId: "kasie2024",
        serviceAccountId: "kt-nest-1@kasie2024.iam.gserviceaccount.com",
        storageBucket: "kasie2024_media",
        // storageBucket: 'kasie2024.appspot.com',
      });
      Logger.log(`${tag} ... Firebase initialized:  🥬 name: ${app.name}   🥬`);
      const providers = await app.auth().listProviderConfigs({
        type: "saml",
      });
      providers.providerConfigs.forEach((p) => {
        Logger.log(`${tag} provider: ${JSON.stringify(p)}`);
      });
      Logger.log(
        `${tag} ... projectId: 🎽 ${app.options.projectId} storageBucket: ${app.options.storageBucket} \n\n`
      );
      Logger.log(
        `${tag} ... credential: 🎽 ${JSON.stringify(app.options.credential, null, 2)} \n\n`
      );
    } else {
      Logger.debug(`${tag} ... Firebase already initialized ... ignored!`);
    }
  }

  getFirebaseApp() {
    Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
    return app;
  }
}
