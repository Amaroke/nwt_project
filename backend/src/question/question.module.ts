import { Module, Logger } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionDao } from './dao/question.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionController } from './question.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, Logger, QuestionDao]
})
export class QuestionModule { }
