import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CurrenciesModule } from './currencies/currencies.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // Port par défaut de MySQL dans WampServer
      username: 'root', // Utilisateur par défaut de WampServer
      password: '', // Par défaut, pas de mot de passe sur WampServer
      database: 'nexus_db', // Le nom de la base de données que tu as créée sur phpMyAdmin
      autoLoadEntities: true, 
      synchronize: true, // Génère et met à jour automatiquement les tables en mode dev
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}