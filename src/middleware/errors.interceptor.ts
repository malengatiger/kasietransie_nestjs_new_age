import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KasieError } from 'src/data/models/kasie.error';
const mm: string = '🔴🔴🔴 ErrorsInterceptor';
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(handleError));

    function handleError(err: KasieError) {
      Logger.log(`\n\n${mm} ... 😈😈 handling error: ${err} `);
      sendMessage(err);
      return throwError(
        () => new KasieError(`😈😈 ${err.message}`, HttpStatus.BAD_REQUEST),
      );
    }
    async function sendMessage(err: KasieError) {
       //send message & write to database
       const x: KasieError = new KasieError(
        `😈 Error on Kasie Backend, statusCode: ${err.statusCode} 😈 msg: ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
      await this.kasieErrorModel.create(x);
      Logger.debug(`${mm} KasieError added to database; 😈 sending error to FCM topic ... `);
      await this.messagingService.sendKasieErrorMessage(x);
    }
  }
}
