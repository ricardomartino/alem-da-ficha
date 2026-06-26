import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O codinome é obrigatório para entrar.' })
  codinome!: string;

  @IsString()
  @IsNotEmpty({ message: 'A chave secreta é obrigatória.' })
  @MinLength(6, { message: 'A chave secreta deve ter pelo menos 6 caracteres.' })
  chaveSecreta!: string;
}