import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: any) {
    const { email, password } = loginDto;
    
    // 1. Rechercher l'utilisateur par son email
    const user = await this.usersService.findByEmail(email);
    
    // 2. Vérifier si l'utilisateur ET son mot de passe existent
    if (!user || !user.password) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    // 3. Vérifier si le mot de passe correspond (TypeScript sait maintenant que user.password existe !)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects.');
    }

    // 4. Créer le payload du JWT
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}