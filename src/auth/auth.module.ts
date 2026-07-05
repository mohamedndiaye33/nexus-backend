import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy'; // ✅ Nouveau

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'CLE_SECRETE_BOUTIQUE_GAMING_2026',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy, // ✅ Enregistre la stratégie JWT dans Passport
  ],
  controllers: [AuthController],
  exports: [JwtModule], // ✅ Exporte JwtModule pour les autres modules qui en ont besoin
})
export class AuthModule {}
