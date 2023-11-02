import { Module, Logger } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyDao } from './dao/survey.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, SurveySchema } from './schemas/survey.schema';
import { SurveyController } from './survey.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService, Logger, SurveyDao]
})
export class SurveyModule { }
