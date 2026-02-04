import { useState, useEffect, useRef } from 'react';
import { jobsService, type JobRead } from '../services/jobs';


//Entrada: Nenhuma
//Saída: jobs, loading e error 
export function useJobsPolling() { //encapsula a lógica de ficar buscando dados novos a cada 5 segundos
    const [jobs, setJobs] = useState<JobRead[]>([]); //Lista de trabalhos
    const [loading, setLoading] = useState(true); //carregamento ou não 
    const [error, setError] = useState<string | null>(null); //Mensagem de erro ou nulo

    // Ref para controlar se o componente está montado (evita set state em unmount)
    const isMounted = useRef(true);

    const fetchJobs = async () => {
        try {
            const data = await jobsService.listJobs(); // Chama o serviço que criamos no arquivo jobs.ts
            if (isMounted.current) { // Só atualiza os dados se a página ainda estiver aberta
                setJobs(data); 
                setError(null);
            }
        } catch (err) {
            console.error("Erro no polling:", err);
            // Não setamos erro visual no polling para não piscar a tela, 
            // apenas logamos silenciosamente após a primeira carga.
            if (loading && isMounted.current) setError("Falha ao carregar galeria.");
        } finally {
            // Aconteça o que acontecer, desliga o aviso de "Carregando"
            if (isMounted.current) setLoading(false);
        }
    };

    useEffect(() => { // Controla o ciclo de vida
        isMounted.current = true;

        // Executa a busca imediatamente ao abrir a página
        fetchJobs();

        // Cria um intervalo que executa a cada 5 segundos.
        const intervalId = setInterval(() => {
            // Opcional: Verificar se a aba está visível antes de chamar
            if (!document.hidden) {
                fetchJobs();
            }
        }, 5000);

        // 3. Cleanup quando o usuário sai da página 
        return () => {
            isMounted.current = false;
            clearInterval(intervalId);
        };
    }, []);
    //Retorna as variáveis prontas para serem usadas na tela
    return { jobs, loading, error };
}