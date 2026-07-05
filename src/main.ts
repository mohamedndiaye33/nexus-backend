import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS : autorise le frontend en local ET sur Vercel
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:4173',
      // 🔁 Remplace cette URL par ton vrai domaine Vercel si tu déploies
      'https://ton-frontend.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ✅ Validation automatique des DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // ✅ Port 5000 pour correspondre au proxy Vite du frontend
  await app.listen(process.env.PORT ?? 5000);
  console.log(`🚀 Backend démarré sur http://localhost:${process.env.PORT ?? 5000}`);
}
bootstrap();
