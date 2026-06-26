import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Importação do JWT
import { Jogador } from '../jogadores/schemas/jogador.schema';
import { CreateJogadorDto } from '../jogadores/dto/create-jogador.dto';
import { LoginDto } from './dto/login.dto'; // Criaremos este DTO no próximo passo

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Jogador.name) private readonly jogadorModel: Model<Jogador>,
    private readonly jwtService: JwtService, // Injeção do JwtService
  ) {}

  // Lógica de Registro (já criada anteriormente)
  async registrar(createJogadorDto: CreateJogadorDto): Promise<Jogador> {
    const { codinome, email, chaveSecreta } = createJogadorDto;

    const usuarioExiste = await this.jogadorModel.findOne({
      $or: [{ email }, { codinome }],
    });

    if (usuarioExiste) {
      throw new BadRequestException('Codinome ou E-mail de recuperação já estão em uso.');
    }

    const saltRounds = 10;
    const hashChaveSecreta = await bcrypt.hash(chaveSecreta, saltRounds);

    const novoJogador = new this.jogadorModel({
      codinome,
      email,
      chaveSecreta: hashChaveSecreta,
    });

    return await novoJogador.save();
  }

  // --- NOVA LÓGICA DE LOGIN ---
  async login(loginDto: LoginDto) {
    const { email, chaveSecreta } = loginDto;

    // 1. Buscar o jogador pelo e-mail
    const jogador = await this.jogadorModel.findOne({ email });
    if (!jogador) {
      throw new UnauthorizedException('E-mail ou Chave Secreta incorretos.');
    }

    // 2. Comparar a senha digitada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(chaveSecreta, jogador.chaveSecreta);
    if (!senhaValida) {
      throw new UnauthorizedException('E-mail ou Chave Secreta incorretos.');
    }

    // 3. Gerar o Payload (dados que vão dentro do Token)
    const payload = { 
      sub: jogador._id, 
      codinome: jogador.codinome, 
      email: jogador.email 
    };

    // 4. Assinar o token JWT e retornar
    return {
      access_token: await this.jwtService.signAsync(payload),
      jogador: {
        id: jogador._id,
        codinome: jogador.codinome,
      }
    };
  }
}