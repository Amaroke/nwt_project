import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
