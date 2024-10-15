import { Body, Controller, Post } from '@nestjs/common';
import { PayfastService , PayfastForm} from './payfast.service';

@Controller('payfast')
export class PayfastController {
  constructor(private readonly payfastService: PayfastService) {
    
  }

 @Post('payFastCancel')
 async payFastCancel(@Body() cancel: any): Promise<any> {

   return 0;
 }
 @Post('payFastReturn')
 async payFastReturn(@Body() mreturn: any): Promise<any> {
   
   return 0;
 }
 @Post('payFastNotify')
 async payFastNotify(@Body() notify: any): Promise<any> {
   
   return 0;
 }

 @Post('sendPayment')
 async sendPayment(@Body() payment: PayfastForm): Promise<any> {
   return await this.payfastService.sendPayment(payment);
 }
}
