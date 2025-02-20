"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const my_utils_1 = require("./my-utils/my-utils");
const swagger_1 = require("@nestjs/swagger");
const index_util_1 = require("./services/index_util");
const mm = "🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵";
const env = process.env.NODE_ENV;
common_1.Logger.log(`${mm} Kasie NODE_ENV : ${env}`);
async function bootstrap() {
    common_1.Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping ..... env: ${env}`);
    let app;
    if (env === "production") {
        app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ["fatal", "error"],
        });
    }
    if (env === "development") {
        app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ["fatal", "error", 'log', 'debug'],
        });
    }
    if (app === null) {
        app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ["fatal", "error", 'log', 'debug'],
        });
    }
    const port = my_utils_1.MyUtils.getPort();
    app.setGlobalPrefix("api/v1");
    const config = new swagger_1.DocumentBuilder()
        .setTitle("KasieTransie Backend")
        .setDescription("The Kasie API manages the backend data and provides access to the MongoDB Atlas database")
        .setVersion("1.0")
        .addTag("taxis")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/v1/api", app, document);
    common_1.Logger.log(`${mm} ... Kasie Swagger set up .....`);
    app.enableCors();
    common_1.Logger.log(`${mm} ... GlobalInterceptors set up .....`);
    await app.listen(port);
    await index_util_1.MongoIndexBuilder.createIndexes();
    const serverIP = my_utils_1.MyUtils.getServerIPaddress();
    common_1.Logger.log(`${mm} ...🔆 Kasie Backend running on: http://${serverIP}:${port}`);
}
async function startBoot() {
    common_1.Logger.debug(`${mm} 🌼 🌼 🌼 Kasie Backend Bootstrapping is starting ... `);
    await bootstrap();
    common_1.Logger.debug(`${mm} 🌼 🌼 🌼 Kasie Backend Bootstrapping is complete. \n💖💖💖💖💖💖💖💖💖 ... Lets do this!! 💖💖💖💖💖💖\n\n`);
}
startBoot();
//# sourceMappingURL=main.js.map