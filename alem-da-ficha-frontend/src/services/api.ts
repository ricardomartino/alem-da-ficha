import axios from 'axios';

const api = axios.create({
  // Define o endereço base do seu backend NestJS
  baseURL: 'http://localhost:3000',
  // Define que vamos enviar e receber dados no formato JSON por padrão
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;