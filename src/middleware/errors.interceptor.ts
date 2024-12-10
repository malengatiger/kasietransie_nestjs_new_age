import { Injectable, Logger, HttpStatus, HttpException } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { KasieError } from "src/data/models/kasie.error";
import { MessagingService } from "src/features/fcm/fcm.service";

const mm: string = "🔴 🔴 🔴 🔴 🔴 🔴 KasieErrorHandler 🔴 ";

@Injectable()
export class KasieErrorHandler {
  constructor(private readonly messageService: MessagingService) {}

  public async handleError(error: any, associationId: string, associationName: string) {
    Logger.error(`\n\n${mm} ... 😈😈 handling error: \n${error} `);

    try {
      const uri = process.env.REMOTE_DB_URI;
      Logger.debug(`${mm} connectToMongoDB: Atlas uri: ${uri}`);
      const client = new MongoClient(uri);
      const db = client.db("kasie_transie");

      const errorData = {
        associationId: associationId,
        associationName: associationName,
        date: new Date().getTime(),
        dateString: new Date().toISOString(),
        message: JSON.stringify(error), // Log the original error message
        statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR, // Use the original status code if available
      };
      try {
        db.collection("KasieError")
          .insertOne(errorData)
          .catch((reason) => {
            Logger.debug(
              `${mm} KasieError add to database failed: ${JSON.stringify(reason)}`
            );
          })
          .then((result) => {
            Logger.debug(
              `${mm} KasieError added to database: ${JSON.stringify(result)}`
            );
          });
      } catch (e) {
        Logger.debug(
          `${mm} KasieError add to database failed: ${JSON.stringify(e)}`
        );
      }

      // Send cloud message (if needed)
      await this.sendCloudMessage(errorData);
      
    } catch (e) {
      Logger.error(`${mm} Error handling error: ${e}`);
  
    }
  }

  private async sendCloudMessage(err: any) {
    try {
      const errorMessage = err.message || "An unexpected error occurred.";
      await this.messageService.sendKasieErrorMessage(
        new KasieError(
          errorMessage,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        )
      );
    } catch (e) {
      Logger.error(`${mm} sendCloudMessage failed: ${e}`);
    }
  }
}
