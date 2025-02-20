/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, Logger } from "@nestjs/common";

import { MyUtils } from "./my-utils/my-utils";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { MongoIndexBuilder } from "./services/index_util";
import { MessagingService } from "./features/fcm/fcm.service";
const mm = "🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵";
const env = process.env.NODE_ENV;
Logger.log(`${mm} Kasie NODE_ENV : ${env}`);

async function bootstrap() {
  Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping ..... env: ${env}`);

  let app:INestApplication;

  if (env === "production") {
    app = await NestFactory.create(AppModule, {
      logger: ["fatal", "error"],
    });
  } 
  if (env === "development") {
    app = await NestFactory.create(AppModule, {
      logger: ["fatal", "error", 'log', 'debug'],
    });
  } 
  if (app === null) {
    app = await NestFactory.create(AppModule, {
      logger: ["fatal", "error", 'log', 'debug'],
    });
  } 
  
 
  const port = MyUtils.getPort();
  app.setGlobalPrefix("api/v1");

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("KasieTransie Backend")
    .setDescription(
      "The Kasie API manages the backend data and provides access to the MongoDB Atlas database"
    )
    .setVersion("1.0")
    .addTag("taxis")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/api", app, document);
  Logger.log(`${mm} ... Kasie Swagger set up .....`);
  // app.use(helmet());
  app.enableCors();

  Logger.log(`${mm} ... GlobalInterceptors set up .....`);

  await app.listen(port);
  await MongoIndexBuilder.createIndexes();
  //
  const serverIP = MyUtils.getServerIPaddress(); // Default to localhost
  Logger.log(
    `${mm} ...🔆 Kasie Backend running on: http://${serverIP}:${port}`
  );
}

// bootstrap().then((r) =>
//   Logger.debug(
//     `${mm} Kasie Backend Bootstrapping is complete. \n💖💖💖💖💖💖💖💖💖 ... Lets do this!! 💖💖💖💖💖💖\n\n`
//   )
// );
async function startBoot() {
  Logger.debug(
    `${mm} 🌼 🌼 🌼 Kasie Backend Bootstrapping is starting ... `);
  await bootstrap();
  Logger.debug(
    `${mm} 🌼 🌼 🌼 Kasie Backend Bootstrapping is complete. \n💖💖💖💖💖💖💖💖💖 ... Lets do this!! 💖💖💖💖💖💖\n\n`
  )
}
startBoot();
