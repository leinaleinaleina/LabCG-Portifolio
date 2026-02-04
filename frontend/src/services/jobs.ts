import axios from 'axios'; //requisição HTTP
import { api } from './api'; 


// Payload para criar um novo Job
export interface JobCreate {
    model_id: string;
    input_params: Record<string, any>;
    prompt?: string; // Opcional no envio, dependendo do modelo
}

// Resposta do Backend ao criar Job
export interface JobRead {
    id: string;
    model_id: string;
    status: 'QUEUED' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED';
    progress_percent: number;
    created_at: string; // ISO String
    started_at?: string | null;
    completed_at?: string | null;
    prompt: string | null; // Pode ser null no SF3D
    input_params: Record<string, any>; // Dicionário flexível
}

// Resposta do Endpoint de Ticket de Upload
export interface ArtifactUploadResponse {
    upload_url: string; // URL Assinada do MinIO (PUT)
    object_name: string; // Caminho interno (uploads/inputs/...) para salvar no banco
}

interface ArtifactDownload {
    download_url: string;
    expires_in: number;
}

//Funções de serviço

export const jobsService = {
   
    ////Upload!
    getUploadTicket: async (filename: string, contentType: string) => { //pede "autorização" do back para fazer upload de um arquivo
        const response = await api.post<ArtifactUploadResponse>('/jobs/upload-ticket', {
            filename,
            content_type: contentType
        });
        return response.data;
    },

    //pega autorização de antes e envia o arquivo pro banco -> O MinIO!!!!!!!!!!!!!!
    uploadFileToStorage: async (presignedUrl: string, file: File) => { 
        await axios.put(presignedUrl, file, { //usamos axios pra não pegar o header x-api-key
            headers: {
                'Content-Type': file.type
            },
            // Monitoramento de progresso de upload (barras de carregamento)
            onUploadProgress: (progressEvent) => { 
                const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
                console.log(`Upload MinIO: ${percentCompleted}%`);
            }
        });
    },

    //Cria o Job de fato no banco de dados.
    createJob: async (data: JobCreate) => {
        const response = await api.post<JobRead>('/jobs', data);
        return response.data;
    },

    //Lista os jobs do usuário.
    listJobs: async () => {
        // Por pegamos os 50 últimos. Futuramente podemos passar params.
        const response = await api.get<JobRead[]>('/jobs?limit=50');
        return response.data;
    },

    //Pega a URL assinada para baixar o .GLB final!
    getDownloadUrl: async (jobId: string) => {
        const response = await api.get<ArtifactDownload>(`/jobs/${jobId}/download`);
        return response.data.download_url;
    }
};