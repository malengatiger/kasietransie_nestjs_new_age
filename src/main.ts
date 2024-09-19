/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { MyUtils } from './my-utils/my-utils';
import { MyFirebaseService } from './services/FirebaseService';
import { ErrorsInterceptor } from './middleware/errors.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import { pingDatabase } from './database/db_ping';
const mm = '🔵 🔵 🔵 🔵 🔵 🔵 Kasie Transie Bootstrap 🔵 🔵';
const env = process.env.NODE_ENV;
Logger.log(`${mm} Kasie NODE_ENV : ${env}`);

const srv: MyFirebaseService = new MyFirebaseService();
async function bootstrap() {
  Logger.log(`${mm} ... Kasie NestJS Backend bootstrapping .....`);

  const app = await NestFactory.create(AppModule);
  const port = MyUtils.getPort();
  Logger.log(`${mm} ... Kasie Backend running on port : ${port} `);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //
  // app.use(helmet());
  app.enableCors();
  await app.listen(port);
  await srv.initializeFirebase();
  await srv.sendInitializationMessage();
  app.useGlobalInterceptors(new ErrorsInterceptor());
  //
  // pingDatabase();
}
bootstrap().then((r) =>
  Logger.debug(`Kasie Backend Bootstrapping is complete. 💖💖💖 ... Boogy on!`),
);
