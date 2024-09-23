"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyFirebaseService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const constants_1 = require("../my-utils/constants");
const my_utils_1 = require("../my-utils/my-utils");
const mm = '🍑 🍑 🍑 FirebaseService 🍑 ';
let MyFirebaseService = class MyFirebaseService {
    async initializeFirebase() {
    }
    async sendInitializationMessage() {
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
            const response = await admin.messaging().send(message);
            common_1.Logger.log(`${mm} 🅿️ 🅿️ 🅿️ Successfully sent FCM message: \n🚺 🚺 🚺 ${JSON.stringify(message)} \n🚺 🚺 🚺 FCM response: ${response}`);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }
};
exports.MyFirebaseService = MyFirebaseService;
exports.MyFirebaseService = MyFirebaseService = __decorate([
    (0, common_1.Injectable)()
], MyFirebaseService);
//# sourceMappingURL=FirebaseService.js.map