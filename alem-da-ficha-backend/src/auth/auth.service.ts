import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Importação do JWT
import { Jogador } from '../jogadores/schemas/jogador.schema';
import { CreateJogadorDto } from '../jogadores/dto/create-jogador.dto';
import { LoginDto } from './dto/login.dto'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Jogador.name) private readonly jogadorModel: Model<Jogador>,
    private readonly jwtService: JwtService, // Injeção do JwtService
  ) {}

  // Lógica de Registro (mantendo a verificação dupla para unicidade)
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

  // --- LÓGICA DE LOGIN ATUALIZADA (Usando Codinome) ---
  async login(loginDto: LoginDto) {
    // 1. Destruturamos o codinome em vez do email
    const { codinome, chaveSecreta } = loginDto;

    // 2. Buscar o jogador pelo codinome no banco
    const jogador = await this.jogadorModel.findOne({ codinome });
    if (!jogador) {
      throw new UnauthorizedException('Codinome ou Chave Secreta incorretos.');
    }

    // 3. Comparar a senha digitada com o hash salvo no banco
    const senhaValida = await bcrypt.compare(chaveSecreta, jogador.chaveSecreta);
    if (!senhaValida) {
      throw new UnauthorizedException('Codinome ou Chave Secreta incorretos.');
    }

    // 4. Gerar o Payload (dados que vão dentro do Token JWT)
    const payload = { 
      sub: jogador._id, 
      codinome: jogador.codinome, 
      email: jogador.email // Mantido no payload caso precise no futuro
    };

    // 5. Assinar o token JWT e retornar
    return {
      access_token: await this.jwtService.signAsync(payload),
      jogador: {
        id: jogador._id,
        codinome: jogador.codinome,
      }
    };
  }
}