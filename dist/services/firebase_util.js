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
const constants_1 = require("../my-utils/constants");
const my_utils_1 = require("../my-utils/my-utils");
let app = null;
const tag = "🌰 🌰 🌰 🌰 FirebaseAdmin 🌰 🌰 ";
let FirebaseAdmin = class FirebaseAdmin {
    async onApplicationBootstrap() {
        if (!app) {
            console.log(`\n\n${tag} onApplicationBootstrap: Initializing Firebase app ... \n\n`);
            app = admin.initializeApp({
                credential: (0, app_1.applicationDefault)(),
            });
            common_1.Logger.log(`${tag} ... Firebase initialized: 🥬 name: ${JSON.stringify(app.options)}   🥬`);
            this.sendInitializationMessage(app);
        }
    }
    getFirebaseApp() {
        common_1.Logger.log(`${tag} getFirebaseApp: returning Firebase app: ${app.name}`);
        return app;
    }
    async sendInitializationMessage(app) {
        common_1.Logger.log(`${tag} sendInitializationMessage: 🥬 name: ${JSON.stringify(app.name)}   🥬`);
        const date = my_utils_1.MyUtils.formatISOStringDate(new Date().toISOString(), 'en');
        const message = {
            topic: constants_1.Constants.admin,
            data: {
                message: '🍑🍑 Kasie Transie Backend Server (Node/NestJS) started OK! 🅿️ 🅿️ 🅿️',
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
            common_1.Logger.log(`${tag} FCM initialization message sent, response: ${JSON.stringify(response)}`);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
};
exports.FirebaseAdmin = FirebaseAdmin;
exports.FirebaseAdmin = FirebaseAdmin = __decorate([
    (0, common_1.Injectable)()
], FirebaseAdmin);
//# sourceMappingURL=firebase_util.js.map