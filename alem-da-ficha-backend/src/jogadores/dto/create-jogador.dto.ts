import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateJogadorDto {
  @IsString()
  @IsNotEmpty({ message: 'O codinome do herói é obrigatório.' })
  codinome!: string;

  @IsEmail({}, { message: 'O e-mail informado para recuperação é inválido.' })
  @IsNotEmpty({ message: 'O e-mail de recuperação é obrigatório.' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'A chave secreta deve conter pelo menos 6 caracteres para proteger suas fichas.' })
  @IsNotEmpty({ message: 'A chave secreta é obrigatória.' })
  chaveSecreta!: string;
}