import { Controller } from '@nestjs/common';
import { MessagingService } from './fcm.service';

@Controller('fcm')
export class FcmController {
  constructor(private readonly fcmService: MessagingService) {}
}
