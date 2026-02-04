import { useState } from 'react';
import { jobsService, type JobCreate } from '../services/jobs';

//Entrada: Strings e números
//Saída: Nenhuma
interface SubmitProps {
    mode: 'TEXT' | 'IMAGE';
    // Dados Text (DreamFusion)
    prompt: string;
    steps: number;
    guidance: number;
    seed: number;
    // Dados Image (SF3D)
    file: File | null;
    textureRes: number;
    remesh: string;
}

//Entrada: Nenhuma
//Saída:submit,isSubmitting e error
export function useJobSubmit() {

    //Controla se está carregando e se deu erro
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Função assíncrona que recebe os dados do formulário 
    async function submit({ 
        mode, prompt, steps, guidance, seed, 
        file, textureRes, remesh 
    }: SubmitProps): Promise<boolean> {
        
        //// Ativa o estado de carregar
        setIsSubmitting(true);
        setError(null); //Limpa os erros anteriores

        try {
           //Prepara a variável do dados a enviar
            let payload: JobCreate;

            if (mode === 'TEXT') { //Se o prompt estiver vazio, para tudo e dá erro
                // (DreamFusion)
                if (!prompt.trim()) throw new Error("Por favor, descreva o objeto no prompt.");

                payload = { //Monta o objeto para a API
                    model_id: 'dreamfusion-sd',
                    
                    prompt: prompt, 
                    //Objeto dentro de objeto (requisito do trabalho)
                    input_params: {
                        max_steps: steps,
                        guidance_scale: guidance,
                        seed: seed,
                        random_bg: true 
                    }
                };

            } else {
                //Stable Fast 3D)
                if (!file) throw new Error("Selecione uma imagem de referência (PNG/JPG).");

                //Ticket de Upload pedindo permissão
                const ticket = await jobsService.getUploadTicket(file.name, file.type);

                //Upload Binário Direto enviando o arquivo
                await jobsService.uploadFileToStorage(ticket.upload_url, file);

                //Criação do Job
                // Monta o objeto final com o caminho do arquivo já salvo
                payload = {
                    model_id: 'sf3d-v1',
                    // Prompt omitido (ou null) pois é Image-to-3D
                    input_params: {
                        input_path: ticket.object_name, // Caminho no Storage
                        texture_resolution: textureRes,
                        remesh_option: remesh,
                        foreground_ratio: 0.85 
                    }
                };
            }

            // Envio final para API
            await jobsService.createJob(payload);
            return true;

        } catch (err: any) {
            console.error("Erro ao submeter job:", err);
            const msg = err.response?.data?.detail || err.message || "Falha ao iniciar a geração.";
            setError(msg);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }

    return { // Retorna a função e as variáveis para quem usar este HooK
        submit,
        isSubmitting,
        error
    };
}