import { Controller } from '@nestjs/common';
import { TextTranslationService } from './text_translation.service';

@Controller('text-translation')
export class TextTranslationController {
  constructor(private readonly textTranslationService: TextTranslationService) {}
}
