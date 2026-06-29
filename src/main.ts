import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Activation du CORS pour autoriser ton application React (ex: port 5173)
  app.enableCors({
    origin: 'http://localhost:5173', // L'URL de ton frontend React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 2. Activation globale de la validation automatique avec les DTOs (class-validator)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Supprime automatiquement les propriétés non définies dans le DTO
    forbidNonWhitelisted: true, // Renvoie une erreur si des propriétés non autorisées sont envoyées
    transform: true, // Convertit automatiquement les types (ex: string vers number pour les IDs)
  }));

  // Écoute sur le port fourni par l'environnement ou le 3000 par défaut
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();