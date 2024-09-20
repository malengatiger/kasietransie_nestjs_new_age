import { Test, TestingModule } from '@nestjs/testing';
import { TextTranslationController } from './text_translation.controller';
import { TextTranslationService } from './text_translation.service';

describe('TextTranslationController', () => {
  let controller: TextTranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextTranslationController],
      providers: [TextTranslationService],
    }).compile();

    controller = module.get<TextTranslationController>(TextTranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
