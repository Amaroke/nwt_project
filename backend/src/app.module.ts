import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { DaoService } from './question/dao/dao.service';
import { QuestionModule } from './question/question.module';

config();

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService, DaoService],
})
export class AppModule { }
