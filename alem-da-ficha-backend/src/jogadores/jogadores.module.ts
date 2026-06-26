import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { Jogador, JogadorSchema } from './schemas/jogador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jogador.name, schema: JogadorSchema }])
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class JogadoresModule {}