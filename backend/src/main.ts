import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './app.types';
import { UserModule } from './user/user.module';
import * as Config from 'config';


async function bootstrap(swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create(AppModule);
  
  
  // use global pipe validation
  await app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );


  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const userDocument = SwaggerModule.createDocument(app, options, {
    include: [UserModule],
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, userDocument);
  await app.listen(3000);
}
bootstrap(Config.get<SwaggerConfig>('swagger'),);
