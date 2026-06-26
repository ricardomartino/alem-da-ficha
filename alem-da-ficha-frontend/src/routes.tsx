import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';

const DashboardTeste = () => (
  <div>
    <h2>🏰 Painel do Jogador (Área Protegida)</h2>
    <p>Se você está vendo isso, seu Token JWT foi salvo com sucesso!</p>
    <button onClick={() => { localStorage.clear(); window.location.reload(); }}>Sair / Fazer Logout</button>
  </div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        <Route path="/dashboard" element={<DashboardTeste />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}