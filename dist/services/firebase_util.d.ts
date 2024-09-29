import { OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin";
export declare class FirebaseAdmin implements OnApplicationBootstrap {
    onApplicationBootstrap(): Promise<void>;
    getFirebaseApp(): admin.app.App;
    sendInitializationMessage(app: admin.app.App): Promise<void>;
}
