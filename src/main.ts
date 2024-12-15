import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Santa Clara')
    .setDescription('Documentação da API Clinica Santa Clara')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pela URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
