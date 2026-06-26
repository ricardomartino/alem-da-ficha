import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateJogadorDto } from '../jogadores/dto/create-jogador.dto';
import { LoginDto } from './dto/login.dto'; // Importando o DTO que criamos

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registrar(@Body() createJogadorDto: CreateJogadorDto) {
    const novoJogador = await this.authService.registrar(createJogadorDto);
    return {
      mensagem: 'Herói registrado com sucesso na Biblioteca!',
      jogador: {
        id: novoJogador._id,
        codinome: novoJogador.codinome,
        email: novoJogador.email,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // Retorna status 200 OK para o login
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}