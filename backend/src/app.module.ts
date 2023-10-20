import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';

config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
