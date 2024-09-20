import { Test, TestingModule } from '@nestjs/testing';
import { TextTranslationService } from './text_translation.service';

describe('TextTranslationService', () => {
  let service: TextTranslationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextTranslationService],
    }).compile();

    service = module.get<TextTranslationService>(TextTranslationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
