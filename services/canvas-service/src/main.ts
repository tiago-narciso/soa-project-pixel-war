import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation pipe for incoming DTOs
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
  );

  const config = new DocumentBuilder()
      .setTitle('Canvas REST Service')
      .setDescription('Rest service for the canvas of the project')
      .setVersion('1.0')
      .addTag('Canvas')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`[Canvas REST Server] Running at http://localhost:${port}`);
    console.log(`[Swagger Docs] Available at http://localhost:${port}/api/docs`);
}

bootstrap();
