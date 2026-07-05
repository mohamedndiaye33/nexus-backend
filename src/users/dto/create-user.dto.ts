import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  // ✅ Ajout du champ name (facultatif pour rester compatible)
  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail({}, { message: 'Veuillez fournir un email valide.' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}
