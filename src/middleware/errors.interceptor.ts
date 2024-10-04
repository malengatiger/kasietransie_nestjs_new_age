import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';
import mongoose, { Model } from 'mongoose';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KasieError } from 'src/data/models/kasie.error';
import { MessagingService } from 'src/features/fcm/fcm.service';

const mm: string = '🔴 🔴 🔴 🔴 🔴 🔴 ErrorsInterceptor 🔴 ';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(
    private readonly messageService: MessagingService,
     ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.handleError.bind(this))); // Bind 'this'
  }

  private async handleError(err: KasieError) {
    Logger.error(`\n\n${mm} ... 😈😈 handling error: \n${err} `);

    try {
      const uri = process.env.REMOTE_DB_URI;
      Logger.debug(`${mm} connectToMongoDB: Atlas uri: ${uri}`);
      const client = new MongoClient(uri);
      const db = client.db("kasie_transie");

    
      const errorData = { 
        message: `😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`,
        statusCode: HttpStatus.BAD_REQUEST,
      };
      await db.collection('KasieError').insertOne(errorData);
      Logger.debug(
        `${mm} KasieError added to database; 😈 sending error to FCM topic ... `,
      );

      // Send cloud message (if needed)
      await this.sendCloudMessage(err); 
    } catch (e) {
      Logger.error(`${mm} Error handling error: ${e}`);
    }

    return throwError(
      () => new KasieError(`😈😈 ${err.message}`, HttpStatus.BAD_REQUEST),
    );
  }

  private async sendCloudMessage(err: KasieError) {
    try {
      const error: KasieError = new KasieError(
        `😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
      await this.messageService.sendKasieErrorMessage(error);
    } catch (e) {
      Logger.error(`${mm} ${e}`);
    }
  }
}
