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
  app.setGlobalPrefix('api/v1');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('KasieTransie Backend')
    .setDescription('The Kasie API manages the backend data and provides access to the MongoDB Atlas database')
    .setVersion('1.0')
    .addTag('taxis')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/api', app, document);
  Logger.log(`${mm} ... Kasie Swagger set up .....`);

  // app.use(helmet());
  app.enableCors();
  await app.listen(port);
  await srv.initializeFirebase();
  await srv.sendInitializationMessage();
  app.useGlobalInterceptors(new ErrorsInterceptor());
  
}
bootstrap().then((r) =>
  Logger.debug(`${mm} Bootstrapping is complete. 💖💖💖 ... Lets do this!!`),
);
