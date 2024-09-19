"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const my_utils_1 = require("./my-utils/my-utils");
const FirebaseService_1 = require("./services/FirebaseService");
const errors_interceptor_1 = require("./middleware/errors.interceptor");
const swagger_1 = require("@nestjs/swagger");
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵';
const env = process.env.NODE_ENV;
common_1.Logger.log(`${mm} Kasie NODE_ENV : ${env}`);
const srv = new FirebaseService_1.MyFirebaseService();
async function bootstrap() {
    common_1.Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping .....`);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = my_utils_1.MyUtils.getPort();
    common_1.Logger.log(`${mm} ... Kasie Backend running on port : ${port} `);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    await app.listen(port);
    await srv.initializeFirebase();
    await srv.sendInitializationMessage();
    app.useGlobalInterceptors(new errors_interceptor_1.ErrorsInterceptor());
}
bootstrap().then((r) => common_1.Logger.debug(`Kasie Backend Bootstrapping is complete. 💖💖💖 ... Boogy on!`));
//# sourceMappingURL=main.js.map