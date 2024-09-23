"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAdmin = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const app_1 = require("firebase-admin/app");
let app = null;
const tag = "🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ";
let FirebaseAdmin = class FirebaseAdmin {
    async onApplicationBootstrap() {
        if (!app) {
            console.log(`\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`);
            app = admin.initializeApp({
                credential: (0, app_1.applicationDefault)(),
                projectId: "kasie2024",
                serviceAccountId: "kt-nest-1@kasie2024.iam.gserviceaccount.com",
                storageBucket: "kasie2024_media",
            });
            common_1.Logger.log(`${tag} ... Firebase initialized:  🥬 name: ${app.name}   🥬`);
            const providers = await app.auth().listProviderConfigs({
                type: "saml",
            });
            providers.providerConfigs.forEach((p) => {
                common_1.Logger.log(`${tag} provider: ${JSON.stringify(p)}`);
            });
            common_1.Logger.log(`${tag} ... projectId: 🎽 ${app.options.projectId} storageBucket: ${app.options.storageBucket} \n\n`);
            common_1.Logger.log(`${tag} ... credential: 🎽 ${JSON.stringify(app.options.credential, null, 2)} \n\n`);
        }
        else {
            common_1.Logger.debug(`${tag} ... Firebase already initialized ... ignored!`);
        }
    }
    getFirebaseApp() {
        common_1.Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
        return app;
    }
};
exports.FirebaseAdmin = FirebaseAdmin;
exports.FirebaseAdmin = FirebaseAdmin = __decorate([
    (0, common_1.Injectable)()
], FirebaseAdmin);
//# sourceMappingURL=firebase_util.js.map