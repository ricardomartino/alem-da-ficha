import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  // 1. Trocamos o estado de 'email' para 'codinome'
  const [codinome, setCodinome] = useState('');
  const [chaveSecreta, setChaveSecreta] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      // 2. Enviando o codinome na requisição POST
      const resposta = await api.post('/auth/login', {
        codinome,
        chaveSecreta,
      });

      const tokenRecebido = resposta.data.access_token;

      if (tokenRecebido) {
        localStorage.setItem('token', tokenRecebido);
        setMensagem('Login efetuado com sucesso! Entrando na masmorra...');

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }

    } catch (error: any) {
      const mensagemErro = error.response?.data?.message;
      setMensagem(mensagemErro || 'Codinome ou chave secreta incorretos.');
    }
  }

  return (
    <div>
      <h1>Entrar na Biblioteca de Heróis</h1>

      {mensagem && <p style={{ fontWeight: 'bold', color: 'purple' }}>{mensagem}</p>}

      <form onSubmit={handleLogin}>
        {/* 3. Trocamos o input de Email para Codinome */}
        <div>
          <label>Codinome</label>
          <input 
            type="text" 
            placeholder="Seu nome de herói ou vilão"
            value={codinome}
            onChange={(e) => setCodinome(e.target.value)}
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

        <button type="submit">Entrar</button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
      </p>
    </div>
  );
}