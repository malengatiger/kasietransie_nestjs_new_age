import { Module } from "@nestjs/common";
import { TextTranslationService } from "./text_translation.service";
import { TextTranslationController } from "./text_translation.controller";
import { DataModule } from "src/data/data.module";
import {
  TranslationBag,
  TranslationBagSchema,
} from "src/data/models/TranslationBag";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "TranslationBag", schema: TranslationBagSchema },
    ]),
  ],
  controllers: [TextTranslationController],
  providers: [TextTranslationService],
})
export class TextTranslationModule {}
