import { useState, type FormEvent, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// [REQUISITO] Importar Imagem
import logoImg from '../assets/LabCG.png';

// [REQUISITO] CSS Modules (Visual do login.html portado para cá)
import styles from './Login.module.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // [REQUISITO] Input Checkbox/Radio
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { signIn, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated, navigate]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(false);
    setErrorMessage('');

    if (!username || !password) {
      setErrorMessage('Preencha todos os campos.');
      setError(true);
      setTimeout(() => setError(false), 500);
      return;
    }

    try {
      console.log('Lembrar usuário:', rememberMe); 
      await signIn(username, password);
    } catch (err) {
      setErrorMessage('Credenciais inválidas.');
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  }

  return (
    // Usa o wrapper do CSS Module para o fundo Gunmetal
    <div className={styles.loginWrapper}>
      
      {/* Card estilo "Surface" do CSS Module */}
      <div className={styles.loginCard}>
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
           {/* Logo com animação Float */}
           <img src={logoImg} alt="LabCG Logo" className={styles.logoImage} />
           
           <h1 className="text-3xl font-bold tracking-tight text-white">
            Lab<span className="text-primary">CGera</span>
          </h1>
           <p className="text-sm text-[#94a3b8] mt-2">
             Acesso restrito ao Dashboard
           </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Input Usuário */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider ml-1">
              Usuário
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-regular fa-user text-[#94a3b8] group-focus-within:text-[#40cf9f] transition-colors"></i>
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /* [REQUISITO] CSS Dinâmico: Classe .inputValid (Verde) se tiver texto */
                className={`w-full bg-[#18242c] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#40cf9f] focus:ring-1 focus:ring-[#40cf9f] transition-all duration-300 ${
                  username.length > 0 ? styles.inputValid : ''
                }`}
                placeholder="Identificação LabCG"
              />
            </div>
          </div>

          {/* Input Senha */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider ml-1">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fa-solid fa-lock text-[#94a3b8] group-focus-within:text-[#40cf9f] transition-colors"></i>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#18242c] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#94a3b8]/50 focus:outline-none focus:border-[#40cf9f] focus:ring-1 focus:ring-[#40cf9f] transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* [REQUISITO] Checkbox para cumprir regra de input types */}
          <div className={styles.radioContainer}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded bg-[#18242c] border-white/10 text-[#40cf9f] focus:ring-[#40cf9f] cursor-pointer"
            />
            <label htmlFor="remember" className="text-sm text-[#94a3b8] select-none cursor-pointer hover:text-white transition-colors">
              Manter conectado
            </label>
          </div>

          {/* Mensagem de Erro */}
          {errorMessage && (
            <div className={`p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 ${error ? 'animate-shake' : ''}`}>
              <i className="fa-solid fa-circle-exclamation"></i>
              {errorMessage}
            </div>
          )}

          {/* Botão de Ação (Estilo Neon do original) */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full rounded-lg py-3 text-sm font-bold text-[#18242c] transition-all duration-300 ${
              isLoading 
                ? 'cursor-not-allowed bg-[#22303a] border border-white/5 text-[#94a3b8]' 
                : 'bg-[#40cf9f] hover:bg-[#34b086] hover:shadow-[0_0_15px_rgba(64,207,159,0.3)]'
            }`}
          >
            {isLoading ? (
              <span><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Verificando...</span>
            ) : (
              "Acessar Sistema"
            )}
          </button>
        </form>

        {/* Link de Retorno (Extensão do Trabalho 1) */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <a 
            href="/site-institucional/index.html" 
            className="text-xs text-[#94a3b8] hover:text-[#40cf9f] transition-colors flex items-center justify-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Voltar ao Portal Institucional
          </a>
        </div>
      </div>

      {/* Footer Fixo */}
      <div className="fixed bottom-4 text-center w-full pointer-events-none">
        <p className="text-[10px] text-[#94a3b8] opacity-40 uppercase tracking-widest">
          &copy; 2026 Laboratório de Computação Gráfica.<br/>Acesso restrito a pesquisadores autorizados.
        </p>
      </div>

    </div>
  );
}