import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());

   const config = new DocumentBuilder()
     .addBearerAuth()
     .setTitle('Nestjs_exap_portfolio example')
     .setDescription('The nestjs and swager API description')
     .setVersion('1.0')
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('swager-nestjs', app, document);
   await app.listen(2003);
}


bootstrap();
