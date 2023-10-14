import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './app.types';
import { UserModule } from './user/user.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import * as Config from 'config';
import { QuestionModule } from './question/question.module';


async function bootstrap(swaggerConfig: SwaggerConfig) {

  // Create nest application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Use global pipe validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // Create swagger document
  const swaggerDocument = SwaggerModule.createDocument(app, options, {
    include: [UserModule, QuestionModule],
  });

  // Setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, swaggerDocument);

  // Start application
  await app.listen(3000);
  Logger.log(`Application served at http://localhost:3000`, 'bootstrap');
}
bootstrap(Config.get<SwaggerConfig>('swagger'),);
