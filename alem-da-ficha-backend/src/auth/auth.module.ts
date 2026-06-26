import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt'; // Importado
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Jogador, JogadorSchema } from '../jogadores/schemas/jogador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jogador.name, schema: JogadorSchema }]),
    // Configuração do JWT
    JwtModule.register({
      global: true, // Torna o JwtService disponível na aplicação toda
      secret: process.env.JWT_SECRET || 'CHAVE_SUPER_SECRETA_DO_REINO', // Use uma variável de ambiente em produção
      signOptions: { expiresIn: '1d' }, // Token expira em 1 dia
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}