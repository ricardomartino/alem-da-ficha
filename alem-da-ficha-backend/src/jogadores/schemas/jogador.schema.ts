import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'jogadores' })
export class Jogador extends Document {
  @Prop({ required: true, unique: true, trim: true })
  codinome!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  chaveSecreta!: string; // Guardaremos a senha criptografada aqui futuramente
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);