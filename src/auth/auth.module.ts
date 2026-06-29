import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, // Permet d'utiliser UsersService ici
    PassportModule,
    JwtModule.register({
      secret: 'CLE_SECRETE_BOUTIQUE_GAMING_2026', // Ta clé secrète de chiffrement
      signOptions: { expiresIn: '1h' }, // Durée de validité du token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}