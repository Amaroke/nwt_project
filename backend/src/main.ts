import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './user/user.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { QuestionModule } from './question/question.module';


async function bootstrap() {

  // Config Swagger
  const swaggerConfig = {
    title: 'Documentation NWT Project',
    description: 'The NWT Project API description',
    version: '1.0',
    tag: 'nwt',
    path: 'documentation',
  };

  // Create nest application
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Enable cors
  app.enableCors({
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

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
bootstrap();
