import {
  Injectable,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { KasieError } from 'src/data/models/kasie.error';
import { MessagingService } from 'src/features/fcm/fcm.service';

const mm: string = '🔴 🔴 🔴 🔴 🔴 🔴 ErrorHandler 🔴 ';

@Injectable()
export class ErrorHandler  {
  constructor(private readonly messageService: MessagingService) {}

  public async handleError(error: any) { 
    Logger.error(`\n\n${mm} ... 😈😈 handling error: \n${error} `);

    try {
      const uri = process.env.REMOTE_DB_URI;
      Logger.debug(`${mm} connectToMongoDB: Atlas uri: ${uri}`);
      const client = new MongoClient(uri);
      const db = client.db("kasie_transie");

      const errorData = {
        message: error.message, // Log the original error message
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, // Use the original status code if available
      };
      await db.collection('KasieError').insertOne(errorData);
      Logger.debug(
        `${mm} KasieError added to database; 😈 sending error to FCM topic ... `,
      );

      // Send cloud message (if needed)
      await this.sendCloudMessage(error);
    } catch (e) {
      Logger.error(`${mm} Error handling error: ${e}`);
    }

  }

  private async sendCloudMessage(err: any) {
    try {
      const errorMessage = err.message || 'An unexpected error occurred.';
      await this.messageService.sendKasieErrorMessage(
        new KasieError(errorMessage, err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR),
      );
    } catch (e) {
      Logger.error(`${mm} ${e}`);
    }
  }
}
