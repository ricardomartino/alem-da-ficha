// 1. Correção aqui: Adicionamos o "type" antes do FormEvent
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Cadastro() {
  const [codinome, setCodinome] = useState('');
  const [email, setEmail] = useState('');
  const [chaveSecreta, setChaveSecreta] = useState('');
  const [mensagem, setMensagem] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const resposta = await api.post('/auth/register', {
        codinome,
        email,
        chaveSecreta
      });

      setMensagem(resposta.data.mensagem || 'Herói registrado com sucesso!');
      
      setCodinome('');
      setEmail('');
      setChaveSecreta('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      const mensagemErro = error.response?.data?.message;
      setMensagem(Array.isArray(mensagemErro) ? mensagemErro[0] : mensagemErro || 'Erro ao registrar herói.');
    }
  }

  return (
    <div>
      <h1>Biblioteca de Heróis (Aceitamos vilões também)</h1>
      
      {mensagem && <p style={{ fontWeight: 'bold', color: 'blue' }}>{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Codinome</label>
          <input 
            type="text" 
            placeholder="Seu nome como jogador"
            value={codinome}
            onChange={(e) => setCodinome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Chave secreta (senha)</label>
          <input 
            type="password" 
            placeholder="Sua senha"
            value={chaveSecreta}
            onChange={(e) => setChaveSecreta(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar e Entrar</button>
      </form>
    </div>
  );
}