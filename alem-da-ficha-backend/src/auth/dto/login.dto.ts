import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório para entrar na biblioteca.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'A chave secreta é obrigatória.' })
  chaveSecreta!: string;
}