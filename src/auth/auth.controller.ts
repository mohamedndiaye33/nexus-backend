import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Renvoie un code 200 OK à la place de 201 Created pour la connexion
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto);
  }
}