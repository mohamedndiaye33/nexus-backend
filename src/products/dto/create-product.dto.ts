import { IsString, IsNotEmpty, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du produit est requis.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'La description est requise.' })
  description: string;

  @IsNumber()
  @IsPositive({ message: 'Le prix doit être supérieur à 0.' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Le stock ne peut pas être inférieur à 0.' })
  stock: number;

  @IsString()
  @IsNotEmpty({ message: 'La catégorie est requise.' })
  category: string;
}
