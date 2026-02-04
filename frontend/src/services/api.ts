import axios from 'axios';//requisição HTTP

//Define o endereço principal do servidor
//Lendo a variável do .env. Se não existir, usa o fallback.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Cria instância do axios
//Otimiza a configuração do endereço, se "treinando" e mandando os dados pro JSON
export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Requisição
api.interceptors.request.use( //passa por esse processo antes de qualquer chamada sair
  (config) => {

    // Busca a chave salva no Login
    const apiKey = localStorage.getItem('labcg_api_key');
    
    // Se existir, injeta no header padrão que o Backend espera
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPOSTA
// Se o token expirar ou for inválido, podemos deslogar o usuário automaticamente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica se existe resposta de erro
    if (error.response) {
        // Lógica para ignorar se for na tela de Login
        const isLoginRequest = error.config.url.includes('/auth/login');

        if ((error.response.status === 401 || error.response.status === 403) && !isLoginRequest) {
            console.warn('Sessão expirada. Redirecionando...');
            localStorage.removeItem('labcg_api_key');
            
            // Só redireciona se JÁ NÃO estivermos na tela de login
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
    }
    return Promise.reject(error);
  }
);